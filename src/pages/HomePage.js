import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <div className='center'>
            <div className='content'>
                <h1>
                    Historia ejemplo
                </h1>

                <div className='button-container'>
                    <div className='custom-button' onClick={() => {navigate('/new-heritance')}}>
                        Nueva herencia
                    </div>
                </div>

                <div className='button-container'>
                    <div className='custom-button' onClick={() => {navigate('/inheritances-list')}}>
                        Lista herencias
                    </div>
                </div>

            </div>
        </div>
    )


};
export default HomePage;