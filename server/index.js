const express = require('express');
const session = require('express-session');
const Keycloak = require('keycloak-connect');
const cors = require('cors');
const fs = require('fs');  // For file reading
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore()
};

app.use(session(sessionConfig));

const keycloakConfig = {
  clientId: 'backendClient',
  bearerOnly: true,
  serverUrl: 'http://localhost:8080',
  realm: 'project-realm',
  credentials: {
    secret: process.env.CLIENT_SECRET
  }
};

const keycloak = new Keycloak({}, keycloakConfig);

app.use(keycloak.middleware());

let userData = JSON.parse(fs.readFileSync('./mockData.json', 'utf8'));

app.get('/api/data', keycloak.protect(), (req, res) => {
  console.log(req)
  const username = req.kauth.grant.access_token.content.preferred_username;
  const user = userData.find(user => user.username === username);
  
  if (user) {
    res.json({ data: user.data });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});