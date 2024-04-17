import React, { useEffect, useState } from 'react';
import Axios from 'axios';


const Pendente = () => {
    const [cookieInfo, setCookieInfo] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [qtd, setQtd] = useState('');
    const [datah, setData] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/getPedidoStatus')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'ok') {
                    const title = data.cookieTitle;
                    const price = data.cookiePrice;
                    const qtd = data.cookieQuantity;
                    const datah = data.cookieData;

                    if (title && price && qtd) {
                        setTitle(title);
                        setPrice(price);
                        setQtd(qtd);
                        setData(datah);
                        setCookieInfo({ title, price, qtd, datah });
                    } else {
                        console.error("Alguma variável não está definida.");
                    }
                } else {
                    alert("Falha ao obter dados");
                    console.log(error);
                }
            })
            .catch(error => console.error('Erro na requisição:', error));
    }, []);

    const estiloPagina = {
        textAlign: 'center',
        marginTop: '50px',
        background: 'linear-gradient(45deg, #ffa500, #936510)',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
    };

    const estiloCookieInfo = {
        padding: '20px',
        border: '1px solid #ffffff',
        borderRadius: '4px',
        background: 'rgba(255, 255, 255, 0.1)', // Cor de fundo com opacidade
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Sombra sutil
    };

    const estiloBotao = {
        backgroundColor: '#ffffff',
        color: '#ffa500',
        padding: '10px 20px',
        fontSize: '20px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '20px',
    };

    const voltarPagina = () => {
        const userId = localStorage.getItem('userId');
        const status = "Pendente";
        console.log(userId);
      
        Axios.post("http://localhost:3001/setPedidoStatus", {
          nome: title,
          preco: price,
          qtd: qtd,
          datah: datah,
          userid: userId,
          status: status
        })
          .then((response) => {
            if (response.data.status === 'ok') {
              window.location.href = '/home';
            } else {
              alert("Falha ao registrar no banco");
              console.log(response.data); // Exibir a resposta do servidor para depuração
            }
          })
          .catch((error) => {
            alert('Erro ao obter dados do servidor: ' + error.message);
          });
      };

    return (
        <>
            <div style={estiloPagina}>
                <h1>Pedido Pendente</h1>
                {cookieInfo && (
                    <div style={estiloCookieInfo}>
                        <h4>{cookieInfo.title}</h4>
                        <h5>Preço: R$ {cookieInfo.price},00</h5>
                        <h5>Total: {cookieInfo.qtd} unidade</h5>
                        <h5>Data: {cookieInfo.datah}</h5>
                    </div>
                )}
                <br />
                <h3>Seu pedido esta Pendente. Entre em contato conosco para obter mais informações.</h3>
                <button style={estiloBotao} onClick={voltarPagina}>Voltar</button>
            </div>
        </>
    );
}

export default Pendente;