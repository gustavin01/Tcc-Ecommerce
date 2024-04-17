import React, { useEffect, useState } from 'react';

const Pagina2 = () => {
  const [dados, setDados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3001/obter-dados');
        const data = await response.json();
        setDados(data);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (index) => {
    try {
      // Substitua a URL com o caminho correto para a sua API
      await fetch(`http://localhost:3001/deletar-dado/${index}`, {
        method: 'DELETE',
      });

      // Atualiza a lista após a exclusão
      const updatedData = dados.filter((item, i) => i !== index);
      setDados(updatedData);
    } catch (error) {
      console.error('Erro ao deletar dado:', error);
    }
  };

  return (
    <div>
      <h2>Página 2</h2>
      <ul>
        {dados.map((item, index) => (
          <li key={index}>
            {item.nome} - {item.idade}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagina2;
