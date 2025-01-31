import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const SolutionIndivisibleAsset = ({assetAllocation, inheritance, ownershipsList, removeAsset, editAsset}) => {

    const [isWrapped, setIsWrapped] = useState(true);
    // const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId );

    const asset = inheritance.assetsObj.indivisibleAssetsList.find(asst=> asst.id === assetAllocation.assetId)
    

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
                    <label>Valoracion</label>
                    <div>{assetAllocation.valuePOV} €</div>   
                </div>
                

                {!isWrapped && (
                    <div className="unwrapped-content">

                        <div className='card-data-item'>
                            <label>Valor de referncia</label>
                            <div>{asset.refValue} {"€"}</div>
                        </div>


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
export default SolutionIndivisibleAsset;