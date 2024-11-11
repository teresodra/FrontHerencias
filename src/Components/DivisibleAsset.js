import React, {useState} from "react";
import NewAssetModal from "./NewAssetModal";

const DivisibleAsset = ({asset, ownershipsList, removeAsset, editAsset}) => {

    console.log(asset)
    const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId )
    

    return (
        <div className='card-data-container'>
            <div className='card-data-button-container'>
                <div onClick={() => {removeAsset(asset.id);}}>
                    <span className="material-symbols-outlined">close</span>
                </div>

                {/* <div onClick={() => {setModalIsOpen(true);}}> */}
                <div onClick={() => {editAsset(asset.id, 'divisible');}}>
                    <span className="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div className='card-data-content'>
                <div className='card-data-item'>
                    <label>Nombre</label>
                    <div>{asset.name}</div>
                </div>

                <div className='card-data-item'>
                    <label>Cantidad</label>
                    <div>{asset.quantity}</div>
                </div>

                <div className='card-data-item'>
                    <label>Valor de referencia por unidad</label>
                    <div>{asset.refValue} {"€"}</div>
                </div>

                <div className='card-data-item'>
                    <label>Categoría</label>
                    <div>{asset.category}</div>
                </div>

                <div className='card-data-item'>
                    <label>Ownership</label>
                    <div>{ownership.name}</div>
                </div>
            </div>

        </div>
    )
};
export default DivisibleAsset;