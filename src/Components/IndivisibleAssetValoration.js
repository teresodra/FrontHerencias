import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const IndivisibleAssetValoration = ({asset, ownershipList, valorationObj, setValorationObj}) => {


    const [isWrapped, setIsWrapped] = useState(true);
    const ownership = ownershipList.find(ownership => ownership.id === asset.ownership );
        
    const addValoration = (event) => {
        event.stopPropagation(); // Prevent unwrapping when typing the value
        let auxValList = [...valorationObj.assetsValoration.indivisibleAssetsList];
        const index = auxValList.findIndex(assetVal => assetVal.id === asset.id);
        auxValList[index] = {...auxValList[index], value: event.target.value}
        setValorationObj({
            ...valorationObj,
            assetsValoration: {
                ...valorationObj.assetsValoration,
                indivisibleAssetsList: auxValList
            }
           
        })
        console.log({
            ...valorationObj,
            indivisibleAssetsList: auxValList
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
                                    onChange={addValoration}
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
export default IndivisibleAssetValoration;