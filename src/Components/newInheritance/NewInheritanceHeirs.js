import React, {useState} from "react";
import HeirData from "../HeirData";
import NewHeirModal from "../NewHeirModal";
const NewInheritanceHeirs = ({heirsList, setHeirsList}) => {

    const [heirModalIsOpen, setHeirModalIsOpen] = useState(false);
    const [heirToEdit, setHeirToEdit] = useState(null);

    const removeHeir = (heirId) => {
        setHeirsList(heirsList.filter(heir => heir.id !== heirId))
    };

    const editHeir = (heirId) => {
        let auxHeir = heirsList.find(heir => heir.id === heirId);
        setHeirToEdit({...auxHeir});
        setHeirModalIsOpen(true);
    }

    return (
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
    )
}
export default NewInheritanceHeirs;

