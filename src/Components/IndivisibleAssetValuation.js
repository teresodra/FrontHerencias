import React, {useState, useEffect} from "react";
import NewAssetModal from "./NewAssetModal";

const IndivisibleAssetValuation = ({asset, ownershipsList, valuationObj, setValuationObj}) => {


    const [isWrapped, setIsWrapped] = useState(true);
    console.log(asset)
    console.log(valuationObj)
    const [assetValue, setAssetValue] = useState(null);
    const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId );

    console.log(valuationObj)

    useEffect(() => {
        // Initialize value in case already valuated
        setAssetValue(
            valuationObj.assetsValuationObj.indivisibleAssetsList.find(
                indAs => indAs.assetId === asset.id
            )?.wholeAssetValue
        )
    }, []);
        
    const addValuation = (event) => {
        event.stopPropagation(); // Prevent unwrapping when typing the value
        let auxValList = [...valuationObj.assetsValuationObj.indivisibleAssetsList];
        let value = parseFloat(event.target.value) // Convert to float
        const index = auxValList.findIndex(assetVal => assetVal.assetId === asset.id);
        auxValList[index] = {...auxValList[index], wholeAssetValue: value}
        setValuationObj({
            ...valuationObj,
            assetsValuationObj: {
                ...valuationObj.assetsValuationObj,
                indivisibleAssetsList: auxValList
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
                                    value={assetValue}
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