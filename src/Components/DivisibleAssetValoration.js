import React, {useEffect, useState} from "react";
import NewAssetModal from "./NewAssetModal";

const DivisibleAssetValoration = ({asset, ownershipList, valorationObj, setValorationObj}) => {


    const [isWrapped, setIsWrapped] = useState(true);
    const ownership = ownershipList.find(ownership => ownership.id === asset.ownership )

    useEffect(() => {
        // If it is cash value = market value
        if(asset.category === "cash") {
            addValoration(asset.marketValue)
        }
    }, []);

    const handleInputChange = (event) => {
        event.stopPropagation(); // Prevent unwrapping when typing the value
        addValoration(event.target.value)

    }
    
    const addValoration = (value) => {
        let auxValList = [...valorationObj.assetsValoration.divisibleAssetsList];
        const index = auxValList.findIndex(assetVal => assetVal.id === asset.id);
        auxValList[index] = {...auxValList[index], value: value}
        setValorationObj({
            ...valorationObj,
            assetsValoration: {
                ...valorationObj.assetsValoration,
                divisibleAssetsList: auxValList
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
                            <label>Cantidad</label>
                            <div>{asset.quantity}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Valor de mercado por unidad</label>
                            <div>{asset.marketValue} {"€"}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Categoría</label>
                            <div>{asset.category}</div>
                        </div>

                        <div className='card-data-item'>
                            <label>Ownership</label>
                            <div>{ownership.name}</div>
                        </div>

                        
                        <div className='custom-form'>
                            <div className="form-group">
                                <label>Valoracion</label>
                                {(asset.category === "cash") ? (
                                    <input type="number"
                                        disabled={true}
                                        value={asset.marketValue}
                                    /> 
                                ) : (
                                    <input
                                        type="number"
                                        onChange={handleInputChange}
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
export default DivisibleAssetValoration;