import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const IndivisibleAssetValuation = ({asset, ownershipList, valuationObj, setValuationObj}) => {


    const [isWrapped, setIsWrapped] = useState(true);
    const ownership = ownershipList.find(ownership => ownership.id === asset.ownership );
        
    const addValuation = (event) => {
        event.stopPropagation(); // Prevent unwrapping when typing the value
        let auxValList = [...valuationObj.assetsValuation.indivisibleAssetsList];
        const index = auxValList.findIndex(assetVal => assetVal.assetId === asset.id);
        auxValList[index] = {...auxValList[index], value: event.target.value}
        setValuationObj({
            ...valuationObj,
            assetsValuation: {
                ...valuationObj.assetsValuation,
                indivisibleAssetsList: auxValList
            }
           
        })
    }
    
    return (
        <div
            className={`card-data-container ${!isWrapped ? 'unwrapped' : ''}`} 
            onClick={() => {setIsWrapped(!isWrapped)}}>

            <div className='card-data-button-container'>
                <div>
                    <span className="material-symbols-outlined">arrow_drop_down</span>
                </div>
            </div>


            <div className='card-data-content'>
                <div className='card-data-item'>
                    <label>Nombre:</label>
                    <div>{asset.name}</div>
                </div>

                {!isWrapped && (
                    <div className="unwrapped-content">
                        <div className='card-data-item'>
                            <label>Valor mercado:</label>
                            <div>{asset.marketValue}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Ownership:</label>
                            <div>{ownership.name}</div>
                        </div>

                        <div className='custom-form'>
                            <div className="form-group">
                                <label>Valoracion</label>
                                <input type="number"
                                    onChange={addValuation}
                                    onClick={(event) => event.stopPropagation()}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>




        </div>
    )
};
export default IndivisibleAssetValuation;