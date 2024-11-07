import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';
import HeirData from '../Components/HeirData';
import NewHeirModal from '../Components/NewHeirModal';
import NewAssetModal from '../Components/NewAssetModal';
import DivisibleAsset from '../Components/DivisibleAsset';
import IndivisibleAsset from '../Components/IndivisibleAsset';
import DivisibleInChunksAsset from '../Components/DivisibleInChunksAsset';
import NewOwnershipModal from '../Components/NewOwnershipModal';
import OwnershipData from '../Components/OwnershipData';
import { apiSaveInheritance } from '../services/api';
import Swal from 'sweetalert2';
import messagesObj from "../schemas/messages";

const NewHeritancePage = () => {

    // const [heirsList, setHeirsList] = useState([]);
    // To avoid doing it when testing ownership
    const [heirsList, setHeirsList] = useState([
        {name: "Mario Martinez Lafuente", id: "sdgfsdfds", age: 26},
        {name: "Tereso del Rio Almajano", id: "adsfsaf", age: 26},
        {name: "Raul Perez Rodriguez", id: "dsadad", age: 31},
        {name: "Miguel Jimenez Garcia", id: "dfzzgzg", age: 66},
    ]);
    const [ownershipList, setOwnershipList] = useState([]);
    const [assetsObj, setAssetsObj] = useState({});
    const [name, setName] = useState('');
    const [heirModalIsOpen, setHeirModalIsOpen] = useState(false);
    const [assetModalIsOpen, setAssetModalIsOpen] = useState(false);
    const [ownershipModalIsOpen, setOwnershipModalIsOpen] = useState(false);

    const [heirToEdit, setHeirToEdit] = useState(null);
    const [ownershipToEdit, setOwnershipToEdit] = useState(null);
    const [assetToEdit, setAssetToEdit] = useState(null);
    const [assetType, setAssetType] = useState(null);

    const [heirDataStep, setHeirDataStep] = useState(1);

    const [validator] = useState(new SimpleReactValidator());

    const navigate = useNavigate();

    const handleSave = async () => {
        const auxInheritance = {
            name: name,
            heirsList: heirsList,
            ownershipList: ownershipList,
            assetsObj: assetsObj
        }

        console.log(auxInheritance)
        console.log(JSON.stringify(auxInheritance))
        try {
            const result = await apiSaveInheritance(auxInheritance);
            Swal.fire(messagesObj.newInheritanceSuccess);
            navigate(`/inheritance/${result.id}`)
            
        } catch (err) {
            console.log(err);
            Swal.fire(messagesObj.newInheritanceError);
        }

    }

    const removeHeir = (heirId) => {
        setHeirsList(heirsList.filter(heir => heir.id !== heirId))
    };

    const editHeir = (heirId) => {
        let auxHeir = heirsList.find(heir => heir.id === heirId);
        setHeirToEdit({...auxHeir});
        setHeirModalIsOpen(true);
    }

    const removeOwnership = (ownershipId) => {
        setOwnershipList(ownershipList.filter(ownership => ownership.id !== ownershipId))
    };

    const editOwnership = (ownershipId) => {
        let auxOwn = ownershipList.find(ownership => ownership.id === ownershipId);
        setOwnershipToEdit({...auxOwn});
        setOwnershipModalIsOpen(true);
    }

    const removeAsset = (assetId) => {
        let auxAssetsObj = {...assetsObj};
        for (let key in auxAssetsObj){
            let assetList = auxAssetsObj[key];
            auxAssetsObj[key] = assetList.filter(asset => asset.id !== assetId)
        }
        setAssetsObj(auxAssetsObj);
    }

    const editAsset = (assetId, assetType) => {
        setAssetType(assetType);
        for (let key in assetsObj){
            let auxAsset =  assetsObj[key].find(asset => asset.id === assetId);
            if (auxAsset) {
                setAssetToEdit(auxAsset);
                setAssetModalIsOpen(true);
                break
            };
        }
    }

    // It is required at least 2 heirs and 1 ownership
    const isNextButtonDisabled = () => {
        return (heirDataStep === 2 && heirsList.length < 2) || (heirDataStep === 3 && ownershipList.length < 1);
    }

    // It is required at least one asset
    const isSaveButtonDisabled = () => {
        for  (let key in assetsObj){
            if (assetsObj[key].length > 0) {
                return false
            }
        }
        return true
    }

    
    return (
        <div className='center'>
            <div className='content'>
                <h1>Nueva herencia</h1>

                {/*STEP 1: NAME*/}
                {(heirDataStep === 1) && (
                    <form className='custom-form'>
                        <div className="form-group">
                            <label>Nombre herencia</label>
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(event) => {setName(event.target.value)}}
                            />
                            {validator.message('name', name, 'required|alpha_num_space')}
                        </div>
                    </form>
                )}
                
                {/*STEP 2: HEIRS*/}
                {(heirDataStep === 2) && (
                    <>
                        <h2>Herederos</h2>
                        {(heirsList.length > 0) && (
                            <div className='card-container'>
                            {heirsList.map((heir) => (
                                <HeirData
                                    key={heir.id}
                                    heir={heir}
                                    removeHeir={removeHeir}
                                    editHeir={editHeir}
                                />
                            ))}
                            </div>
                        )}

                        <div className='button-container'>
                            <button className='custom-button' onClick={() => {setHeirModalIsOpen(true)}}>
                                Añadir heredero
                            </button>
                        </div>

                        <NewHeirModal
                            modalIsOpen={heirModalIsOpen}
                            setModalIsOpen={setHeirModalIsOpen}
                            heirsList={heirsList}
                            setHeirsList={setHeirsList}
                            heirData={heirToEdit}
                            setHeirData={setHeirToEdit}
                        />
                    </>
                )}

                {/*STEP 3: OWNERSHIP*/}
                {(heirDataStep === 3) && (
                    <>
                        <h2>Ownership</h2>

                        {(ownershipList.length > 0) && (
                            <div className='card-container'>
                            {ownershipList.map((ownership) => (
                                <OwnershipData
                                    key={ownership.id}
                                    ownership={ownership}
                                    heirsList={heirsList}
                                    removeOwnership={removeOwnership}
                                    editOwnership={editOwnership}
                                />
                            ))}
                            </div>
                        )}

                        <div className='button-container'>
                            <button className='custom-button' onClick={() => {setOwnershipModalIsOpen(true)}}>
                                Añadir ownership
                            </button>
                        </div>

                        <NewOwnershipModal
                            modalIsOpen={ownershipModalIsOpen}
                            setModalIsOpen={setOwnershipModalIsOpen}
                            ownershipList={ownershipList}
                            setOwnershipList={setOwnershipList}
                            heirsList={heirsList}
                            ownershipData={ownershipToEdit}
                            setOwnershipData={setOwnershipToEdit}
                        />
                    </>
                )}

                {/*STEP 4: ASSETS*/}
                {(heirDataStep === 4) && (
                    <>
                        <h2>Bienes</h2>

                        <div className='button-container'>
                            <button className='custom-button' onClick={() => {setAssetModalIsOpen(true)}}>
                                Añadir bien
                            </button>
                        </div>

                        <NewAssetModal
                            modalIsOpen={assetModalIsOpen}
                            setModalIsOpen={setAssetModalIsOpen}
                            assetsObj={assetsObj}
                            setAssetsObj={setAssetsObj}
                            ownershipList={ownershipList}
                            assetData={assetToEdit}
                            setAssetData={setAssetToEdit}
                            assetDataType={assetType}
                        />

                        {(assetsObj.divisibleAssetsList && assetsObj.divisibleAssetsList.length > 0) && (
                            <>
                            <h3>Bienes divisibles: {assetsObj.divisibleAssetsList.length}</h3>
                            <div className='card-container'>
                                {assetsObj.divisibleAssetsList.map((asset, index) => (
                                    <DivisibleAsset
                                        key={asset.id}
                                        asset={asset}
                                        ownershipList={ownershipList}
                                        assetsObj={assetsObj}
                                        setAssetsObj={setAssetsObj}
                                        removeAsset={removeAsset}
                                        editAsset={editAsset}
                                    />
                                ))}
                            </div>
                            </>
                        )}

                        {(assetsObj.indivisibleAssetsList && assetsObj.indivisibleAssetsList.length > 0) && (
                            <>
                            <h3>Bienes indivisibles: {assetsObj.indivisibleAssetsList.length}</h3>
                            <div className='card-container'>
                                {assetsObj.indivisibleAssetsList.map((asset, index) => (
                                    <IndivisibleAsset
                                        key={asset.id}
                                        asset={asset}
                                        ownershipList={ownershipList} 
                                        assetsObj={assetsObj}
                                        setAssetsObj={setAssetsObj}
                                        removeAsset={removeAsset}
                                        editAsset={editAsset}
                                    />
                                ))}
                            </div>
                            </>
                        )}

                        {(assetsObj.divisibleInChunksAssetsList && assetsObj.divisibleInChunksAssetsList.length > 0) && (
                            <>
                            <h3>Bienes indivisibles: {assetsObj.divisibleInChunksAssetsList.length}</h3>
                            <div className='assets-container'>
                                {assetsObj.divisibleInChunksAssetsList.map((asset, index) => (
                                    <DivisibleInChunksAsset key={asset.id} asset={asset} removeAsset={removeAsset}/>
                                ))}
                            </div>
                            </>
                        )}

                    </>
                )}

                <div className='step-buttons-container'>
                    <div className='button-container'>
                        <button className='custom-button' disabled={heirDataStep === 1} onClick={() => {setHeirDataStep(heirDataStep - 1)}}>
                            Atras
                        </button>
                    </div>

                    <div className="pagination-bars-container">
                        {[1, 2, 3, 4].map((step) => (
                        <div
                            key={step}
                            className={`pagination-bar ${heirDataStep >= step ? 'active' : ''}`}
                        ></div>
                        ))}
                    </div>

                    {(heirDataStep < 4) ? (
                        <div className='button-container'>
                            <button
                                className='custom-button'
                                onClick={() => {setHeirDataStep(heirDataStep + 1)}}
                                disabled={isNextButtonDisabled()}
                            >
                                Siguiente
                            </button>
                        </div>
                    ): (
                        <div className='button-container'>
                            <button className='custom-button' disabled={isSaveButtonDisabled()} onClick={handleSave}>
                                Guardar
                            </button>
                        </div>
                    )}
                    
                </div>

            </div>
        </div>
    )


};
export default NewHeritancePage;