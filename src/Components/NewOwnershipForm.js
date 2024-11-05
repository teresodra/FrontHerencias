import React, { useEffect, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { v4 as uuidv4 } from 'uuid';

const NewOwnershipForm = ({ownershipList, setOwnershipList, heirsList, ownershipData, setOwnershipData, closeModal}) => {

    const [ownership, setOwnership] = useState(ownershipData ? ownershipData : {})
    const [heirPercObj, setHeirPercObj] = useState({});

    const [validator] = useState(new SimpleReactValidator({
        validators: {
            allFilled: {
                message: 'Please fill all heir percentage inputs.',
                rule: (val) => {
                    const { heirPercObj } = val;
                    for (let heirId in heirPercObj) {
                        const heir = heirPercObj[heirId];
                        if (heir.pp === null || heir.np === null || heir.uv === null) {
                            return false;
                        }
                    }
                    return true;
                }, 
                required: true
            }
        }
    }));

    const nameRef = React.createRef();

    useEffect(() => {
        if (ownershipData) {
            nameRef.current.value = ownershipData.name;
        } else {
            initializeHeirPercObj();
        }
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        changeState();

        if (validator.allValid()){
            
            if (ownershipData) {
                editOwnership();
                // To avoid loading data to edit when creating the next new item
                setOwnershipData(null);
            } else {
                addNewOwnership();
            }
            closeModal();
        } else {
            validator.showMessages();
        }
    }

    const changeState = () => {
        setOwnership({
            ...ownership, // To keep id if it is being edited
            name: nameRef.current.value,
        })
    };

    const addNewOwnership = () => {
        setOwnershipList([
            ...ownershipList,
            {...ownership, id: uuidv4()} // Create id so it has a reference to be edited
        ])
    }

    const editOwnership = () => {
        // Find ownership index from ownershipList
        const index = ownershipList.findIndex((ownObj) => ownObj.id === ownership.id);
        let auxOwnershipList = [...ownershipList];
        auxOwnershipList[index] = ownership;
        setOwnershipList(auxOwnershipList);
    }

    const initializeHeirPercObj = () =>{
        let auxObj = {};
        for (let heir of heirsList){
            auxObj[heir.id] = {pp: null, np: null, uv: null}
        }
        setOwnership({...ownership, heirPercObj: auxObj});
    }

    const changeHeirsData = () => {

    }

    const handleInputChange = (heirId, field, value) => {
        setOwnership((prev) => ({
            ...prev,
            heirPercObj: {
                ...prev.heirPercObj,
                [heirId]: {
                    ...prev.heirPercObj[heirId],
                    [field]: value
                }
            }
        }));
    };

    // Validator to check that all the percentages are filled
    const validateHeirPercObj = () => {
        const { heirPercObj } = ownership;
        for (let heirId in heirPercObj) {
            const heir = heirPercObj[heirId];
            if (heir.pp === null || heir.np === null || heir.uv === null) {
                return false;
            }
        }
        return true;
    };

    return (
        <div>
            <form className='modal-form' onSubmit={handleSubmit}>
                <div className='form-group' >
                    <label htmlFor="name">Nombre</label>
                    <input
                        type='text'
                        name="name"
                        ref={nameRef}
                        onChange={changeState}
                    />
                    {validator.message('name', ownership.name, 'required|alpha_num_space')}
                </div>

                {heirsList.map((heir) => (
                    <div key={heir.id} className='form-group'>

                        <div>{heir.name}</div>

                        <div className='ownership-values-container'>
                            <label>Plena propiedad:</label>
                            <input type='number' min="0" max="100" onChange={(e) => handleInputChange(heir.id, 'pp', e.target.value)}/>
                        </div>

                        <div className='ownership-values-container'>
                            <label>Nuda propiedad:</label>
                            <input type='number' min="0" max="100" onChange={(e) => handleInputChange(heir.id, 'np', e.target.value)}/>
                        </div>

                        <div className='ownership-values-container'>
                            <label>Usfructo vitalicio:</label>
                            <input type='number' min="0" max="100" onChange={(e) => handleInputChange(heir.id, 'uv', e.target.value)}/>
                        </div>

                    </div>
                ))}
                {validator.message('heirPercObj', ownership, 'allFilled')}


                <button type="submit" className='custom-button'>
                    Guardar
                </button>
            </form>

        </div>
    )
};
export default NewOwnershipForm;