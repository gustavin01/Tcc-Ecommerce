import React, { useState } from 'react';

const ProductForm = () => {
  const [productData, setProductData] = useState({
    nome: '',
    valor: '',
    qtd: '',
    descricao: '',
    ativo: true,
    nome_cor: '',
    nome_tamanho: '',
    imagem: null,
    nome_marca: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData((prevData) => ({
      ...prevData,
      imagem: file,
    }));
  };

  const handleBrowseClick = () => {
    // Simula o clique no input de arquivo quando o botão é clicado
    document.getElementById('fileInput').click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Coloque aqui a lógica para enviar os dados para a API ou realizar as ações necessárias
    // Certifique-se de incluir a lógica para enviar a imagem, se necessário

    console.log('Dados do produto:', productData);
  };

  return (
    <div>
      <h2>Enviar Produto</h2>
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
          Ativo:
          <input
            type="checkbox"
            name="ativo"
            checked={productData.ativo}
            onChange={() => setProductData((prevData) => ({ ...prevData, ativo: !prevData.ativo }))}
          />
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
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            name="imagem"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <button type="button" onClick={handleBrowseClick}>
            Escolher Imagem
          </button>
          {productData.imagem && <p>Arquivo selecionado: {productData.imagem.name}</p>}
        </div>

        <div>
          Marca:
          <input type="text" name="nome_marca" value={productData.nome_marca} onChange={handleChange} />
        </div>

        <button type="button" onClick={handleSubmit}>
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
