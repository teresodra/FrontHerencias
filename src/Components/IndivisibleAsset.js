import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const IndivisibleAsset = ({asset, assetsObj, setAssetsObj, ownershipList, removeAsset, editAsset}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const ownership = ownershipList.find(ownership => ownership.id === asset.ownership );
    
    return (
        <div className='card-data-container'>

            <div className='card-data-button-container'>
                <div onClick={() => {removeAsset(asset.id)}}>
                    <span className="material-symbols-outlined">close</span>
                </div>

                {/* <div onClick={() => {setModalIsOpen(true)}}> */}
                <div onClick={() => {editAsset(asset.id, 'indivisible')}}>
                    <span className="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div className='card-data-content'>
                <div className='card-data-item'>
                    <div>Nombre:</div>
                    <div>{asset.name}</div>
                </div>

                <div className='card-data-item'>
                    <div>Valor mercado:</div>
                    <div>{asset.marketValue}</div>
                </div>

                <div className='card-data-item'>
                    <div>Ownership:</div>
                    <div>{ownership.name}</div>
                </div>
            </div>
{/* 
            <NewAssetModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                assetsObj={assetsObj}
                setAssetsObj={setAssetsObj}
                ownershipList={ownershipList}
                assetData={asset}
                assetDataType={'indivisible'}
            /> */}


        </div>
    )
};
export default IndivisibleAsset;