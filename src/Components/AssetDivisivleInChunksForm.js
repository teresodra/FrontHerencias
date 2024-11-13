import React, { useState, useEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const AssetDivisivleInChunksForm = ({assetsObj, setAssetsObj, ownershipsList, closeModal, assetData, setAssetData}) => {

    const [asset, setAsset] = useState({});
    const [ownershipId, setOwnershipId] = useState(null);
    const ownerShipOptions = ownershipsList.map(ownership => ownership = {value: ownership.id, label: ownership.name})


    const unitSizeOptions = [
        {label: "m2", value: "m2"},
        {label: "hectareas", value: "hect"},
    ]
    
    const [unitSize, setUnitSize] = useState(unitSizeOptions[0]);

    const nameRef = React.createRef();
    const totalSizeRef = React.createRef();
    const refValueRef = React.createRef();
    const minimumSizeRef = React.createRef();

    
    const [validator] = useState(new SimpleReactValidator());

    useEffect(() => {
        if (assetData) {
            loadData();
        }
    }, [])

    const loadData = () => {
        nameRef.current.value = assetData.name;
        totalSizeRef.current.value = assetData.totalSize;
        refValueRef.current.value = assetData.refValue;
        minimumSizeRef.current.value = assetData.minimumSize;
        setOwnershipId(ownerShipOptions.find(owShip => owShip.value === assetData.ownershipId));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        changeState();


        if (validator.allValid()){
            if (assetData) {
                editAsset();
                // To avoid loading data to edit when creating the next new item
                setAssetData();
            }
            else {
                addNewAsset();
            }
            closeModal();
        } else {
            validator.showMessages();
        }
    }

    const editAsset = () => {
        // Find asset index from assetList
        console.log(assetsObj)
        const index = assetsObj.divisibleInChunksAssetsList.findIndex(
            (assetObj) => assetObj.id === asset.id
        );
        let auxAssetList = [...assetsObj.divisibleInChunksAssetsList];
        auxAssetList[index] = asset;
        setAssetsObj(
            {
                ...assetsObj,
                divisibleInChunksAssetsList: auxAssetList
            }
        )
    }

    const addNewAsset = () => {
        setAssetsObj(
            {
                ...assetsObj,
                divisibleInChunksAssetsList: [
                    ...(assetsObj?.divisibleInChunksAssetsList || []), // Initially is undefined
                    {...asset, id:  uuidv4()} // Create id so it has a reference to be edited
                ]
            }
        )
    }

    const changeState = () => {
        setAsset({
            ...asset,
            name: nameRef.current.value,
            totalSize: totalSizeRef.current.value,
            minimumSize: minimumSizeRef.current.value,
            refValue: refValueRef.current.value,
            unitSize: unitSize.value,
            category: null
        })
    }


    const changeUnitSize = (event) => {
        setUnitSize(event);
        setAsset({
            ...asset,
            unitSize: event.value
        })
    }

    const changeOwnership = (event) => {
        setAsset({
            ...asset,
            ownershipId: event.value
        })
        setOwnershipId(event)
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
                    <label htmlFor="refValue">Valor de referencia por {unitSize.label}</label>
                    <input
                        type="text"
                        name="refValue"
                        ref={refValueRef}
                        onChange={changeState}
                    />
                    {validator.message('refValue', asset.refValue, 'required|numeric')}
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

                <div className="form-group">
                    <label htmlFor="categry">Ownership</label>
                    <Select
                        options={ownerShipOptions}
                        onChange={changeOwnership}
                        placeholder="Seleccionar..."
                        value={ownershipId}
                    />
                    {validator.message('ownership', asset.ownershipId, 'required')}
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