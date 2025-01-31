import React, {useState} from "react";
import NewAssetModal from "../assetCard/NewAssetModal";
import DivisibleAsset from "../assetCard/DivisibleAsset";
import IndivisibleAsset from "../assetCard/IndivisibleAsset";
import DivisibleInChunksAsset from "../assetCard/DivisibleInChunksAsset";

const NewInheritanceAssets = ({assetsObj, setAssetsObj, ownershipsList}) => {

    const [assetModalIsOpen, setAssetModalIsOpen] = useState(false);
    const [assetToEdit, setAssetToEdit] = useState(null);
    const [assetType, setAssetType] = useState(null);

    const removeAsset = (assetId) => {
        let auxAssetsObj = {...assetsObj};
        for (let key in auxAssetsObj){
            let assetList = auxAssetsObj[key];
            auxAssetsObj[key] = assetList.filter(asset => asset.id !== assetId)
        }
        setAssetsObj(auxAssetsObj);
    }

    const editAsset = (assetId, assetType) => {
        setAssetType(assetType);
        for (let key in assetsObj){
            let auxAsset =  assetsObj[key].find(asset => asset.id === assetId);
            if (auxAsset) {
                setAssetToEdit(auxAsset);
                setAssetModalIsOpen(true);
                break
            };
        }
    }

    return (
        <>
            <h2>Bienes</h2>

            <div className='button-container'>
                <button className='custom-button' onClick={() => {setAssetModalIsOpen(true)}}>
                    Añadir bien
                </button>
            </div>
            
            <NewAssetModal
                modalIsOpen={assetModalIsOpen}
                setModalIsOpen={setAssetModalIsOpen}
                assetsObj={assetsObj}
                setAssetsObj={setAssetsObj}
                ownershipsList={ownershipsList}
                assetData={assetToEdit}
                setAssetData={setAssetToEdit}
                assetDataType={assetType}
            />

            {(assetsObj.divisibleAssetsList && assetsObj.divisibleAssetsList.length > 0) && (
                <>
                <h3>Bienes divisibles: {assetsObj.divisibleAssetsList.length}</h3>
                <div className='card-container'>
                    {assetsObj.divisibleAssetsList.map((asset, index) => (
                        <DivisibleAsset
                            key={asset.id}
                            asset={asset}
                            ownershipsList={ownershipsList}
                            assetsObj={assetsObj}
                            setAssetsObj={setAssetsObj}
                            removeAsset={removeAsset}
                            editAsset={editAsset}
                        />
                    ))}
                </div>
                </>
            )}
            
            {(assetsObj.indivisibleAssetsList && assetsObj.indivisibleAssetsList.length > 0) && (
                <>
                <h3>Bienes indivisibles: {assetsObj.indivisibleAssetsList.length}</h3>
                <div className='card-container'>
                    {assetsObj.indivisibleAssetsList.map((asset, index) => (
                        <IndivisibleAsset
                            key={asset.id}
                            asset={asset}
                            ownershipsList={ownershipsList} 
                            assetsObj={assetsObj}
                            setAssetsObj={setAssetsObj}
                            removeAsset={removeAsset}
                            
                        />
                    ))}
                </div>
                </>
            )}
            
            {(assetsObj.divisibleInChunksAssetsList && assetsObj.divisibleInChunksAssetsList.length > 0) && (
                <>
                <h3>Bienes divisibles en trozos: {assetsObj.divisibleInChunksAssetsList.length}</h3>
                <div className='assets-container'>
                    {assetsObj.divisibleInChunksAssetsList.map((asset, index) => (
                        <DivisibleInChunksAsset
                            key={asset.id}
                            asset={asset}
                            ownershipsList={ownershipsList} 
                            removeAsset={removeAsset}
                            editAsset={editAsset}
                        />
                    ))}
                </div>
                </>
            )}

        </>
    )
};
export default NewInheritanceAssets;