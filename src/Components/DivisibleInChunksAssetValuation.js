import React, {useEffect, useState} from "react";
import NewAssetModal from "./NewAssetModal";

const DivisibleInChunksAssetValuation = ({asset, ownershipsList, valuationObj, setValuationObj}) => {


    const [isWrapped, setIsWrapped] = useState(true);
    console.log(ownershipsList)
    console.log(asset)
    const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId )


    useEffect(() => {
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
        let auxValList = [...valuationObj.assetsValuationObj.divisibleInChunksAssetsList];
        const index = auxValList.findIndex(assetVal => assetVal.assetId === asset.id);
        auxValList[index] = {...auxValList[index], value: value}
        setValuationObj({
            ...valuationObj,
            assetsValuationObj: {
                ...valuationObj.assetsValuationObj,
                divisibleInChunksAssetsList: auxValList
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
                    <label>Nombre</label>
                    <div>{asset.name}</div>
                </div>

                {!isWrapped && (
                    <div className="unwrapped-content">
                        <div className='card-data-item'>
                            <label>Tamaño total ({asset.unitSize})</label>
                            <div>{asset.totalSize}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Valor de referncia por {asset.unitSize}</label>
                            <div>{asset.refValue} {"€"}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Tamaño minimo de la parte</label>
                            <div>{asset.minimumSize} {asset.unitSize}</div>
                        </div>

                        {/* {asset.category === "cash" && (
                            <div className='card-data-item'>
                                <label>Categoría</label>
                                <div>Dinero</div>
                            </div>
                        )} */}

                        <div className='card-data-item'>
                            <label>Ownership</label>
                            <div>{ownership.name}</div>
                        </div>

                        
                        <div className='custom-form'>
                            <div className="form-group">
                                <label>Valoracion por {asset.unitSize}</label>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
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
export default DivisibleInChunksAssetValuation;