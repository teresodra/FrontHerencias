import React from 'react';
import {useNavigate } from 'react-router-dom';
import SignOut from './auth/SignOut';
import userPool from '../services/cognitoConfig'; // Your Cognito configuration

const Header = () => {

    const cognitoUser = userPool.getCurrentUser();
    const navigate = useNavigate();
    
    const goHome = () => {
        navigate('/home');      
    }

    return(
        <div className="header">
            {cognitoUser && ( 
                <>
                <div className='header-icon-container'>
                    <span
                        className="material-symbols-outlined"
                        translate="no" aria-hidden="true" // prevent problems with translators
                        onClick={goHome}
                    >
                        home
                    </span>
                </div>

                <div className='header-title-container'>
                    <h2 translate="no">{"herenciaideal"}</h2>
                </div>
                <div className='header-icon-container'>
                    <SignOut/>
                </div>
                
                </>
            )}
        </div>
    )
};

export default Header;