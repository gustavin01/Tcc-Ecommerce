import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Modal, Form } from 'react-bootstrap';
import { BsXCircle } from 'react-icons/bs';

export default function PedidoTable() {
    const [pedidos, setPedidos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [novaQuantidade, setNovaQuantidade] = useState(0);
    const [idPedido, setIdPedido] = useState(null);
    const [nomePedido, setNomePedido] = useState('');
    const [preco, setPreco] = useState(0);
    const [qtd, setQtd] = useState(0);
    const [data, setData] = useState('');

    const [status, setStatus] = useState('');
    const [isValid, setIsValid] = useState(true);

    const allowedValues = ['Cancelado', 'Pendente', 'Aprovado', 'Preparando envio', 'Enviado com sucesso', 'Chegou em casa'];

    const handleStatusChange = (e) => {
        const inputValue = e.target.value;
        const isValidValue = allowedValues.includes(inputValue);
        setIsValid(isValidValue);
        setStatus(inputValue);
    };

    useEffect(() => {
        const obterPedidos = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/obterPedidos?pagina=${pagina}`);
                setPedidos(response.data);
            } catch (error) {
                console.error('Erro ao obter pedidos:', error);
            }
        };
        obterPedidos();
    }, [pagina]);

    const handleUpdatePedido = (id_pedido) => {
        const pedido = pedidos.find((p) => p.id === id_pedido);

        if (pedido) {
            setNomePedido(pedido.nomePedido);
            setNovaQuantidade(pedido.qtd);
            setPreco(pedido.preco);
            setQtd(pedido.qtd);
            setData(pedido.data);
            setStatus(pedido.status);
            setShowUpdateModal(true);
        } else {
            console.error('O objeto pedido não foi encontrado');
        }

        setIdPedido(id_pedido);
        setShowUpdateModal(true);
    };

    const handleSaveUpdate = async () => {
        try {
            // Faça a requisição de atualização
            await axios.put(`http://localhost:3001/atualizarPedido/${idPedido}`, {
                nomePedido: nomePedido,
                preco: preco,
                qtd: novaQuantidade,
                data: data,
                status: status,
            });

            console.log('Pedido atualizado com sucesso!');
            setShowUpdateModal(false);

            // Atualize a página
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar o pedido:', error);
            // Trate o erro conforme necessário (exibindo uma mensagem, por exemplo)
        }
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Usuário</th>
                        <th>Nome do Pedido</th>
                        <th>Preço</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Status</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id_usuario}</td>
                            <td>{item.nomePedido}</td>
                            <td>R$ {item.preco}</td>
                            <td>{item.qtd}</td>
                            <td>{item.data}</td>
                            <td>{item.status}</td>
                            <td>
                                <Button variant="success" onClick={() => handleUpdatePedido(item.id)}>
                                    U
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={() => setPagina((prevPagina) => prevPagina - 1)} disabled={pagina === 1}>
                    Página Anterior
                </button>
                <button onClick={() => setPagina((prevPagina) => prevPagina + 1)}>
                    Próxima Página
                </button>
            </div>

            {/* Modal de Atualização */}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Atualizar Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formIdPedido">
                            ID Pedido
                            <Form.Control type="text" value={idPedido} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formNomePedido">
                            Nome Pedido
                            <Form.Control type="text" value={nomePedido} onChange={(e) => setNomePedido(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formPreco">
                            Preço
                            <Form.Control type="number" value={preco} onChange={(e) => setPreco(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="formNovaQuantidade">
                            Quantidade
                            <Form.Control
                                type="number"
                                value={novaQuantidade}
                                onChange={(e) => setNovaQuantidade(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formData">
                            Data
                            <Form.Control
                                type="text"
                                value={data}
                                onChange={(e) => setData(e.target.value)}
                            />
                        </Form.Group>
                        <Form>
                            <Form.Group controlId="formStatus">
                                Status
                                <Form.Control
                                    as="select"
                                    value={status}
                                    onChange={handleStatusChange}
                                    isInvalid={!isValid}
                                >
                                    {allowedValues.map((value, index) => (
                                        <option key={index} value={value}>{value}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                        </Form>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={handleSaveUpdate}>
                        Salvar Alterações
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
