import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import NewHeirForm from '../heirCards/NewHeirForm';
import SimpleReactValidator from 'simple-react-validator';
import Select from 'react-select';
import AssetDivisibleForm from './AssetDivisibleForm';
import AssetIndivisibleForm from './AssetIndivisibleForm';
import AssetDivisivleInChunksForm from './AssetDivisivleInChunksForm';

Modal.setAppElement('#root');  // Required for accessibility


const NewAssetModal = ({modalIsOpen, setModalIsOpen, assetsObj, setAssetsObj, ownershipsList,
    assetData, setAssetData, assetDataType //these ones only used when editing an asset
}) => {

    const [assetType, setAssetType] = useState(null);
    console.log(ownershipsList)
    
    const assetOptionsList = [
        {label: "Divisible", value: "divisible"},
        {label: "Indivisible", value: "indivisible"},
        {label: "Divisible por trozos", value: "divisibleInChunks"},
        {label: "Divisible por partes", value: "divisibleInParts"}
    ];

    useEffect(() => {
        console.log(assetsObj)
        if (assetData) {
            loadData();
        }
    }, [modalIsOpen]) // To load when modal is open

    const loadData = () => {
        let auxAssetType = assetOptionsList.find(type => type.value === assetDataType);
        setAssetType(auxAssetType);
    }
            
    const closeModal = () =>{
        setAssetType(null);
        setModalIsOpen(false);
    }
    

    return(
        <Modal
            className="custom-item-modal"
            overlayClassName="custom-modal-overlay"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            
        >
            <div className="modal-header">
                {/* <h2 className="modal-title">{title}</h2> */}
                <div className="modal-close-button-container" onClick={closeModal}>
                    <span className="material-symbols-outlined">close</span>
                </div>
            </div>
            
            <div className='modal-content-container'>
                <div className="modal-content">
                    <div className='form-group'>
                        <label>Tipo bien:</label>
                        <Select
                            options={assetOptionsList}
                            value={assetType}
                            onChange={setAssetType}
                            isDisabled={assetData && assetType} // If asset data exists means it is being edited. Hence, changing type is not allowed
                            classNamePrefix="react-select" // Apply custom prefix
                        />
                    </div>

                    {(assetType && assetType.value === 'divisible') && (
                        <AssetDivisibleForm
                            assetsObj={assetsObj}
                            setAssetsObj={setAssetsObj}
                            closeModal={closeModal}
                            ownershipsList={ownershipsList}
                            assetData={assetData}
                            setAssetData={setAssetData}
                        />
                    )}

                    {(assetType && assetType.value === 'indivisible') && (
                        <AssetIndivisibleForm
                            assetsObj={assetsObj}
                            setAssetsObj={setAssetsObj}
                            closeModal={closeModal}
                            ownershipsList={ownershipsList}
                            assetData={assetData}
                            setAssetData={setAssetData}
                        />
                    )}

                    {(assetType && assetType.value === 'divisibleInChunks') && (
                        <AssetDivisivleInChunksForm
                            assetsObj={assetsObj}
                            setAssetsObj={setAssetsObj}
                            closeModal={closeModal}
                            ownershipsList={ownershipsList}
                            assetData={assetData}
                            setAssetData={setAssetData}
                            
                        />
                    )}
                </div>
            </div>
        </Modal>
    )
}
export default NewAssetModal;


// {
//     heirsList: [
//         // Lista objetos heredero
//     ],
//     assetsObj: {
//         divisibleAssetsList: [], // Lista objetos divisibleAsset
//         indivisibleAssetsList: [], // Lista objetos indivisibleAsset
//         divisibleInChunksAssetsList: [], // Lista objetos divisibleInChunksAsset
//         divisibleInPartsAssetsList: [] // Lista objetos divisibleInPartsAsset
//     },
//     ownershipsList: [
//         // Lista objetos ownership
//     ]
// }