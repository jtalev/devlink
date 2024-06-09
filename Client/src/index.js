import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { UserProvider } from './Utils/UserContext';
import App from './App';

ReactDOM.render(
  <UserProvider>
    <Router>
      <App />
    </Router>
  </ UserProvider>,
  document.getElementById('root')
);