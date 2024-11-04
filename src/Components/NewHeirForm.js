import { toHaveDescription } from '@testing-library/jest-dom/matchers';
import React, { useEffect, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { v4 as uuidv4 } from 'uuid';


const NewHeirForm = ({heirsList, setHeirsList, heirData, setHeirData, closeModal}) => {

    const [heir, setHeir] = useState(heirData ? heirData : {})
    
    const nameRef = React.createRef();
    const percentageRef = React.createRef();

    const [validator] = useState(new SimpleReactValidator());
    
    useEffect(() => {
        if (heirData) {
            nameRef.current.value = heirData.name;
            percentageRef.current.value = heirData.percentage;
        }
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        changeState();

        if (validator.allValid()){
            
            if (heirData) {
                editHeir();
                // To avoid loading data to edit when creating the next new item
                setHeirData(null);  
            } else {
                addNewHeir();
            }
            
            closeModal();
            console.log('entro')
        } else {
            validator.showMessages();
        }
    }

    const changeState = () => {
        setHeir({
            ...heir, // To keep id if it is being edited
            name: nameRef.current.value,
            percentage: percentageRef.current.value
        })
    }

    // Add a new heir to the heirs list
    const addNewHeir = () => {
        setHeirsList([
            ...heirsList,
            {...heir, id:  uuidv4()} // Create id so it has a reference to be edited
        ])
    }

    // Edit the heir data
    const editHeir = () => {
        // Find heir index from heirsList
        const index = heirsList.findIndex((heirObj) => heirObj.id === heir.id);
        let auxHeirsList = [...heirsList];
        auxHeirsList[index] = heir;
        setHeirsList(auxHeirsList);
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
                    {validator.message('name', heir.name, 'required|alpha_num_space')}
                </div>

                <div className='form-group'>
                    <label htmlFor="percentage">Porcentaje</label>
                    <input
                        type='text'
                        name="percentage"
                        ref={percentageRef}
                        onChange={changeState}
                    />
                    {validator.message('percentage', heir.percentage, 'required|numeric|min:0,num|max:100,num')}
                    
                </div>

                <button type="submit" className='custom-button'>
                    Guardar
                </button>
            </form>

        </div>
    )
}
export default NewHeirForm;