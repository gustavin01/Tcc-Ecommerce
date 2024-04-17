import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaUserAlt, FaLock } from "react-icons/fa";
import "./navbar.css";
import logo from "../../images/logo.png";
import CartButton from "../carrinho/CartButton";
import Provider from "../api/Provider";

export default function NavbarTeste() {

  const isItemEmpty = localStorage.getItem('token') === null;

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    window.location.href = '/login';
  };

  return (
    <section>
      <div className="nav-top-bar2">
        <span>INVERNO DE GUYA confira nossa seleção</span>
      </div>
      <nav className="navigation">
        <a href={"home"} className="logo">
          <img src={logo} />
        </a>
        <ul className="menu">
          <li>
            <a href={"home"}>Inicio</a>
          </li>
          <li>
            <a href={"pglancamento"}>Catalogo</a>
          </li>
          <li>
            <a href={"sobre"}>Sobre</a>
          </li>
        </ul>
        <div className="nav-btns">
          <div className="nav-user">
            <FaUserAlt className="nav-user-dropdown" />
            <div className="nav-user-dropdown-content">
              {isItemEmpty ? (
                // Se o item estiver vazio (condição verdadeira)
                <a href={"login"}>Entrar</a>
              ) : (
                // Se o item tiver um valor (condição falsa)
                <div>
                  <a href={"dadosusuario"}>Meus Dados</a>
                  <a href={"listpedidos"}>Pedidos</a>
                  <a href="#" onClick={handleLogout}>Sair</a>
                </div>
              )}
            </div>
          </div>

          <div className="container">
            <CartButton />
          </div>
        </div>
      </nav>
    </section>
  );
}

