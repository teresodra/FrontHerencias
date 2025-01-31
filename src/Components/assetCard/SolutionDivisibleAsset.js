import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const SolutionDivisibleAsset = ({assetAllocation, inheritance, ownershipsList, removeAsset, editAsset}) => {

    const [isWrapped, setIsWrapped] = useState(true);
    // const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId );

    const asset = inheritance.assetsObj.divisibleAssetsList.find(asst=> asst.id === assetAllocation.assetId)
    

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

                <div className='card-data-item'>
                    <label>Valoracion por unidad</label>
                    <div>{assetAllocation.valuePOV} €</div>
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
{/* 
                        <div className='card-data-item'>
                            <label>Propiedad</label>
                            <div>{ownership.name}</div>
                        </div> */}

                        
                        
                        

                    </div>
                )}

            </div>
        </div>
    )
};
export default SolutionDivisibleAsset;