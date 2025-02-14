import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../services/AuthContext';  // Assuming you have a context to manage user state
import userPool from '../../services/cognitoConfig'; // Your Cognito configuration
import { apiDeleteRefreshToken } from '../../services/api';

const SignOut = () => {

    const navigate = useNavigate();
    const {
        setInheritancesList,
        setInheritancesAccessList
    } = useContext(AuthContext);

    const handleLogout = async () => {
        const cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            await logOutAndDeleteCredentials(cognitoUser);
        } else {
            console.error('No user is currently signed in.');
        }

        // Redirect to login or home page after logout
        navigate('/');
    };

    const logOutAndDeleteCredentials = async (cognitoUser) => {
        try {

            // Call Cognito's signOut method
            cognitoUser.signOut();

            // Clear refresh token from http cookie
            const accessToken = sessionStorage.getItem('accessToken')
            await apiDeleteRefreshToken(accessToken);

            // Clear session storage
            sessionStorage.clear();

            //Clear auth context
            setInheritancesList(null);
            setInheritancesAccessList(null);

        } catch (err) {
            console.log(err.response.status);
        }
    }

    return (
        <div onClick={handleLogout} className='header-icon-container hover-container'>
            <span className="material-symbols-outlined" translate="no" aria-hidden="true">
                logout
            </span>
            <div className='hover-text'>
                {"Cerrar Sesión"}
            </div>
        </div>
    )
}
export default SignOut;