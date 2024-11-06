import React, { useState, useEffect } from "react";
import DivisibleAssetValoration from "../Components/DivisibleAssetValoration";
import IndivisibleAssetValoration from "../Components/IndivisibleAssetValoration";

const ValorationPage = () => {

    
    const [inheritance, setInheritance] = useState(JSON.parse('{"heirsList":[{"name":"Mario Martinez Lafuente","id":"sdgfsdfds","age":26},{"name":"Tereso del Rio Almajano","id":"adsfsaf","age":26},{"name":"Raul Perez Rodriguez","id":"dsadad","age":31},{"name":"Miguel Jimenez Garcia","id":"","age":66}],"ownershipList":[{"heirPercObj":{"sdgfsdfds":{"pp":"1","np":"2","uv":"13"},"adsfsaf":{"pp":"4","np":"5","uv":"6"},"dsadad":{"pp":"7","np":"8","uv":"9"},"":{"pp":"10","np":"11","uv":"12"}},"name":"1","id":"570ea8fe-2754-4915-863b-b25f2605e39c"}],"assetsObj":{"divisibleAssetsList":[{"name":"tierra","quantity":"2","marketValue":"10000","category":"other","ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"fd32fbf3-33e7-4399-858a-d38c98ce524a"},{"name":"sdfdsf","quantity":"1","marketValue":"12","category":"cash","ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"1ce200be-bb67-4294-a6bb-4f3f61ee1ce8"}],"indivisibleAssetsList":[{"name":"coche","marketValue":"500","category":null,"ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"bfcf78e5-6228-4ef7-87b3-5c926093b942"},{"name":"casa","marketValue":"3","category":null,"ownership":"570ea8fe-2754-4915-863b-b25f2605e39c","id":"726d1aea-6251-42bc-a571-fef237a1ddc9"}]}}'));
    const heirId = "sdgfsdfds"; // poner como parametro

    const [valorationObj, setValorationObj] = useState({})
    const [currentStep, setCurrentStep] = useState(1);

    const numSteps = Object.keys(inheritance.assetsObj).length + 1; // +1 because in first step they ask about money 

    useEffect(() => {
        initializeValorationObj();
    }, []);

    const saveValoration = () => {
        console.log('save')
        console.log(valorationObj)
        console.log(JSON.stringify(valorationObj))
    }

    const initializeValorationObj = () => {
        let auxObj = {money: 0, assetsValoration: {}};
        for (let assetType in inheritance.assetsObj){
            let auxList = [];
            for (let asset of inheritance.assetsObj[assetType]){
                auxList.push({id: asset.id, value: null})
            }
            auxObj.assetsValoration[assetType] = auxList;
        }
        setValorationObj(auxObj);
    } 

    const updateMoney = (event) => {
        setValorationObj({...valorationObj, money: event.target.value})
    }


    return(
        <div className='center'>
            <div className='content'>
                <h1>Valoraciones</h1>

                {currentStep === 1 && (
                    <form className="custom-form">
                        <div className="form-group">
                            <label>Dinero dispuesto a invertir €</label>
                            <input
                                type="number"
                                defaultValue={0}
                                min="0"
                                onChange={updateMoney}
                            />
                        </div>
                    </form>
                )}

                {currentStep === 2 && (
                    <>
                    <h2>Bienes divisibles</h2>
                    <div className='card-container'>
                        {inheritance.assetsObj.divisibleAssetsList.map((asset, index) => (
                            <DivisibleAssetValoration
                                key={asset.id}
                                asset={asset}
                                ownershipList={inheritance.ownershipList}
                                valorationObj={valorationObj}
                                setValorationObj={setValorationObj}
                            />
                        ))}
                    </div>
                    </>
                )}

                {currentStep === 3 && (
                    <>
                    <h2>Bienes indivisibles</h2>
                    <div className='card-container'>
                        {inheritance.assetsObj.indivisibleAssetsList.map((asset, index) => (
                            <IndivisibleAssetValoration
                                key={asset.id}
                                asset={asset}
                                ownershipList={inheritance.ownershipList}
                                valorationObj={valorationObj}
                                setValorationObj={setValorationObj}
                            />
                        ))}
                    </div>
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

                    {(currentStep < 3) ? (
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
                            <button className='custom-button' onClick={saveValoration}>
                                Guardar
                            </button>
                        </div>
                    )}
                    
                </div>


            </div>
        </div>
    )
    
};
export default ValorationPage;