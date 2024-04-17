import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { FaLockOpen } from 'react-icons/fa';
import Navbar from '../elementos/navbar';
import './admLoginStyle.css';

export default function App() {
  const [admin, setAdmin] = useState('');
  const [senha, setSenha] = useState('');
  const [loggedInAdm, setLoggedInAdm] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/loginadm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ admin, senha }),
      });

      if (response.ok) {
        const token = generateToken();
        localStorage.setItem('tokenAdm', token);
        setLoggedInAdm(true);
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  const generateToken = () => {
    const randomString = Math.random().toString(36).substring(2);
    const timestamp = Date.now();
    return randomString + timestamp;
  };

  if (loggedInAdm) {
    const token = localStorage.getItem('tokenAdm');
    if (token) {
      window.location.href = '/homeadm';
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <div className="login-block">
        <h1>Login Admin</h1>
        <input
          type="text"
          value={admin}
          placeholder="Admin"
          onChange={(e) => setAdmin(e.target.value)}
          className="user"
        />
        <input
          type="password"
          value={senha}
          placeholder="Senha"
          onChange={(e) => setSenha(e.target.value)}
          className="pass"
        />
        <button className="submit buttonLogin" onClick={handleLogin}>
          <FaLockOpen /> Entrar
        </button>
      </div>
  
      <Helmet>
        <style>
          {`
            body {
              background-color: #f2f2f2;
              color: black;
              font-family: Montserrat;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </Helmet>
    </div>
  );  
}
