import React, { useEffect, useState } from 'react';
import NewOwnershipModal from './NewOwnershipModal';

const OwnershipData = ({ownership, heirsList, removeOwnership, editOwnership}) => {
                
    console.log(ownership)
    
    return (
        <div className='card-data-container'>
            
            <div className='card-data-button-container'>
                <div onClick={() => {removeOwnership(ownership.id);}}>
                    <span className="material-symbols-outlined">close</span>
                </div>

                <div onClick={() => {editOwnership(ownership.id)}}>
                    <span className="material-symbols-outlined">edit</span>
                </div>
            </div>

            <div className='card-data-content'>
                <div className='card-data-item'>
                    <label>Nombre:</label>
                    <div>{ownership.name}</div>
                </div>

                {Object.entries(ownership.heirPercObj).map(([heirId, values]) => (
                    <div key={heirId} className='card-data-item'>
                        <div>{heirsList.find(heir => heir.id === heirId).name}</div>
                        <div>{values.pp}</div>
                        <div>{values.np}</div>
                        <div>{values.uv}</div>
                    </div>
                ))}

            </div>
        </div>
    )


};
export default OwnershipData;