import React, { useEffect, useState } from 'react';
import NewHeirModal from './NewHeirModal';

const HeirData = ({heir, removeHeir, editHeir}) => {
    
    return (
        <div className='card-data-container'>
            
            <div className='card-data-button-container'>
                <div onClick={() => {removeHeir(heir.id);}}>
                    <span className="material-symbols-outlined">close</span>
                </div>

                <div onClick={() => {editHeir(heir.id)}}>
                    <span className="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div className='card-data-content'>
                <div className='card-data-item'>
                    <div>Nombre:</div>
                    <div>{heir.name}</div>
                </div>

                <div className='card-data-item'>
                    <div>Edad:</div>
                    <div>{heir.age}</div>
                </div>
            </div>

        </div>
    )


};
export default HeirData;