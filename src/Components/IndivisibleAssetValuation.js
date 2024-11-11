import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const IndivisibleAssetValuation = ({asset, ownershipsList, valuationObj, setValuationObj}) => {


    const [isWrapped, setIsWrapped] = useState(true);
    const ownership = ownershipsList.find(ownership => ownership.id === asset.ownership );

    console.log(valuationObj)
        
    const addValuation = (event) => {
        event.stopPropagation(); // Prevent unwrapping when typing the value
        let auxValList = [...valuationObj.assetsValuationObj.indivisibleAssetsList];
        let value = parseFloat(event.target.value) // Convert to float
        const index = auxValList.findIndex(assetVal => assetVal.assetId === asset.id);
        auxValList[index] = {...auxValList[index], value: value}
        setValuationObj({
            ...valuationObj,
            assetsValuationObj: {
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
                            <label>Valor de referencia:</label>
                            <div>{asset.refValue}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Ownership:</label>
                            <div>{ownership.name}</div>
                        </div>

                        <div className='custom-form'>
                            <div className="form-group">
                                <label>Valoracion</label>
                                <input 
                                    type="text"
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