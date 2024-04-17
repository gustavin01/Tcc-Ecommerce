import React, { useState } from "react";

export default function BarAdmin() {
  const handleLogout = () => {
    localStorage.removeItem('tokenAdm'); // Remove o tokenAdm do localStorage
    window.location.href = '/'; // Redireciona o usuário para a página inicial
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
        <div className="collapse navbar-collapse justify-content-md-center" id='navbarm'>
          <h1>Admin Guya Ecommerce</h1>
        </div>
        <button className="btn btn-outline-light" onClick={handleLogout}>Sair</button>
      </nav>
    </>
  );
}

