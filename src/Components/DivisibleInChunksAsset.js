import React from "react";

const DivisibleInChunksAsset = ({asset}) => {

    return (
        <div>
            <div>Nombre</div>
            <div>{asset.name}</div>

            <div>Tamaño total en {asset.unitSize}</div>
            <div>{asset.totalSize}</div>

            <div>Valor de mercado por {asset.unitSize}</div>
            <div>{asset.marketValue} {"€"}</div>

            <div>Tamaño mínimo</div>
            <div>{asset.minimumSize} {"€"}</div>


        </div>
    )
};
export default DivisibleInChunksAsset;