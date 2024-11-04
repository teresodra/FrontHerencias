import React, { useState, useEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import { useSearchParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const AssetIndivisibleForm = ({assetsObj, setAssetsObj, ownershipList, closeModal, assetData, setAssetData}) => {

    const [asset, setAsset] = useState(assetData ? assetData : {});
    const [ownership, setOwnership] = useState(null);
    const ownerShipOptions = ownershipList.map(ownership => ownership = {value: ownership.id, label: ownership.name})

    const nameRef = React.createRef();
    const marketValueRef = React.createRef();
    const [validator] = useState(new SimpleReactValidator());

    useEffect(() => {
        if (assetData) {
            nameRef.current.value = assetData.name;
            marketValueRef.current.value = assetData.marketValue;
            setOwnership(ownerShipOptions.find(owShip => owShip.value === assetData.ownership))
        }
    }, [])

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
            marketValue: marketValueRef.current.value,
            category: null
        })
    }

    const changeOwnership = (event) => {
        setAsset({
            ...asset,
            ownership: event.value
        })
        setOwnership(event)
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
                    <label htmlFor="marketValue">Valor de mercado</label>
                    <input
                        type="text"
                        name="marketValue"
                        ref={marketValueRef}
                        onChange={changeState}
                    />
                    {validator.message('marketValue', asset.marketValue, 'required|numeric')}
                </div>

                <div className="form-group">
                    <label htmlFor="categry">Ownership</label>
                    <Select
                        options={ownerShipOptions}
                        onChange={changeOwnership}
                        placeholder="Seleccionar..."
                        value={ownership}
                    />
                    {validator.message('ownership', asset.ownership, 'required')}
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