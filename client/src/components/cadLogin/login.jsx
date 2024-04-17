import logo from "../../images/logo.png";
import "./login.css";
import { FaArrowRight } from 'react-icons/fa';
import Navbar from "../elementos/navbar";

export default function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
      email: data.get('email'),
      senha: data.get('senha'),
    }
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'ok') {
          localStorage.setItem('token', data.token)
          localStorage.setItem('userId', data.userId)
          window.location.href = '/home';
        } else {
          alert('Login failed');
        }
      })
      .catch((error) => {
        console.error('Error', error);
      })
  };

  return (
    <><Navbar/>
      <main>
        <div className="login-container">
          <section className="login">
            <div className="wrapper">
              <img src={logo} className="login__logo" />
              <h1 className="login__title">Fazer login</h1>

              <form onSubmit={handleSubmit}>
                <div className='login__label'>
                  <input type="text" name="email" placeholder="Email" />
                </div>

                <div className='login__label'>
                  <input type="password" name="senha" placeholder="Senha" />
                </div>

                <div className="login__label--checkbox">
                  <input type="checkbox" className="input--checkbox" />
                  Manter Login
                </div>

                <button className="login__button" type="submit"><FaArrowRight /></button>
              </form>

              <a href={"cadusuario"} className="login__link">Não tem conta? criar conta</a>
            </div>
          </section>

          <img className="wallpaper" style={{ backgroundImage: 'url(./wall.jpg)' }} />
        </div>
      </main>
    </>
  );
}
