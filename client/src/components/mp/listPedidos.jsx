import React, { useState, useEffect } from 'react';
import Navbar from '../elementos/navbar';
import { Button, Modal } from 'react-bootstrap';
import './ListPedidos.css';

function ListPedidosPage() {
  const [pedidos, setPedidos] = useState([]);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [detalhesDoPedidoAtual, setDetalhesDoPedidoAtual] = useState([]);
  const [pedidoData, setPedidoData] = useState(null); // Estado para armazenar os dados do pedido
  const [selectedPedidoId, setSelectedPedidoId] = useState(null); // Estado para armazenar o id do pedido selecionado

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetch(`http://localhost:3001/ListPedidoStatus?userId=${userId}`)
      .then(response => response.json())
      .then(apiData => {
        console.log(apiData);
        setData(apiData);
        if (apiData.status === 'ok') {
          setPedidos(apiData.pedidos);
        } else {
          console.log("Nenhum pedido foi carregado");
        }
      })
      .catch(error => console.error('Erro na requisição:', error));
  }, [userId]);

  const handleOpenModal = async (idPedido) => {
    try {
      const response = await fetch(`http://localhost:3001/getPedidosExtras/${idPedido}`);

      if (!response.ok) {
        throw new Error('Erro ao obter os dados do pedido');
      }

      const data = await response.json();
      setPedidoData(data); // Armazenar os dados do pedido no estado

      setShowModal(true); // Exibir o modal
    } catch (error) {
      console.error('Ocorreu um erro ao abrir o modal:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const campoNomes = {
    DPproductId: 'ID do Produto',
    DPnomeProd: 'Nome do Produto',
    DPvalorProd: 'Valor do Produto R$',
    DPselectedSize: 'Tamanho Selecionado',
    DPselectedQuantity: 'Quantidade Selecionada',
    DPsubTotal: 'Subtotal R$'
  };

  return (
    <>
      <Navbar />
      <div className="content">
        <h2>Listagem dos Pedidos</h2>
        {data && data.status === 'ok' ? (
          pedidos.map((pedido, index) => (
            <div key={index} className={`pedido-item ${index % 2 === 0 ? 'even' : 'odd'}`}>
              <div className="pedido-titulo">{pedido.userNomePedido}</div>
              <div className="pedido-info">
                <p>Preço: {pedido.userPreco}</p>
              </div>
              <div className="pedido-outros">
                <p>Status: {pedido.userStatus}</p>
                <p>Data: {pedido.userData}</p>
                <div className="cart-btns">
                  <Button
                    className="green-button"
                    onClick={() => {
                      setSelectedPedidoId(pedido.userId);
                      handleOpenModal(pedido.userId);
                    }}
                  >
                    Detalhes
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Você ainda não realizou nenhuma compra</p>
        )}
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pedidoData ? (
            <>
              {pedidoData.map((pedido, index) => (
                <div key={index}>
                  {Object.entries(pedido).map(([key, value]) => (
                    <div key={key}>
                      <p><strong>{campoNomes[key]}:</strong> {value}</p>
                      {key === "DPsubTotal" && <hr />} {/* Linha horizontal após o subtotal */}
                    </div>
                  ))}
                </div>
              ))}
            </>
          ) : (
            <p>Nenhum detalhe do pedido disponível</p>
          )}
        </Modal.Body>

      </Modal>
    </>
  );
}

export default ListPedidosPage;
