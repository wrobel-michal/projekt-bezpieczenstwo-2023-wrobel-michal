import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ keycloak, role, ...children}) => {
    const isLoggedIn = keycloak.authenticated

    const hasRealmRole = keycloak.hasRealmRole(role);

    if (isLoggedIn && hasRealmRole){
        return children.children
    }else{
        return null
    }
    };

export default ProtectedRoute;
