import React, { useState, useEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const AssetDivisibleForm = ({assetsObj, setAssetsObj, ownershipsList, closeModal, assetData, setAssetData}) => {

    const [asset, setAsset] = useState(assetData ? assetData : {});
    const [ownershipId, setOwnershipId] = useState(null);
    const [category, setCategory] = useState(null);

    const nameRef = React.createRef();
    const quantityRef = React.createRef();
    const refValueRef = React.createRef();
    console.log(ownershipsList)
    const ownerShipOptions = ownershipsList.map(ownership => ownership = {value: ownership.id, label: ownership.name})

    const categoryOptionsList = [
        {label: "Dinero", value: "cash"},
        {label: "Otro", value: "other"},
    ]

    const [validator] = useState(new SimpleReactValidator());

    useEffect(() => {
        if (assetData) {
            loadData();
        }
    }, [])

    const loadData = () => {
        nameRef.current.value = assetData.name;
        quantityRef.current.value = assetData.quantity;
        refValueRef.current.value = assetData.refValue;
        setOwnershipId(ownerShipOptions.find(owShip => owShip.value === assetData.ownershipId))
        setCategory(categoryOptionsList.find(cat => cat.value === assetData.category))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        changeState();

        if (validator.allValid()){
            if (assetData) {
                editAsset();
                // To avoid loading data to edit when creating the next new item
                setAssetData(null);
            }
            else {
                addNewAsset();
            }
            closeModal();
        } else {
            validator.showMessages();
        }
    }

    const changeState = () => {
        setAsset({
            ...asset,
            name: nameRef.current.value,
            quantity: quantityRef.current.value,
            refValue: refValueRef.current.value,
        })
    }

    const editAsset = () => {
        // Find asset index from assetList
        const index = assetsObj.divisibleAssetsList.findIndex(
            (assetObj) => assetObj.id === asset.id
        );
        let auxAssetList = [...assetsObj.divisibleAssetsList];
        auxAssetList[index] = asset;
        setAssetsObj(
            {
                ...assetsObj,
                divisibleAssetsList: auxAssetList
            }
        )
        
    } 

    const addNewAsset = () => {
        console.log(assetsObj)
        setAssetsObj(
            {
                ...assetsObj,
                divisibleAssetsList: [
                    ...(assetsObj?.divisibleAssetsList || []), // Initially is undefined
                    {...asset, id:  uuidv4()} // Create id so it has a reference to be edited
                ]
            }
        )
    }

    const changeCategory = (event) =>{
        setAsset({
            ...asset,
            category: event.value
        })
        setCategory(event);
    }

    const changeOwnership = (event) => {
        setAsset({
            ...asset,
            ownershipId: event.value
        })
        setOwnershipId(event);
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
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="text"
                        name="cantidad"
                        ref={quantityRef}
                        onChange={changeState}
                        
                    />
                    {validator.message('quantity', asset.quantity, 'required|numeric|min:0,num')}
                </div>

                <div className="form-group">
                    <label htmlFor="refValue">Valor de referencia por unidad</label>
                    <input
                        type="text"
                        name="refValue"
                        ref={refValueRef}
                        onChange={changeState}
                    />
                    {validator.message('refValue', asset.refValue, 'required|numeric')}
                </div>

                <div className="form-group">
                    <label htmlFor="categry">Categoría</label>
                    <Select
                        options={categoryOptionsList}
                        onChange={changeCategory}
                        placeholder="Seleccionar..."
                        value={category}
                        classNamePrefix="react-select" // Apply custom prefix
                    />
                    {validator.message('category', asset.category, 'required')}
                </div>

                <div className="form-group">
                    <label htmlFor="categry">Propiedad</label>
                    <Select
                        options={ownerShipOptions}
                        onChange={changeOwnership}
                        value={ownershipId}
                        placeholder="Seleccionar..."
                        classNamePrefix="react-select" // Apply custom prefix
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
export default AssetDivisibleForm;