import React, { useEffect, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { v4 as uuidv4 } from 'uuid';

const NewOwnershipForm = ({ownershipList, setOwnershipList, heirsList, ownershipData, setOwnershipData, closeModal}) => {
    console.log(ownershipData)
    const [ownership, setOwnership] = useState(ownershipData ? ownershipData : {})
    const [validator] = useState(new SimpleReactValidator());
    const nameRef = React.createRef();

    console.log(heirsList);

    useEffect(() => {
        if (ownershipData) {
            nameRef.current.value = ownershipData.name;
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
            console.log('entro')
        } else {
            validator.showMessages();
        }
    }

    const changeState = () => {
        setOwnership({
            ...ownership, // To keep id if it is being edited
            name: nameRef.current.value
        })
    };

    const addNewOwnership = () => {
        console.log(ownership)
        console.log(ownershipList)
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

    const changeHeirsData = () => {

    }

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

                        <label>Plena propiedad:</label>
                        <input type='number' min="0" max="100"/>

                        <label>Nuda propiedad:</label>
                        <input type='number' min="0" max="100"/>

                        <label>Usfructo vitalicio:</label>
                        <input type='number' min="0" max="100"/>


                    </div>
                ))}


                <button type="submit" className='custom-button'>
                    Guardar
                </button>
            </form>

        </div>
    )
};
export default NewOwnershipForm;