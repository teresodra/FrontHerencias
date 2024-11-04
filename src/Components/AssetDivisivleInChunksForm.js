import React, { useState } from "react";
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { useSearchParams } from "react-router-dom";

const AssetDivisivleInChunksForm = ({assetsObj, setAssetsObj, closeModal}) => {

    const [asset, setAsset] = useState({});

    const unitSizeOptions = [
        {label: "m2", value: "m2"},
        {label: "hectareas", value: "hect"},
    ]
    
    const [unitSize, setUnitSize] = useState(unitSizeOptions[0]);

    const nameRef = React.createRef();
    const totalSizeRef = React.createRef();
    const marketValueRef = React.createRef();
    const minimumSizeRef = React.createRef();

    

    const validator = new SimpleReactValidator();

    const handleSubmit = (e) => {
        e.preventDefault();
        changeState();
        console.log('submit')
        if (validator.allValid()){
            console.log('entro')
            updateAssetObj();
            closeModal();
        } else {
            validator.showMessages();
        }
    }

    const changeState = () => {
        setAsset({
            ...asset,
            name: nameRef.current.value,
            totalSize: totalSizeRef.current.value,
            minimumSize: minimumSizeRef.current.value,
            marketValue: marketValueRef.current.value,
            unitSize: unitSize.value,
            category: null
        })
    }

    const updateAssetObj = () => {
        console.log(assetsObj)
        setAssetsObj(
            {
                ...assetsObj,
                divisibleInChunksAssetsList: [
                    ...(assetsObj?.divisibleInChunksAssetsList || []), // Initially is undefined
                    asset
                ]
            }
        )
    }

    const changeUnitSize = (event) => {
        setUnitSize(event);
        setAsset({
            ...asset,
            unitSize: event.value
        })
    }


    return (
        <div>
            <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Nombre del bien</label>
                    <input
                        type="text"
                        name="name"
                        ref={nameRef}
                        onChange={changeState}
                    />
                    {validator.message('name', asset.name, 'required|alpha_num_space')}
                </div>

                <div className="form-group">
                    <label htmlFor="unitSize">Unidades</label>
                    <Select
                        name="unitSize"
                        options={unitSizeOptions}
                        value={unitSize}
                        onChange={changeUnitSize}
                        placeholder="Seleccionar..."
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="totalSize">Tamaño total en {unitSize.label}</label>
                    <input
                        type="text"
                        name="totalSize"
                        ref={totalSizeRef}
                        onChange={changeState}
                    />
                    {validator.message('totalSize', asset.totalSize, 'required|numeric|min:0,num')}
                </div>

                <div className="form-group">
                    <label htmlFor="marketValue">Valor de mercado por {unitSize.label}</label>
                    <input
                        type="text"
                        name="marketValue"
                        ref={marketValueRef}
                        onChange={changeState}
                    />
                    {validator.message('marketValue', asset.marketValue, 'required|numeric')}
                </div>

                <div className="form-group">
                    <label htmlFor="minimumSize">Tamaño minimo por parte en {unitSize.label}</label>
                    <input
                        type="text"
                        name="minimumSize"
                        ref={minimumSizeRef}
                        onChange={changeState}
                    />
                    {validator.message('minimumSize', asset.minimumSize, 'required|numeric')}
                </div>


                <div className='formGroup'>
                    <div className='button-container'>
                        <button className='custom-button' type='submit'>
                            Guardar
                        </button>
                    </div>
                </div>
            </form>
        </div>
        
    )
};
export default AssetDivisivleInChunksForm;