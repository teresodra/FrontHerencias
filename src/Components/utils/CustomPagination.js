import React from "react";
import { ClipLoader } from 'react-spinners';

const CustomPagination = ({
    numSteps,
    currentStep,
    setCurrentStep,
    isNextButtonDisabled,
    isSaveButtonDisabled,
    handleSave,
    isSaving
}) => {

    return (
        <div className='step-buttons-container'>
            <div className='button-container'>
                <button className='custom-button' disabled={currentStep === 1} onClick={() => {setCurrentStep(currentStep - 1)}}>
                    Atras
                </button>
            </div>

            <div className="pagination-bars-container">
                {Array.from({ length: numSteps }, (_, i) => i + 1).map((step) => (
                <div
                    key={step}
                    className={`pagination-bar ${currentStep >= step ? 'active' : ''}`}
                ></div>
                ))}
            </div>

            {(currentStep < numSteps) ? (
                <div className='button-container'>
                    <button
                        className='custom-button'
                        onClick={() => {setCurrentStep(currentStep + 1)}}
                        disabled={isNextButtonDisabled()}
                    >
                        Siguiente
                    </button>
                </div>
            ): (
                <div className='button-container'>
                    <button className='custom-button' disabled={isSaveButtonDisabled() || isSaving} onClick={handleSave}>
                        {!isSaving ? (
                            "Guardar"
                        ) : (
                            <div className="custom-button-spinner-container">
                                <ClipLoader
                                    className="custom-button-spinner"
                                    loading={true}
                                    color="white"
                                />
                            </div>
                        )}
                    </button>
                </div>
            )}
        </div>
    )
};
export default CustomPagination;