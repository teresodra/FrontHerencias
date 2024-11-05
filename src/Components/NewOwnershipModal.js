import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import NewHeirForm from './NewHeirForm';
import SimpleReactValidator from 'simple-react-validator';
import NewOwnershipForm from './NewOwnershipForm';

Modal.setAppElement('#root');  // Required for accessibility

const NewOwnershipModal = ({modalIsOpen, setModalIsOpen, ownershipList, setOwnershipList, heirsList,
    ownershipData, setOwnershipData
}) => {
    
    const closeModal = () => {
        setModalIsOpen(false);
    }

    console.log(ownershipList)
    
    return(
        <Modal
            className="custom-item-modal"
            overlayClassName="custom-modal-overlay"
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Example Modal"
            
        >
            <div className="modal-header">
                {/* <h2 className="modal-title">{title}</h2> */}
                <div className="modal-close-button-container" onClick={() => setModalIsOpen(false)}>
                    <span className="material-symbols-outlined">close</span>
                </div>
            </div>
            
            <div className='modal-content-container'>
                <div className="modal-content">
                    <NewOwnershipForm
                        ownershipList={ownershipList}
                        setOwnershipList={setOwnershipList}
                        ownershipData={ownershipData}
                        setOwnershipData={setOwnershipData}
                        heirsList={heirsList}
                        closeModal={closeModal}
                    />
 
                </div>
            </div>
        </Modal>
    )
}
export default NewOwnershipModal;