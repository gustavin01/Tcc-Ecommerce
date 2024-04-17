import React, { useState } from 'react';
import axios from 'axios';


function PgCadProdAdm() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productData, setProductData] = useState({
    nome: '',
    valor: '',
    qtd: '',
    descricao: '',
    ativo: true,
    nome_cor: '',
    nome_tamanho: '',
    imagem: '',
    nome_marca: '',
  });

  const [submitStatus, setSubmitStatus] = useState(null);

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
    formData.append('qtd', productData.qtd);
    formData.append('descricao', productData.descricao);
    formData.append('nome_cor', productData.nome_cor);
    formData.append('nome_tamanho', productData.nome_tamanho);
    formData.append('nome_marca', productData.nome_marca);
    formData.append('image', file);

    // Use o Axios para realizar a solicitação POST

    try {
      const response = await axios.post('http://localhost:3001/uploadTeste', formData, {
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

  return (
    <div>

      <div className="product-form-container">
        <h2>Cadastar Produto</h2>
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
            Quantidade:
            <input type="text" name="qtd" value={productData.qtd} onChange={handleChange} />
          </div>

          <div>
            Descrição:
            <textarea name="descricao" value={productData.descricao} onChange={handleChange} />
          </div>

          <div>
            Cor:
            <input type="text" name="nome_cor" value={productData.nome_cor} onChange={handleChange} />
          </div>

          <div>
            Tamanho:
            <input type="text" name="nome_tamanho" value={productData.nome_tamanho} onChange={handleChange} />
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
  );
}

export default PgCadProdAdm;
