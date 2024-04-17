import Navbar from "../elementos/navbar";
import Footer from "../elementos/footer";
import React, { useState } from 'react';
import "./dados.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from "axios";
import ListPedidos from "../mp/listPedidos";

export default function DadosUsuario() {
  const userId = localStorage.getItem('userId');

  fetch(`http://localhost:3001/verDados?userId=${userId}`)
    .then((response) => {
      if (response.ok) {
        return response.json(); // Analisar os dados JSON da resposta
      } else {
        throw new Error('Erro ao obter dados do servidor');
      }
    })
    .then((data) => {
      // Agora você pode acessar os dados analisados em 'data'
      if (data.status === 'ok') {
        document.getElementById('userNameInput').value = data.userName;
        document.getElementById('userEmailInput').value = data.userEmail;
        document.getElementById('userIdInput').value = userId;

        document.getElementById('inputRua').value = data.userRua;
        document.getElementById('inputNumero').value = data.userNumero;
        document.getElementById('inputBairro').value = data.userBairro;
        document.getElementById('inputComplemento').value = data.userComple;
        document.getElementById('inputCidade').value = data.userCidade;
        document.getElementById('inputUF').value = data.userUf;

        document.getElementById('inputNome').value = data.userNome;
        document.getElementById('inputIdade').value = data.userIdade;
        document.getElementById('inputCPF').value = data.userCpf;
        document.getElementById('inputTelefone').value = data.userTele;
      } else {
        alert('Erro ao obter dados do servidor');
      }
    })
    .catch((error) => {
      console.error('não foi:', error);
    });

  const registerDatesBasic = () => {
    const inputUserName = document.getElementById("userNameInput");
    const inputEmail = document.getElementById("userEmailInput");
    const inputId = document.getElementById("userIdInput");

    const valorUserName = inputUserName.value;
    const valorEmail = inputEmail.value;
    const valorId = inputId.value;

    const senhaConfirmacao = prompt('Por favor, digite sua senha atual para confirmar a atualização:');

    Axios.post("http://localhost:3001/DULo", {
      username: valorUserName,
      email: valorEmail,
      id: valorId,
      senha: senhaConfirmacao,
    })
      .then((response) => {
        return response.json(); // Converte a resposta em um objeto JSON
      })
      .catch((error) => {
        alert('Erro ao obter dados do servidor: ' + error.message); // Alerta de erro
      });
  }

  const registerDatesEndereco = () => {
    const inputRua = document.getElementById("inputRua");
    const inputNumero = document.getElementById("inputNumero");
    const inputBairro = document.getElementById("inputBairro");
    const inputComplemento = document.getElementById("inputComplemento");
    const inputCidade = document.getElementById("inputCidade");
    const inputUf = document.getElementById("inputUF");
    const inputId = document.getElementById("userIdInput");

    const valorRua = inputRua.value;
    const valorNumero = inputNumero.value;
    const valorBairro = inputBairro.value;
    const valorComple = inputComplemento.value;
    const valorCidade = inputCidade.value;
    const valorUF = inputUf.value;
    const valorId = inputId.value;

    const senhaConfirmacao = prompt('Por favor, digite sua senha atual para confirmar a atualização:');

    Axios.post("http://localhost:3001/DUEn", {
      rua: valorRua,
      numero: valorNumero,
      bairro: valorBairro,
      comple: valorComple,
      cidade: valorCidade,
      uf: valorUF,
      id: valorId,
      senha: senhaConfirmacao,
    })
      .then((response) => {
        return response.json(); // Converte a resposta em um objeto JSON
      })
      .catch((error) => {
        alert('Erro ao obter dados do servidor: ' + error.message); // Alerta de erro
      });
  }

  const registerDatesContato = () => {
    const inputNome = document.getElementById("inputNome");
    const inputIdade = document.getElementById("inputIdade");
    const inputCpf = document.getElementById("inputCPF");
    const inputTelefone = document.getElementById("inputTelefone");
    const inputId = document.getElementById("userIdInput");

    const valorNome = inputNome.value;
    const valorIdade = inputIdade.value;
    const valorCpf = inputCpf.value;
    const valorTelefone = inputTelefone.value;
    const valorId = inputId.value;

    const senhaConfirmacao = prompt('Por favor, digite sua senha atual para confirmar a atualização:');

    Axios.post("http://localhost:3001/DUCo", {
      nome: valorNome,
      idade: valorIdade,
      cpf: valorCpf,
      telefone: valorTelefone,
      id: valorId,
      senha: senhaConfirmacao,
    })
      .then((response) => {
        return response.json(); // Converte a resposta em um objeto JSON
      })
      .catch((error) => {
        alert('Erro ao obter dados do servidor: ' + error.message); // Alerta de erro
      });
  }

  const registerDatesAll = () => {
    const inputUserName = document.getElementById("userNameInput");
    const inputEmail = document.getElementById("userEmailInput");
    const inputRua = document.getElementById("inputRua");
    const inputNumero = document.getElementById("inputNumero");
    const inputBairro = document.getElementById("inputBairro");
    const inputComplemento = document.getElementById("inputComplemento");
    const inputCidade = document.getElementById("inputCidade");
    const inputUf = document.getElementById("inputUF");
    const inputNome = document.getElementById("inputNome");
    const inputIdade = document.getElementById("inputIdade");
    const inputCpf = document.getElementById("inputCPF");
    const inputTelefone = document.getElementById("inputTelefone");
    const inputId = document.getElementById("userIdInput");

    const valorUserName = inputUserName.value;
    const valorEmail = inputEmail.value;
    const valorRua = inputRua.value;
    const valorNumero = inputNumero.value;
    const valorBairro = inputBairro.value;
    const valorComple = inputComplemento.value;
    const valorCidade = inputCidade.value;
    const valorUF = inputUf.value;
    const valorNome = inputNome.value;
    const valorIdade = inputIdade.value;
    const valorCpf = inputCpf.value;
    const valorTelefone = inputTelefone.value;
    const valorId = inputId.value;

    const senhaConfirmacao = prompt('ok:');

    Axios.post("http://localhost:3001/DUAll", {
      username: valorUserName,
      email: valorEmail,
      rua: valorRua,
      numero: valorNumero,
      bairro: valorBairro,
      comple: valorComple,
      cidade: valorCidade,
      uf: valorUF,
      nome: valorNome,
      idade: valorIdade,
      cpf: valorCpf,
      telefone: valorTelefone,
      id: valorId,
      senha: senhaConfirmacao,

    })
      .then((response) => {
        alert("foi");
      })
      .catch((error) => {
        alert('Erro ao obter dados do servidor: ' + error.message); // Alerta de erro
      });
  }

  const newPassword = () => {
    const inputSenha = document.getElementById("userSenha");
    const inputNewSenha = document.getElementById("userNovaSenha");
    const inputNewSenha2 = document.getElementById("userNovaSenha2");
    const inputId = document.getElementById("userIdInput");

    const valorSenha = inputSenha.value;
    const valorNewSenha = inputNewSenha.value;
    const valorNewSenha2 = inputNewSenha2.value;
    const valorId = inputId.value;

    Axios.post("http://localhost:3001/AlterSenha", {

      senha: valorSenha,
      newSenha: valorNewSenha,
      newSenha2: valorNewSenha2,
      id: valorId,
    })
      .then((response) => {
        alert("foi");
      })
      .catch((error) => {
        alert('Erro ao obter dados do servidor: ' + error.message); // Alerta de erro
      });
  }

  return (
    <>
      <Navbar />
      <div>
        <br /><h1 className="h1DU">Seus dados</h1><br />
        <form className="contDU" onSubmit={registerDatesBasic}>
          <div className="form-row">
            <h2 className="h1DU">Dados Login</h2><br />
            <div className="form-group col-md-11">
              <p>Usuario</p>
              <label htmlFor="inputUsuario">Usuario</label>
              <input type="text" className="form-control" id="userNameInput" placeholder="Nome usuario" />
            </div>
            <div className="form-group col-md-1">
              <p>Id</p>
              <label htmlFor="inputId4">Id</label>
              <input type="text" className="form-control" id="userIdInput" placeholder="Id" readOnly="readOnly" />
            </div>
          </div>
          <div className="form-group">
            <p>Email</p>
            <label htmlFor="inputEmail">Email</label>
            <input type="text" className="form-control" id="userEmailInput" placeholder="Email" name="email" />
          </div>
          <br /><button type="submit" className="btn btn-primary">Atualizar Dados</button><br />
        </form>
        <br /><br /><br />

        <form className="contDU" onSubmit={newPassword} >
          <br /><h2 className="h1DU">Alterar Senha</h2><br />
          <div className="form-group">
            <p>Senha Atual</p>
            <input type="password" className="form-control" id="userSenha" placeholder="Senha Atual" />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <p>Nova Senha</p>
              <input type="password" className="form-control" id="userNovaSenha" placeholder="Nova Senha" />
            </div>
            <div className="form-group col-md-6">
              <p>Comfirme Nova Senha</p>
              <input type="password" className="form-control" id="userNovaSenha2" placeholder="Nova Senha" />
            </div>
          </div>
          <br /><button type="submit" className="btn btn-primary">Atualizar Senha</button><br />
        </form>
        <br /><br /><br />


        <form className="contDU" onSubmit={registerDatesEndereco}>
          <br /><h2 className="h1DU">Endereço</h2><br />
          <div className="form-row">
            <div className="form-group col-md-9">
              <p>Rua</p>
              <label htmlFor="inputRua">Rua</label>
              <input type="text" className="form-control" id="inputRua" placeholder="Rua / Avenida" />
            </div>
            <div className="form-group col-md-3">
              <p>Numero</p>
              <label htmlFor="inputNumero">Numero</label>
              <input type="text" className="form-control" id="inputNumero" placeholder="Numero" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <p>Bairro</p>
              <label htmlFor="inputBairro">Bairro</label>
              <input type="text" className="form-control" id="inputBairro" placeholder="Bairro" />
            </div>
            <div className="form-group col-md-6">
              <p>Complemento</p>
              <label htmlFor="inputComplemento">Complemento</label>
              <input type="text" className="form-control" id="inputComplemento" placeholder="Complemento" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <p>Cidade</p>
              <label htmlFor="inputCidade">Cidade</label>
              <input type="text" className="form-control" id="inputCidade" placeholder="Cidade" />
            </div>
            <div className="form-group col-md-2">
              <p>UF</p>
              <label htmlFor="inputUF">UF</label>
              <input type="text" className="form-control" id="inputUF" placeholder="Uf" />
            </div>
          </div>
          <br /><button type="submit" className="btn btn-primary">Atualizar Dados</button><br />
        </form>
        <br /><br /><br />

        <form className="contDU" onSubmit={registerDatesContato}>
          <br /><h2 className="h1DU">Contato</h2><br />
          <div className="form-group">
            <p>Nome Completo</p>
            <label htmlFor="inputNome">nome</label>
            <input type="text" className="form-control" id="inputNome" placeholder="Nome" />
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <p>Idade</p>
              <label htmlFor="inputIdade">Idade</label>
              <input type="text" className="form-control" id="inputIdade" placeholder="Idade" />
            </div>
            <div className="form-group col-md-4">
              <p>CPF</p>
              <label htmlFor="inputCPF">CPF</label>
              <input type="text" className="form-control" id="inputCPF" placeholder="CPF" />
            </div>
            <div className="form-group col-md-4">
              <p>Telefone</p>
              <label htmlFor="inputTelefone">Telefone</label>
              <input type="text" className="form-control" id="inputTelefone" placeholder="Telefone" />
            </div>
          </div>
          <br /><button type="submit" className="btn btn-primary">Atualizar Dados</button><br />
        </form>
        <br /><br /><br />

        <form className="contDU" onSubmit={registerDatesAll}>
          <button type="submit" className="btn btn-primary">Atualizar Tudo</button>
        </form>
        <br /><br /><br />
      </div>
      <Footer />
    </>
  );
}
