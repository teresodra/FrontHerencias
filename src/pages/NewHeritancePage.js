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
import { v4 as uuidv4 } from 'uuid';
import messagesObj from "../schemas/messages";
import NewInheritanceHeirs from '../Components/newInheritance/NewInheritanceHeirs';
import NewInheritanceName from '../Components/newInheritance/NewInheritanceName';
import NewInheritanceOwnerships from '../Components/newInheritance/NewInheritanceOwnerships';
import NewInheritanceAssets from '../Components/newInheritance/NewInheritanceAssets';
import NewInheritanceRegion from '../Components/newInheritance/NewInheritanceRegion';

const NewHeritancePage = () => {

    // const [heirsList, setHeirsList] = useState([]);
    // To avoid doing it when testing ownership
    // const [heirsList, setHeirsList] = useState([]);
    const [heirsList, setHeirsList] = useState([
        {name: "Mario Martinez Lafuente", id: "sdgfsdfds", age: 26, type: 1},
        {name: "Tereso del Rio Almajano", id: "adsfsaf", age: 26, type: 2},
        {name: "Raul Perez Rodriguez", id: "dsadad", age: 31, type: 3},
        {name: "Miguel Jimenez Garcia", id: "dfzzgzg", age: 66, type: 4},
    ]);
    const [ownershipsList, setOwnershipsList] = useState([]);
    const [assetsObj, setAssetsObj] = useState({});
    const [name, setName] = useState('');
    const [region, setRegion] = useState(null);
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
            inheritanceId: uuidv4(),
            name: name,
            region: region,
            heirsList: heirsList,
            ownershipsList: ownershipsList,
            assetsObj: assetsObj
        }

        console.log(auxInheritance)
        console.log(JSON.stringify(auxInheritance))
        try {
            const result = await apiSaveInheritance(auxInheritance);
            Swal.fire(messagesObj.newInheritanceSuccess);
            navigate(`/inheritance/${result.inheritanceId}`)
            
        } catch (err) {
            console.log(err);
            Swal.fire(messagesObj.newInheritanceError);
        }

    }

    // It is required at least 2 heirs and 1 ownership
    const isNextButtonDisabled = () => {
        return (heirDataStep === 1 && name === '') || (heirDataStep === 2 && !region) || (heirDataStep === 3 && heirsList.length < 2) || (heirDataStep === 4 && ownershipsList.length < 1);
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

                {/* Show inheritance name in following steps */}
                {(name && name !== "" && heirDataStep !== 1) ? (
                    <h1>{name}</h1>
                ) : (
                    <h1>Nueva herencia</h1>
                )}
                

                {/*STEP 1: NAME*/}
                {(heirDataStep === 1) && (
                    <NewInheritanceName
                        name={name}
                        setName={setName}
                    />
                )}
                
                {/*STEP 2: REGION*/}
                {(heirDataStep === 2) && (
                    <NewInheritanceRegion
                        region={region}
                        setRegion={setRegion}
                    />
                )}

                {/*STEP 3: HEIRS*/}
                {(heirDataStep === 3) && (
                    <NewInheritanceHeirs
                        heirsList={heirsList}
                        setHeirsList={setHeirsList}
                    />
                )}

                {/*STEP 4: OWNERSHIP*/}
                {(heirDataStep === 4) && (
                    <NewInheritanceOwnerships
                        ownershipsList={ownershipsList}
                        setOwnershipsList={setOwnershipsList}
                        heirsList={heirsList}
                    />
                )}

                {/*STEP 5: ASSETS*/}
                {(heirDataStep === 5) && (
                    <NewInheritanceAssets
                        assetsObj={assetsObj}
                        setAssetsObj={setAssetsObj}
                        ownershipsList={ownershipsList}
                    />
                )}

                <div className='step-buttons-container'>
                    <div className='button-container'>
                        <button className='custom-button' disabled={heirDataStep === 1} onClick={() => {setHeirDataStep(heirDataStep - 1)}}>
                            Atras
                        </button>
                    </div>

                    <div className="pagination-bars-container">
                        {[1, 2, 3, 4, 5].map((step) => (
                        <div
                            key={step}
                            className={`pagination-bar ${heirDataStep >= step ? 'active' : ''}`}
                        ></div>
                        ))}
                    </div>

                    {(heirDataStep < 5) ? (
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