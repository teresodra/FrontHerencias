import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../services/AuthContext";
import userPool from '../../services/cognitoConfig'; // Your Cognito configuration
// import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ element: Element, ...rest }) => {
    const { user, passwordChangeRequired } = useContext(AuthContext); // Access user and password change flag from AuthContext
    const cognitoUser = userPool.getCurrentUser();

    // If password change is required, redirect to the password change page
    if (user && passwordChangeRequired) {
        return <Navigate to="/new-password" />;
    }

    // If not authenticated, redirect to login
    if (!cognitoUser) {
        return <Navigate to="/login" />;
    }

    // Otherwise, allow access to the requested page
    return <Element {...rest}/>;
};

export default PrivateRoute;

