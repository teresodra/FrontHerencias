import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import DivisibleAssetValuation from "../Components/DivisibleAssetValuation";
import IndivisibleAssetValuation from "../Components/IndivisibleAssetValuation";
import { apiGetInheritance, apiAddValuation } from "../services/api";
import Swal from 'sweetalert2';
import messagesObj from "../schemas/messages";
import DivisibleInChunksAssetValuation from "../Components/DivisibleInChunksAssetValuation";
import CustomPagination from "../Components/utils/CustomPagination";

const ValuationPage = () => {

    
    const {inheritanceId, heirId} = useParams();

    const [inheritance, setInheritance] = useState({});
    const [isLoading, setIsLoading] = useState(true);
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

        
            if (!data?.heirValuationsObj?.[heirId]){
                initializeValuationObj(data);
            } else {
                setValuationObj(data.heirValuationsObj?.[heirId])
                setMoney(data?.heirValuationsObj?.[heirId].money)
            }
            
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
        // let auxInheritance = {
        //     ...inheritance,
        //     heirValuationsObj: {
        //         ...(inheritance?.heirValuationsObj || {}), // Initially is undefined
        //         [heirId]: valuationObj
        //     }
        // }
        // setInheritance(auxInheritance);
        // console.log(auxInheritance)
        // console.log(JSON.stringify(auxInheritance))

        try {
            await apiAddValuation(inheritanceId, {
                heirId: heirId,
                valuationObj: valuationObj
            })
            // await apiEditInheritance(auxInheritance);
            Swal.fire(messagesObj.valorationAddedSuccess)
            navigate(`/inheritance/${inheritance.inheritanceId}`)
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
                auxList.push({assetId: asset.id})
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

    const isNextButtonDisabled = () => {
        return false
    }

    const isSaveButtonDisabled = () => {
        return false
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
                            {inheritance.assetsObj.indivisibleAssetsList.map((asset) => (
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

                <CustomPagination
                    numSteps={numSteps}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    isNextButtonDisabled={isNextButtonDisabled}
                    isSaveButtonDisabled={isSaveButtonDisabled}
                    handleSave={saveValuation}

                />
            </div>
        </div>
    )
    
};
export default ValuationPage;