import  { useState } from 'react';
import { useAuth } from '../Components/AuthContext';
import './Css/RegisterLogin.css';
import { useNavigate } from 'react-router-dom';
import config from '../config';

/* Här är min inloggningssida där användaren kan logga in.
Jag använder useState för att hålla koll på användarnamn och lösenord.
Jag använder också useNavigate för att navigera användaren till hemsidan efter att de har loggat in. */

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Hämta login-funktionen från context

  const handleSubmit = async (e) => {
    if (username.length > 0 && password.length > 0) {
    e.preventDefault();
      const response = await fetch(config.URL + config.loginURI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      
      if (!response.ok) {
        // Uppdatera felmeddelandet om inloggningen misslyckas
        setErrorMessage('Wrong email or password');
        return; // Avbryt funktionen om inloggningen misslyckas
      }

      console.log('Inloggningen lyckades');
      login(); // Uppdatera inloggningstillståndet
      navigate('/'); // Efter framgångsrik inloggning, navigera till hemsidan
    }
  };
  

  return (
    <div className="login-container">
      <h2 className="login-title">Login here</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="login-username">Username:</label>
          <input
            id="login-username"
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="login-password">Password:</label>
          <input
            id="login-password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;
