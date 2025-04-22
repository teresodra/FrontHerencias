import React from 'react';
import Modal from 'react-modal';
import NewHeirForm from './NewHeirForm';
import { ICON_NAMES } from '../../shared/consts';

Modal.setAppElement('#root'); // Required for accessibility

const NewHeirModal = ({
  modalIsOpen,
  setModalIsOpen,
  heirsList,
  setHeirsList,
  heirData,
  setHeirData,
  valuationObj,
  setValuationObj
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
          <NewHeirForm
            heirsList={heirsList}
            setHeirsList={setHeirsList}
            heirData={heirData}
            setHeirData={setHeirData}
            valuationObj={valuationObj}
            setValuationObj={setValuationObj}
            closeModal={closeModal}
          />
        </div>
      </div>
    </Modal>
  );
};
export default NewHeirModal;
