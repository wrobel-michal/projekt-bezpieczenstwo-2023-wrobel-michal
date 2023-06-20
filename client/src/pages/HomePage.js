import React from 'react';

function HomePage({keycloak}) {

  return (
    <div>
      <h1>Welcome</h1>
      {keycloak.authenticated && (
        <h2>You are logged in as {keycloak.tokenParsed.preferred_username}</h2>
      )}
    </div>
  );
}

export default HomePage;
