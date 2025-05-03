import React from 'react';
import Modal from 'react-modal';
import NewOwnershipForm from './NewOwnershipForm';
import { ICON_NAMES } from '../../shared/consts';

Modal.setAppElement('#root'); // Required for accessibility

const NewOwnershipModal = ({
  modalIsOpen,
  setModalIsOpen,
  ownershipsList,
  setOwnershipsList,
  heirsList,
  ownershipData,
  setOwnershipData,
  changeOwnership
}) => {
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Modal
      className="custom-item-modal"
      overlayClassName="custom-modal-overlay"
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      contentLabel="Example Modal"
    >
      <div className="modal-header">
        {/* <h2 className="modal-title">{title}</h2> */}
        <div
          className="modal-close-button-container"
          onClick={() => setModalIsOpen(false)}
        >
          <span className="material-symbols-outlined">{ICON_NAMES.CLOSE}</span>
        </div>
      </div>

      <div className="modal-content-container">
        <div className="modal-content">
          <NewOwnershipForm
            ownershipsList={ownershipsList}
            setOwnershipsList={setOwnershipsList}
            ownershipData={ownershipData}
            setOwnershipData={setOwnershipData}
            heirsList={heirsList}
            changeOwnership={changeOwnership}
            closeModal={closeModal}
          />
        </div>
      </div>
    </Modal>
  );
};
export default NewOwnershipModal;
