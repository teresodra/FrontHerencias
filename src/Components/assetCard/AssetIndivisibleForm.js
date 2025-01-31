import React, { useState, useEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const AssetIndivisibleForm = ({assetsObj, setAssetsObj, ownershipsList, closeModal, assetData, setAssetData}) => {

    const [asset, setAsset] = useState(assetData ? assetData : {});
    const [ownershipId, setOwnershipId] = useState(null);
    const ownerShipOptions = ownershipsList.map(ownership => ownership = {value: ownership.id, label: ownership.name})

    const nameRef = React.createRef();
    const refValueRef = React.createRef();
    const [validator] = useState(new SimpleReactValidator());

    useEffect(() => {
        if (assetData) {
            loadData();
        }
    }, [])

    const loadData = () => {
        nameRef.current.value = assetData.name;
        refValueRef.current.value = assetData.refValue;
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
        const index = assetsObj.indivisibleAssetsList.findIndex(
            (assetObj) => assetObj.id === asset.id
        );
        let auxAssetList = [...assetsObj.indivisibleAssetsList];
        auxAssetList[index] = asset;
        setAssetsObj(
            {
                ...assetsObj,
                indivisibleAssetsList: auxAssetList
            }
        )
        
    } 

    const addNewAsset = () => {
        setAssetsObj(
            {
                ...assetsObj,
                indivisibleAssetsList: [
                    ...(assetsObj?.indivisibleAssetsList || []), // Initially is undefined
                    {...asset, id:  uuidv4()} // Create id so it has a reference to be edited
                ]
            }
        )
    }

    const changeState = () => {
        setAsset({
            ...asset,
            name: nameRef.current.value,
            refValue: refValueRef.current.value,
            category: null
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
                    <label htmlFor="refValue">Valor de referencia</label>
                    <input
                        type="text"
                        name="refValue"
                        ref={refValueRef}
                        onChange={changeState}
                    />
                    {validator.message('refValue', asset.refValue, 'required|numeric')}
                </div>

                <div className="form-group">
                    <label htmlFor="categry">Propiedad</label>
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
export default AssetIndivisibleForm;