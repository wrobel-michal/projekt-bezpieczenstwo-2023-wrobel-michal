import React from 'react';

function AdminPage({keycloak}) {
  if (!keycloak.hasRealmRole('adminRole') || !keycloak.authenticated) {
    return <div>You are not authorized to view this page.</div>
  }else{
    return (
      <div>
        <h1>Admin Page</h1>
        <p>Welcome, admin user!</p>
      </div>
    );
  }


}

export default AdminPage;
