import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EstoqueModal = ({ show, handleClose, handleSaveEstoque, produtoSelecionado }) => {
    const [estoqueData, setEstoqueData] = useState({
        id_produto: '',
        nome_produto: '',
        itensEstoque: [],  // Lista para armazenar os itens de estoque
    });

    useEffect(() => {
        if (show && produtoSelecionado) {
            setEstoqueData({
                id_produto: produtoSelecionado.id_produto,
                nome_produto: produtoSelecionado.nome,
                itensEstoque: [],
            });
        }
    }, [show, produtoSelecionado]);

    const handleSave = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/salvarEstoque', estoqueData);
            console.log(response.data.message);
        } catch (error) {
            console.error('Erro ao salvar o estoque:', error.message);
        } finally {
            handleClose();
        }
    };

    const handleAddItem = () => {
        // Adicionar um novo item de estoque vazio à lista
        setEstoqueData(prevData => ({
            ...prevData,
            itensEstoque: [...prevData.itensEstoque, { nome_tamanho: '', nome_cor: '', qtde: '' }]
        }));
    };

    const handleRemoveItem = (index) => {
        // Remover o item correspondente da lista de itens de estoque
        setEstoqueData(prevData => ({
            ...prevData,
            itensEstoque: prevData.itensEstoque.filter((_, i) => i !== index)
        }));
    };

    const handleItemChange = (index, field, value) => {
        // Atualizar o campo específico do item na lista de itens de estoque
        setEstoqueData(prevData => ({
            ...prevData,
            itensEstoque: prevData.itensEstoque.map((item, i) => (i === index ? { ...item, [field]: value } : item))
        }));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Estoque</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formIdProduto">
                        ID do Produto:
                        <Form.Control type="text" name="id_produto" value={estoqueData.id_produto} readOnly />
                    </Form.Group>

                    <Form.Group controlId="formNomeProduto">
                        Nome do Produto:
                        <Form.Control type="text" name="nome_produto" value={estoqueData.nome_produto} readOnly />
                    </Form.Group>

                    {estoqueData.itensEstoque.map((item, index) => (
                        <div key={index}>
                            <Form.Group controlId={`formTamanho${index}`}>
                                Tam:
                                <Form.Control
                                    type="text"
                                    name={`nome_tamanho_${index}`}
                                    value={item.nome_tamanho}
                                    onChange={(e) => handleItemChange(index, 'nome_tamanho', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId={`formQtde${index}`}>
                                Qtde:
                                <Form.Control
                                    type="text"
                                    name={`qtde_${index}`}
                                    value={item.qtde}
                                    onChange={(e) => handleItemChange(index, 'qtde', e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId={`formCor${index}`}>
                                Cor:
                                <Form.Control
                                    type="text"
                                    name={`nome_cor_${index}`}
                                    value={item.nome_cor}
                                    onChange={(e) => handleItemChange(index, 'nome_cor', e.target.value)}
                                />
                            </Form.Group>


                            <Button
                                variant="danger"
                                onClick={() => handleRemoveItem(index)}
                            >
                                Remover Item
                            </Button>
                        </div>
                    ))}
                    <Button variant="primary" onClick={handleAddItem}>
                        Adicionar Item
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Fechar
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Salvar Estoque
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EstoqueModal;
