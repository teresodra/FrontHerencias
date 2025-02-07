import Modal from 'react-modal';
Modal.setAppElement('#root');  // Required for accessibility


const TermsModal = ({modalIsOpen, setModalIsOpen, title, content}) => {
    
    return(
        <Modal
            className="custom-item-modal"
            overlayClassName="custom-modal-overlay"
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Example Modal"
            
        >
            <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
                <div className="modal-close-button-container" onClick={() => setModalIsOpen(false)}>
                    <span className="material-symbols-outlined" translate="no" aria-hidden="true">close</span>
                </div>
            </div>
            
            <div className='modal-content-container'>
                <text className="modal-text">
                    {content}
                </text>
            </div>
        
        </Modal>
    )
}
export default TermsModal;