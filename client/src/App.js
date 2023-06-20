import React, { useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';

const keycloakConfig = {
  url: 'http://localhost:8080',
  realm: 'project-realm',
  clientId: 'frontendClient',
}

const keycloak = new Keycloak(keycloakConfig);


const App = () => {
  const [keycloakAuthenticated, setKeycloakAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    keycloak
      .init({ onLoad: keycloakConfig.onLoad, pkceMethod: "S256" })
      .then((authenticated) => {
        setKeycloakAuthenticated(authenticated);
        if (authenticated) {
          window.localStorage.setItem('react-token', keycloak.token);
          window.localStorage.setItem('react-refresh-token', keycloak.refreshToken);
          keycloak.loadUserProfile().then(profile => setUserProfile(profile));
        } else {
          console.log("Authentication failed");
        }
      })
      .catch((error) => {
        console.error("Error initializing Keycloak:", error);
      });
  
    return () => {
      keycloak.onAuthLogout = () => console.log("onAuthLogout");
      keycloak.onAuthRefreshError = () => console.log("onAuthRefreshError");
    };
  }, []);

  const securedAxiosInstance = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {
        'Authorization': 'Bearer ' + keycloak.token || undefined,
    }
  });

  return (
    <>
      <Router>
        <NavBar keycloak={keycloak} userProfile={userProfile} />
        <Routes>
          <Route path="/" element={<HomePage keycloak={keycloak}/>}/>
          <Route path="/adminPage" element={<ProtectedRoute keycloak={keycloak} role="adminRole"><AdminPage keycloak={keycloak} roles={["admion"]}/></ProtectedRoute>}/>
          <Route path="/about" element={<AboutPage keycloak={keycloak}/>}/>
        </Routes>


      </Router>
    </>

  );
}

export default App;
