import logo from "../../images/logo.png"
import "./login.css"
import { FaArrowRight } from 'react-icons/fa';
import Navbar from "../elementos/navbar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import React from 'react';



export default function CadUsuario() {

  const handleClickRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      username: values.username,
      email: values.email,
      password: values.password,

      rua: values.rua,
      numero: values.numero,
      bairro: values.bairro,
      complemento: values.complemento,
      cidade: values.cidade,
      uf: values.uf,

      nome: values.nome,
      cpf: values.cpf,
      idade: values.idade,
      telefone: values.telefone,
    }).then((response) => {
      alert(response.data.msg);
      window.location.href = '/login';
    });
  };

  const validationRegister = yup.object().shape({
    username: yup
      .string()
      .min(5, "minimo 5 caracteres")
      .required("este campo é obrigatorio"),

    email: yup
      .string()
      .email("não é um email")
      .required("este campo é obrigatorio"),

    password: yup
      .string()
      .min(3, "minimo 3 caracteres")
      .required("este campo é obrigatorio"),

    rePassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais")
      .required("este campo é obrigatorio"),

    rua: yup
      .string()
      .min(5, "minimo 5 caracteres")
      .required("este campo é obrigatorio"),

    numero: yup
      .string()
      .min(1, "minimo 1 caracteres")
      .required("este campo é obrigatorio"),

    bairro: yup
      .string()
      .min(5, "minimo 5 caracteres")
      .required("este campo é obrigatorio"),

    complemento: yup
      .string()
      .min(4, "minimo 4 caracteres")
      .required("este campo é obrigatorio"),

    cidade: yup
      .string()
      .min(5, "minimo 5 caracteres")
      .required("este campo é obrigatorio"),

    uf: yup
      .string()
      .min(2, "minimo 2 caracteres")
      .required("este campo é obrigatorio"),

    nome: yup
      .string()
      .min(5, "minimo 5 caracteres")
      .required("este campo é obrigatorio"),

    cpf: yup
      .string()
      .min(5, "minimo 5 caracteres")
      .required("este campo é obrigatorio"),

    idade: yup
      .string()
      .min(2, "minimo 2 caracteres")
      .required("este campo é obrigatorio"),

    telefone: yup
      .string()
      .min(5, "minimo 5 caracteres")
      .required("este campo é obrigatorio"),
  })

  return (
    <>
      <Navbar />
      <main>
        <div className="login-container">
          <section className="login">
            <div className="wrapper">
              <img src={logo} className="login__logo" />
              <h1 className="login__title">Fazer cadastro</h1>

              <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
                <Form>
                  <div className='login__label'>
                    <p></p>
                    <Field name="username" className="form-field" placeholder="Usuario" />

                    <ErrorMessage component="span" name="username" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="email" className="form-field" placeholder="Email" />

                    <ErrorMessage component="span" name="email" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="password" name="password" className="form-field" placeholder="Senha" />

                    <ErrorMessage component="span" name="password" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="password" name="rePassword" className="form-field" placeholder="Confirme sua senha" />

                    <ErrorMessage component="span" name="rePassword" className="form-error" />
                  </div>

                  {/* Endereço */}

                  <div className='login__label'>
                    <p>Endereço</p>
                    <Field type="text" name="rua" className="form-field" placeholder="Rua / Avenida" />

                    <ErrorMessage component="span" name="rua" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="numero" className="form-field" placeholder="Numero" />

                    <ErrorMessage component="span" name="numero" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="bairro" className="form-field" placeholder="Bairro" />

                    <ErrorMessage component="span" name="bairro" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="complemento" className="form-field" placeholder="Complemento" />

                    <ErrorMessage component="span" name="complemento" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="cidade" className="form-field" placeholder="Cidade" />

                    <ErrorMessage component="span" name="cidade" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="uf" className="form-field" placeholder="UF" />

                    <ErrorMessage component="span" name="uf" className="form-error" />
                  </div>

                  {/* Contato */}

                  <div className='login__label'>
                    <p>Contato</p>
                    <Field type="text" name="nome" className="form-field" placeholder="Nome Completo" />

                    <ErrorMessage component="span" name="nome" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="cpf" className="form-field" placeholder="CPF" />

                    <ErrorMessage component="span" name="cpf" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="idade" className="form-field" placeholder="Idade" />

                    <ErrorMessage component="span" name="idade" className="form-error" />
                  </div>

                  <div className='login__label'>
                    <Field type="text" name="telefone" className="form-field" placeholder="Telefone" />

                    <ErrorMessage component="span" name="telefone" className="form-error" />
                  </div>

                  <button className="login__button" type="submit"><FaArrowRight /></button>
                </Form>
              </Formik>

              <a href={"login"} className="login__link">Já tem uma conta? Fazer login</a>
            </div>
          </section>

          <img className="wallpaper" style={{ backgroundImage: 'url(./wall.jpg)' }} />
        </div>
      </main>
    </>
  );
}