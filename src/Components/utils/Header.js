import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import SignOut from '../auth/SignOut';
import userPool from '../../services/cognitoConfig'; // Your Cognito configuration

const Header = () => {

    const cognitoUser = userPool.getCurrentUser();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');


    console.log(cognitoUser)
    const navigate = useNavigate();
    
    useEffect(() => {
        if (cognitoUser) {
            cognitoUser.getSession((err, session) => {
                if (err) {
                    console.error("Error getting session:", err);
                    return;
                }        
                // Fetch user attributes
                cognitoUser.getUserAttributes((err, attributes) => {
                    if (err) {
                        console.error("Error getting attributes:", err);
                        return;
                    }
        
                    // Parse attributes
                    const userAttributes = {};
                    attributes.forEach(attribute => {
                        userAttributes[attribute.getName()] = attribute.getValue();
                    });
                    
                    setName(userAttributes.name);
                    setLastName(userAttributes.family_name);
                    console.log("User Attributes:", userAttributes);
                    console.log("Email:", userAttributes.email);
                    console.log("Name:", userAttributes.name);
                });
            });
        } else {
            console.log("No user is currently signed in.");
        }
        
    }, [cognitoUser])
    const goHome = () => {
        navigate('/home');      
    }

    return(
        <div className="header">
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

            {cognitoUser && ( 

                <div className='header-icon-container'>
                    <div>
                        {lastName}, {name}
                    </div>
                    <SignOut/>
                </div>
            )}
        </div>
    )
};

export default Header;