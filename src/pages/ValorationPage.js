import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import DivisibleAssetValuation from "../Components/DivisibleAssetValuation";
import IndivisibleAssetValuation from "../Components/IndivisibleAssetValuation";
import { apiGetInheritance, apiEditInheritance } from "../services/api";
import Swal from 'sweetalert2';
import messagesObj from "../schemas/messages";
import DivisibleInChunksAssetValuation from "../Components/DivisibleInChunksAssetValuation";

const ValuationPage = () => {

    
    // const [inheritance, setInheritance] = useState(JSON.parse('{"heirsList":[{"name":"Mario Martinez Lafuente","id":"sdgfsdfds","age":26},{"name":"Tereso del Rio Almajano","id":"adsfsaf","age":26},{"name":"Raul Perez Rodriguez","id":"dsadad","age":31},{"name":"Miguel Jimenez Garcia","id":"","age":66}],"ownershipsList":[{"heirPercObj":{"sdgfsdfds":{"pp":"1","np":"2","uv":"13"},"adsfsaf":{"pp":"4","np":"5","uv":"6"},"dsadad":{"pp":"7","np":"8","uv":"9"},"":{"pp":"10","np":"11","uv":"12"}},"name":"1","id":"570ea8fe-2754-4915-863b-b25f2605e39c"}],"assetsObj":{"divisibleAssetsList":[{"name":"tierra","quantity":"2","marketValue":"10000","category":"other","ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"fd32fbf3-33e7-4399-858a-d38c98ce524a"},{"name":"sdfdsf","quantity":"1","marketValue":"12","category":"cash","ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"1ce200be-bb67-4294-a6bb-4f3f61ee1ce8"}],"indivisibleAssetsList":[{"name":"coche","marketValue":"500","category":null,"ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"bfcf78e5-6228-4ef7-87b3-5c926093b942"},{"name":"casa","marketValue":"3","category":null,"ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"726d1aea-6251-42bc-a571-fef237a1ddc9"}]}}'));
    const [inheritance, setInheritance] = useState({});
    // const heirId = "sdgfsdfds"; // poner como parametro
    const [isLoading, setIsLoading] = useState(true);

    const {inheritanceId, heirId} = useParams();

    const [valuationObj, setValuationObj] = useState({})
    const [money, setMoney] = useState(0)
    const [currentStep, setCurrentStep] = useState(1);
    const [stepList, setStepList] = useState([1, 2, 3, 4, 5]); // Only steps with assets to valuate;

    // const numSteps = Object.keys(inheritance.assetsObj).length + 1; // +1 because in first step they ask about money 
    const [numSteps, setNumSteps] = useState(1);

    const [validator] = useState(new SimpleReactValidator());

    const navigate = useNavigate();
    const location = useLocation();
    
    useEffect(() => {
        loadInheritance();
        setIsLoading(false);
    }, []);

    const loadInheritance = async () => {
        try {
            let data;
            if (location.state?.inheritance) {
                data = location.state?.inheritance // Get inheritance from state when clicking in inheritance wrap
            } else {
                data = await apiGetInheritance(inheritanceId);
            }

            console.log(data)
            calculateSteps(data);
            setInheritance(data);
            initializeValuationObj(data);
        } catch (err) {
            console.log(err)
        }
    }

    // If we want to skip steps not used (e.g. there are no assets from one type)
    const calculateSteps = (data) => {
        setNumSteps(5);
        // TODO
        // setNumSteps(Object.keys(data.assetsObj).length + 1); // +1 because in first step they ask about money )
    }

    const saveValuation = async () => {
        console.log('save')
        console.log(valuationObj)
        console.log(JSON.stringify(valuationObj))
        let auxInheritance = {
            ...inheritance,
            heirValuationsList: [
                ...(inheritance?.heirValuationsList || []), // Initially is undefined
                valuationObj
            ]
        }
        setInheritance(auxInheritance);
        console.log(auxInheritance)
        console.log(JSON.stringify(auxInheritance))

        try {
            await apiEditInheritance(auxInheritance)
            Swal.fire(messagesObj.valorationAddedSuccess)
            navigate(`/inheritance/${inheritance.id}`)
        } catch (err) {
            Swal.fire(messagesObj.valorationAddedError)
        }

    }

    const initializeValuationObj = (inheritanceData) => {
        let auxObj = {heirId: heirId, money: 0, assetsValuationObj: {}};
        for (let assetType in inheritanceData.assetsObj){
            let auxList = [];
            for (let asset of inheritanceData.assetsObj[assetType]){
                // if it is cash, value = its market valur
                auxList.push({assetId: asset.id, value: asset?.category === 'cash' ? asset.marketValue : null})
            }
            auxObj.assetsValuationObj[assetType] = auxList;
        }
        console.log(auxObj)
        setValuationObj(auxObj);
    } 

    const updateMoney = (event) => {
        let money = parseFloat(event.target.value)
        setValuationObj({...valuationObj, money: money})
        setMoney(money)
    }

    if (isLoading) {
        return (
            <div></div>
        )
    }

    return(
        <div className='center'>
            <div className='content'>
                <h2>{`Valoracion ${inheritance.heirsList.find(heir => heir.id === heirId).name}`}</h2>

                {currentStep === 1 && (
                    <form className="custom-form">
                        <div className="form-group">
                            <label>Dinero dispuesto a invertir (€)</label>
                            <input
                                type="text"
                                name="money"
                                value={money}
                                onChange={updateMoney}
                            />
                            {validator.message('money', money, 'required|numeric|min:0,num')}
                        </div>
                    </form>
                )}

                {currentStep === 2 && (
                    <>
                    <h2>Bienes divisibles</h2>
                    {inheritance.assetsObj.divisibleAssetsList ? (
                        <div className='card-container'>
                            {inheritance.assetsObj.divisibleAssetsList.map((asset) => (
                                <DivisibleAssetValuation
                                    key={asset.id}
                                    asset={asset}
                                    ownershipsList={inheritance.ownershipsList}
                                    valuationObj={valuationObj}
                                    setValuationObj={setValuationObj}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>No hay bienes de este tipo</div>
                    )}
                    </>
                )}

                {currentStep === 3 && (
                    <>
                    <h2>Bienes indivisibles</h2>
                    {inheritance.assetsObj.indivisibleAssetsList ? (
                        <div className='card-container'>
                            {inheritance.assetsObj.indivisibleAssetsList.map((asset, index) => (
                                <IndivisibleAssetValuation
                                    key={asset.id}
                                    asset={asset}
                                    ownershipsList={inheritance.ownershipsList}
                                    valuationObj={valuationObj}
                                    setValuationObj={setValuationObj}
                                />
                            ))}
                        </div>
                    ) : (
                        <div>No hay bienes de este tipo</div>
                    )}
                    </>
                )}

                {currentStep === 4 && (
                    <>
                    <h2>Bienes divisibles por partes</h2>
                    {inheritance.assetsObj.divisibleInPartsAssetsList ? (
                        <div></div>
                    ) : (
                        <div>No hay bienes de este tipo</div>
                    )}
                    </>
                )}

                {currentStep === 5 && (
                    <>
                        <h2>Bienes divisibles por trozos</h2>
                        {inheritance.assetsObj.divisibleInChunksAssetsList ? (
                            <div className='card-container'>
                                {inheritance.assetsObj.divisibleInChunksAssetsList.map((asset) => (
                                    <DivisibleInChunksAssetValuation
                                        key={asset.id}
                                        asset={asset}
                                        ownershipsList={inheritance.ownershipsList}
                                        valuationObj={valuationObj}
                                        setValuationObj={setValuationObj}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div>No hay bienes de este tipo</div>
                        )}
                        </>
                )}


                <div className='step-buttons-container'>
                    <div className='button-container'>
                        <button className='custom-button' disabled={currentStep === 1} onClick={() => {setCurrentStep(currentStep - 1)}}>
                            Atras
                        </button>
                    </div>

                    <div className="pagination-bars-container">
                        {/* Number of bars depending of number of steps*/}
                        {Array.from({ length: numSteps }, (_, index) => index + 1).map((step) => (
                        <div
                            key={step}
                            className={`pagination-bar ${currentStep >= step ? 'active' : ''}`}
                        ></div>
                        ))}
                    </div>

                    {(currentStep < numSteps) ? (
                        <div className='button-container'>
                            <button
                                className='custom-button'
                                onClick={() => {setCurrentStep(currentStep + 1)}}
                                // disabled={isNextButtonDisabled()}
                            >
                                Siguiente
                            </button>
                        </div>
                    ): (
                        <div className='button-container'>
                            <button className='custom-button' onClick={saveValuation}>
                                Guardar
                            </button>
                        </div>
                    )}
                    
                </div>


            </div>
        </div>
    )
    
};
export default ValuationPage;