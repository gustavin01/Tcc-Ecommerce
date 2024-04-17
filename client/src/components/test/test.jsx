import React, { useState } from 'react';

function TestForm() {
  const [isFormSubmitted, setFormSubmitted] = useState(false);
  const [idProduto, setIdProduto] = useState('');
  const [tipo, setTipo] = useState('');
  const [qtde, setQtde] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Coletar dados do formulário
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    
    const formData = {
      data_movto: formattedDate,
      id_produto: idProduto,
      tipo: tipo,
      qtde: qtde,
    };
    
    // Configuração para envio via fetch
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };

    try {
      console.log(formData);
      // Enviar dados para o servidor e aguardar a resposta
      const response = await fetch('https://apex.oracle.com/pls/apex/ecommerceeeee/produts/moviment', requestOptions);

      // Verificar se a requisição foi bem-sucedida
      if (response.ok) {
        // Marque o formulário como enviado
        setFormSubmitted(true);

        // Aguarde 1 segundo e redirecione para a mesma página
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        // Capturar detalhes do erro
        const errorMessage = await response.text();
        console.error('Erro no envio do formulário:', response.status, errorMessage);
      }
    } catch (error) {
      // Capturar detalhes do erro
      console.error('Erro no envio do formulário:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} action="https://apex.oracle.com/pls/apex/ecommerceeeee/produts/moviment" method="post">
      {/* Se o formulário foi enviado, exiba uma mensagem */}
      {isFormSubmitted && <p>O formulário foi enviado. Você será redirecionado em 1 segundo.</p>}

      {/* ... campos existentes ... */}

      {/* Novos campos adicionados */}
      <div>
        <label htmlFor="ID_PRODUTO">ID_PRODUTO:</label>
        <input 
          type="number" 
          id="ID_PRODUTO" 
          name="ID_PRODUTO" 
          value={idProduto}
          onChange={(e) => setIdProduto(e.target.value)}
          required 
        />
      </div>

      <div>
        <label htmlFor="TIPO">TIPO:</label>
        <input 
          type="text" 
          id="TIPO" 
          name="TIPO" 
          maxLength="1" 
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          required 
        />
      </div>

      <div>
        <label htmlFor="QTDE">QTDE:</label>
        <input 
          type="number" 
          id="QTDE" 
          name="QTDE" 
          value={qtde}
          onChange={(e) => setQtde(e.target.value)}
          required 
        />
      </div>

      {/* Botão de envio do formulário */}
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default TestForm;
