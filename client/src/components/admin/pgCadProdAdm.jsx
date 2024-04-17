import React, { useState, useEffect } from 'react';
import "./cadProd.css";
import axios from 'axios';
import { FaCartArrowDown } from 'react-icons/fa';
import BarAdmin from "./barAdmin";
import BarLateral from './barLateral';

function PgCadProdAdm() {
  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState({
    nome: '',
    valor: '',
    ativo: true,
    descricao: '',
    nome_marca: '',
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [loggedIn, setLoggedIn] = useState(true); // Inicializado como true por padrão

  useEffect(() => {
    // Verificar se o tokenAdm existe no localStorage
    const tokenAdm = localStorage.getItem('tokenAdm');
    if (!tokenAdm) {
      setLoggedIn(false); // Define loggedIn como false se o tokenAdm não existir
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nome', productData.nome);
    formData.append('valor', productData.valor);
    formData.append('descricao', productData.descricao);
    formData.append('nome_marca', productData.nome_marca);
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:3001/uploadProduto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Resposta do servidor:', response.data);
      setSubmitStatus('success');
      setTimeout(() => window.location.reload(), 2000); // Recarrega a página após 2 segundos em caso de sucesso
    } catch (error) {
      console.error('Erro ao enviar dados para o servidor:', error);
      setSubmitStatus('error');
      setTimeout(() => window.location.reload(), 2000); // Recarrega a página após 2 segundos em caso de erro
    }
  };

  if (!loggedIn) {
    return (
      <div className="container text-center mt-5">
        <h2>Conteúdo restrito</h2>
        <p>Este conteúdo está disponível apenas para administradores.</p>
        <button className="btn btn-primary" onClick={() => window.location.href = '/'}>Voltar para a página inicial</button>
      </div>
    );
  }

  return (
    <>
      <BarAdmin />
      <div className='d-flex home'>
        <div className='d-flex sidebar flex-column flex-shrink-0 bg-dark'>
          <ul className='nav nav-pills flex-column mb-auto px-0 mt-3'>
            <BarLateral />
          </ul>
        </div>

        <div className='content container mt-2'>
          <div className='row'>
            <div className='col-md-4 text-white col bg-info d-flex 
                    justify-content-around px-1 py-3 rounded'>
              <a href={"pgadmproduto"}><span>Total Produtos</span><FaCartArrowDown /></a>
            </div>
            <div className='col-md-4 text-white col bg-info d-flex 
                    justify-content-around px-1 py-3 rounded'>
              <a href={"pgadmmov"}><span>Total Movimentações</span><FaCartArrowDown /></a>
            </div>
            <div className='col-md-4 text-white col bg-warning d-flex 
                    justify-content-around px-1 py-3 rounded'>
              <a href={"pgcadprodadm"}><span>Add Produtos</span><FaCartArrowDown /></a>
            </div>
          </div>

          <br /><br />

          <hr />
          <div className="product-form-container">
            <h2>Cadastrar Produto</h2>
            <form>
              <div>
                Nome:
                <input type="text" name="nome" value={productData.nome} onChange={handleChange} />
              </div>

              <div>
                Valor:
                <input type="text" name="valor" value={productData.valor} onChange={handleChange} />
              </div>

              <div>
                Descrição:
                <textarea name="descricao" value={productData.descricao} onChange={handleChange} />
              </div>

              <div>
                Imagem:
                <input type="file" value={productData.imagem} onChange={handleFileChange} />
              </div>

              <div>
                Marca:
                <input type="text" name="nome_marca" value={productData.nome_marca} onChange={handleChange} />
              </div>

              <button type="button" onClick={handleUpload}>
                Enviar
              </button>
            </form>
            {submitStatus === 'success' && <p>Sucesso! Produto enviado com sucesso.</p>}
            {submitStatus === 'error' && <p>Erro ao enviar produto. Por favor, tente novamente.</p>}
          </div>
        </div>
      </div>

    </>
  );
}

export default PgCadProdAdm;
