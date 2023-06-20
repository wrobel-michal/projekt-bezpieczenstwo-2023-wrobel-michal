import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ keycloak, userProfile }) => {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/about">About Me</Link>
            {keycloak.hasRealmRole('adminRole') && <Link to="/adminPage">Admin</Link>}
            {userProfile && <div>Logged in as: {userProfile.username}</div>}
            <button onClick={() => keycloak.authenticated ? keycloak.logout() : keycloak.login()}>
                {keycloak.authenticated ? 'Logout' : 'Login'}
            </button>
        </nav>
    );
};

export default NavBar;
