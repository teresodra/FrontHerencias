import React, {useState} from "react";
import NewOwnershipModal from "../NewOwnershipModal";
import OwnershipData from "../OwnershipData";

const NewInheritanceOwnerships = ({ownershipsList, setOwnershipsList, heirsList}) => {
    
    const [ownershipToEdit, setOwnershipToEdit] = useState(null);
    const [ownershipModalIsOpen, setOwnershipModalIsOpen] = useState(false);

    const removeOwnership = (ownershipId) => {
        setOwnershipsList(ownershipsList.filter(ownership => ownership.id !== ownershipId))
    };

    const editOwnership = (ownershipId) => {
        let auxOwn = ownershipsList.find(ownership => ownership.id === ownershipId);
        setOwnershipToEdit({...auxOwn});
        setOwnershipModalIsOpen(true);
    }
    
    return (
        <>
            <h2>Propiedades</h2>

            {(ownershipsList.length > 0) && (
                <div className='card-container'>
                {ownershipsList.map((ownership) => (
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
                    Añadir propiedad
                </button>
            </div>

            <NewOwnershipModal
                modalIsOpen={ownershipModalIsOpen}
                setModalIsOpen={setOwnershipModalIsOpen}
                ownershipsList={ownershipsList}
                setOwnershipsList={setOwnershipsList}
                heirsList={heirsList}
                ownershipData={ownershipToEdit}
                setOwnershipData={setOwnershipToEdit}
            />
        </>
    )
};
export default NewInheritanceOwnerships;