import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AboutPage({keycloak}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (keycloak.token) {
      axios.get('http://localhost:3001/api/data', {
        headers: {
          authorization: 'Bearer ' + keycloak.token,
        },
      })
      .then(response => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
      });
    }
  }, [keycloak]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>Error fetching user data.</div>;
  }

  return (
    <div>
      <h1>About Page</h1>
      <p>Username: {keycloak.tokenParsed.preferred_username}</p>
      <p>User data: {userData.data}</p>
    </div>
  );
}

export default AboutPage;