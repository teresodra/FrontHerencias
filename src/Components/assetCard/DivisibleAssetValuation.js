import React, {useEffect, useState} from "react";
import NewAssetModal from "./assetCard/NewAssetModal";

const DivisibleAssetValuation = ({asset, ownershipsList, valuationObj, setValuationObj}) => {


    const [isWrapped, setIsWrapped] = useState(true);
    const [assetValue, setAssetValue] = useState(null);
    console.log(asset)
    const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId )


    useEffect(() => {
        
        // Initialize value in case already valuated
        setAssetValue(
            valuationObj.assetsValuationObj.divisibleAssetsList.find(
                indAs => indAs.assetId === asset.id
            )?.unitValue
        )
        
        // If it is cash value = ref value
        if(asset.category === "cash") {
            addValuation(asset.refValue)
        }

    }, []);

    const handleInputChange = (event) => {
        event.stopPropagation(); // Prevent unwrapping when typing the value
        addValuation(event.target.value)

    }
    
    const addValuation = (value) => {
        let auxValList = [...valuationObj.assetsValuationObj.divisibleAssetsList];
        const index = auxValList.findIndex(assetVal => assetVal.assetId === asset.id);
        auxValList[index] = {...auxValList[index], unitValue: value}
        setValuationObj({
            ...valuationObj,
            assetsValuationObj: {
                ...valuationObj.assetsValuationObj,
                divisibleAssetsList: auxValList
            }  
        })
        setAssetValue(value);
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
                    <label>Nombre</label>
                    <div>{asset.name}</div>
                </div>

                {!isWrapped && (
                    <div className="unwrapped-content">
                        <div className='card-data-item'>
                            <label>Cantidad</label>
                            <div>{asset.quantity}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Valor de referncia por unidad</label>
                            <div>{asset.refValue} {"€"}</div>
                        </div>

                        {asset.category === "cash" && (
                            <div className='card-data-item'>
                                <label>Categoría</label>
                                <div>Dinero</div>
                            </div>
                        )}

                        <div className='card-data-item'>
                            <label>Propiedad</label>
                            <div>{ownership.name}</div>
                        </div>

                        
                        <div className='custom-form'>
                            <div className="form-group">
                                <label>Valoracion</label>
                                {(asset.category === "cash") ? (
                                    <input type="number"
                                        disabled={true}
                                        value={asset.refValue}
                                    /> 
                                ) : (
                                    <input
                                        type="text"
                                        onChange={handleInputChange}
                                        value={assetValue}
                                        onClick={(event) => event.stopPropagation()}
                                    /> 
                                )}
                            </div>
                        </div>
                        

                    </div>
                )}

            </div>
        </div>
    )
};
export default DivisibleAssetValuation;