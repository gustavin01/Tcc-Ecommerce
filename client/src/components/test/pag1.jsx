import React, { useState } from 'react';

const Pagina1 = () => {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/salvar-dados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Dados salvos com sucesso!');
        
        // Recarrega a página após o sucesso
        window.location.reload();
      } else {
        console.error('Erro ao salvar os dados');
      }
    } catch (error) {
      console.error('Erro ao enviar a solicitação:', error);
    }
  };

  return (
    <div>
      <h2>Página 1</h2>
      <form onSubmit={handleSubmit}>
        <p>Nome:</p>
        <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        <br />
        <p>Idade:</p>
        <input type="text" name="idade" value={formData.idade} onChange={handleChange} />
        <br />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default Pagina1;
