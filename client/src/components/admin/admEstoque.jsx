import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'; // Importe o componente Button
import './movTb.css'; // Certifique-se de criar e importar o arquivo de estilo
import { Modal, Form } from 'react-bootstrap';


export default function EstoqueTable() {
    const [estoque, setEstoque] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [novaQuantidade, setNovaQuantidade] = useState(0);
    const [idProduto, setIdProduto] = useState(null);
    const [nomeProduto, setNomeProduto] = useState(''); // Adicione o estado para o nome do produto
    const [TamanhoT, setTamanho] = useState(''); // Adicione o estado para o tamanho
    const [CorT, setCor] = useState(''); // Adicione o estado para a cor
    const [IdEstoque, setIdEstoque] = useState(''); // Adicione o estado para a cor

    useEffect(() => {
        const obterEstoque = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/obterEstoque?pagina=${pagina}`);
                setEstoque(response.data);
            } catch (error) {
                console.error('Erro ao obter estoque:', error);
            }
        };
        obterEstoque();
    }, [pagina]);

    const handleUpdateEstoque = (id_produto) => {
        const produto = estoque.find((p) => p.id_produto === id_produto);

        if (produto) {
            setNomeProduto(produto.nome);
            setNovaQuantidade(produto.qtde);
            setCor(produto.nome_cor); // Ajuste para pegar a cor corretamente
            setTamanho(produto.nome_tamanho); // Ajuste para pegar o tamanho corretamente
            setIdEstoque(produto.id_estoque)
            setShowUpdateModal(true);
        } else {
            console.error('O objeto produto não foi encontrado');
        }

        setIdProduto(id_produto);
        setShowUpdateModal(true);
    };

    const handleSaveUpdate = async () => {
        try {
            // Faça a requisição de atualização
            await axios.put(`http://localhost:3001/atualizarEstoque/${IdEstoque}`, {
                id_estoque: IdEstoque,
                novaQuantidade: novaQuantidade,
                tamanho: TamanhoT,
                cor: CorT,
            });

            console.log('Estoque atualizado com sucesso!');
            setShowUpdateModal(false);

            // Atualize a página
            window.location.reload();
        } catch (error) {
            console.error('Erro ao atualizar o estoque:', error);
            // Trate o erro conforme necessário (exibindo uma mensagem, por exemplo)
        }
    };

    const handleDeleteEstoque = async (IdEstoque) => {
        try {
            // Confirmação do usuário
            const confirmDelete = window.confirm('Tem certeza de que deseja excluir este produto do estoque?');
    
            if (!confirmDelete) {
                // O usuário clicou em "Cancelar"
                return;
            }
    
            // Faça a requisição de exclusão
            await axios.delete(`http://localhost:3001/excluirEstoque/${IdEstoque}`);
            console.log('Produto excluído com sucesso!');
    
            // Atualize a página ou apenas atualize os dados no estado, dependendo da sua lógica
            window.location.reload();
        } catch (error) {
            console.error('Erro ao excluir o produto:', error);
            // Trate o erro conforme necessário (exibindo uma mensagem, por exemplo)
        }
    };
    

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID Estoque</th>
                        <th>ID Produto</th>
                        <th>Nome do Produto</th>
                        <th>Quantidade</th>
                        <th>Tamanho</th>
                        <th>Cor</th>
                        <th>Delete</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {estoque.map((item) => (
                        <tr key={item.id_estoque}>
                            <td>{item.id_estoque}</td>
                            <td>{item.id_produto}</td>
                            <td>{item.nome}</td>
                            <td>{item.qtde}</td>
                            <td>{item.nome_tamanho}</td>
                            <td>{item.nome_cor}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDeleteEstoque(item.id_estoque)}>
                                    D
                                </Button>
                            </td>
                            <td>
                                <Button variant="success" onClick={() => handleUpdateEstoque(item.id_produto)}>
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
                    <Modal.Title>Atualizar Estoque</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formIdProduto">
                            ID Produto
                            <Form.Control type="text" value={idProduto} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formNomeProduto">
                            Nome Produto
                            <Form.Control type="text" value={nomeProduto} readOnly />
                        </Form.Group>
                        <Form.Group controlId="formNovaQuantidade">
                            Quantidade
                            <Form.Control
                                type="number"
                                value={novaQuantidade}
                                onChange={(e) => setNovaQuantidade(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formTamanho">
                            Tamanho
                            <Form.Control
                                type="text"
                                value={TamanhoT}
                                onChange={(e) => setTamanho(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formCor">
                            Cor
                            <Form.Control
                                type="text"
                                value={CorT}
                                onChange={(e) => setCor(e.target.value)}
                            />
                        </Form.Group>
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