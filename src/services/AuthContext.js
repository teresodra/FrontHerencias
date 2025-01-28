import React, { createContext, useState } from 'react';

// Create the AuthContext
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user or cognitoUser
    const [userAttributes, setUserAttributes] = useState(null);

    const [inheritancesList, setInheritancesList] = useState(null);
    const [inheritancesAccessList, setInheritancesAccessList] = useState(null);
    
    return (
        <AuthContext.Provider value={
            {
                user, setUser,
                userAttributes, setUserAttributes,
                inheritancesList, setInheritancesList,
                inheritancesAccessList, setInheritancesAccessList
            }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
