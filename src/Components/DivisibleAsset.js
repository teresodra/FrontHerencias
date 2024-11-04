import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const DivisibleAsset = ({asset, assetsObj, setAssetsObj, ownershipList, removeAsset, editAsset}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    console.log(asset)
    const ownership = ownershipList.find(ownership => ownership.id === asset.ownership )
    

    return (
        <div className='card-data-container'>
            <div className='card-data-button-container'>
                <div onClick={() => {removeAsset(asset.id);}}>
                    <span className="material-symbols-outlined">close</span>
                </div>

                {/* <div onClick={() => {setModalIsOpen(true);}}> */}
                <div onClick={() => {editAsset(asset.id);}}>
                    <span className="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div className='card-data-content'>
                <div className='card-data-item'>
                    <div>Nombre</div>
                    <div>{asset.name}</div>
                </div>

                <div className='card-data-item'>
                    <div>Cantidad</div>
                    <div>{asset.quantity}</div>
                </div>

                <div className='card-data-item'>
                    <div>Valor de mercado por unidad</div>
                    <div>{asset.marketValue} {"€"}</div>
                </div>

                <div className='card-data-item'>
                    <div>Categoría</div>
                    <div>{asset.category}</div>
                </div>

                <div className='card-data-item'>
                    <div>Ownership</div>
                    <div>{ownership.name}</div>
                </div>
            </div>

            <NewAssetModal
                modalIsOpen={modalIsOpen}
                setModalIsOpen={setModalIsOpen}
                assetsObj={assetsObj}
                setAssetsObj={setAssetsObj}
                ownershipList={ownershipList}
                assetData={asset}
                assetDataType={'divisible'}
            />
        </div>
    )
};
export default DivisibleAsset;