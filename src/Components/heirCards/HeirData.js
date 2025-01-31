import React, { useEffect, useState } from 'react';
import NewHeirModal from './NewHeirModal';

const HeirData = ({heir, removeHeir, editHeir}) => {
    
    const [heirType, setHeirType] = useState(null);
    const typeOptions = [
        {label: "Tipo I", value: 1},
        {label: "Tipo II", value: 2},
        {label: "Tipo III", value: 3},
        {label: "Tipo IV", value: 4},
    ]

    useEffect(() => {
        let usType = typeOptions.find(op => op.value === heir.type).label;
        setHeirType(usType.split(' ')[1]);
    }, [])

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
                    <label>Nombre:</label>
                    <div>{heir.name}</div>
                </div>

                <div className='card-data-item'>
                    <label>Edad:</label>
                    <div>{heir.age}</div>
                </div>

                <div className='card-data-item'>
                    <label>Tipo:</label>
                    <div>{heirType}</div>
                </div>




            </div>

        </div>
    )


};
export default HeirData;