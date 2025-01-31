import React from "react";

const DivisibleInChunksAsset = ({asset, ownershipsList, removeAsset, editAsset}) => {

    const ownership = ownershipsList.find(ownership => ownership.id === asset.ownershipId )

    return (
        <div className='card-data-container'>
            <div className='card-data-button-container'>
                <div onClick={() => {removeAsset(asset.id);}}>
                    <span className="material-symbols-outlined">close</span>
                </div>

                <div onClick={() => {editAsset(asset.id, 'divisibleInChunks');}}>
                    <span className="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div className='card-data-content'>
                <div className='card-data-item'>
                    <label>Nombre</label>
                    <div>{asset.name}</div>
                </div>

                <div className='card-data-item'>
                    <label>Tamaño total ({asset.unitSize})</label>
                    <div>{asset.totalSize}</div>
                </div>

                <div className='card-data-item'>
                    <label>Valor de referencia por {asset.unitSize}</label>
                    <div>{asset.refValue} {"€"}</div>
                </div>

                <div className='card-data-item'>
                    <label>Tamaño mínimo ({asset.unitSize})</label>
                    <div>{asset.minimumSize}</div>
                </div>

                <div className='card-data-item'>
                    <label>Ownership</label>
                    <div>{ownership.name}</div>
                </div>
            </div>


        </div>
    )
};
export default DivisibleInChunksAsset;