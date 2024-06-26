import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Css/RegisterLogin.css';
import config from '../config';

/* här är min register sida där användaren kan registrera sig 
  Jag använder useState för att hålla koll på användarnamn och lösenord.
  Jag använder också useNavigate för att navigera användaren till inloggningssidan efter att de har registrerat sig. */

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Skapa en instans av useNavigate

  // Funktionen handleSubmit som skickar användarnamn och lösenord till servern
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(config.URL + config.registerURI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        // Hantera icke-200 svar
        const text = await response.text(); 
        throw new Error(text || 'Något gick fel'); 
      }

      //Vid framgångsrik registrering, navigera till inloggningssidan
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  };
    return (
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="register-btn">Register</button>
        </form>
      </div>
    );
  }

export default Register;
