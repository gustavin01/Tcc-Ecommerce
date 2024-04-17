import './ProdutosPage.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import EstoqueModal from './estoqueModal';

function AdmProduto() {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [file, setFile] = useState(null);

  //Estoque Modal
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [produtoEstoqueSelecionado, setProdutoEstoqueSelecionado] = useState(null);
  const [showEstoqueModal, setShowEstoqueModal] = useState(false);

  const handleUpdateEstoque = (id_produto) => {
    const produto = data.find((p) => p.id_produto === id_produto);

    // Certifique-se de que o objeto produto tem a propriedade 'nome'
    if (produto && produto.nome) {
      // Define o produto de estoque selecionado no estado
      setProdutoEstoqueSelecionado(produto);

      // Abre o modal de estoque
      setShowEstoqueModal(true);
    } else {
      console.error('O objeto produto não contém a propriedade "nome"');
    }
  };

  const handleShowEstoqueModal = (id_produto) => {
    const produto = data.find((p) => p.id_produto === id_produto);
    setProdutoEstoqueSelecionado(produto);
    setShowEstoqueModal(true);
  };

  const handleCloseEstoqueModal = () => {
    setShowEstoqueModal(false);
  };

  const handleSaveEstoque = () => {
    console.log('Salvando estoque...');
    handleCloseEstoqueModal();
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:3001/getListProd')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  }, [reload]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    // Atualizar temporariamente o estado com a URL da imagem carregada
    setProdutoParaEditar((prevProduto) => ({
      ...prevProduto,
      tempImageUrl: URL.createObjectURL(selectedFile),
    }));

    // Atualizar o estado de 'file'
    setFile(selectedFile);
  };

  const handleDelete = async (id_produto) => {
    // Exibe uma janela de confirmação ao usuário
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este produto?");

    // Se o usuário clicar em "OK", prossiga com a exclusão
    if (confirmDelete) {
      try {
        const response = await axios.delete(`http://localhost:3001/excluirProduto/${id_produto}`);
        console.log(response.data); // Mensagem do servidor (opcional)

        // Atualizar a lista de produtos após a exclusão
        const updatedProdutos = data.filter(data => data.id_produto !== id_produto);
        setData(updatedProdutos);

        // Atualizar o estado de recarregamento para forçar o useEffect a ser acionado
        setReload(prevReload => !prevReload);
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
      }
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const valTemp = produtoParaEditar.ativo;

    const formData = new FormData();

    formData.append('nome', produtoParaEditar.nome);
    formData.append('valor', produtoParaEditar.valor);
    formData.append('descricao', produtoParaEditar.descricao);
    formData.append('nome_marca', produtoParaEditar.nome_marca);
    formData.append('ativo', produtoParaEditar.ativo);
    formData.append('imagem', file);

    try {
      // Fazer uma requisição PUT para atualizar o produto no servidor
      const response = await axios.put(
        `http://localhost:3001/atualizarProduto/${produtoParaEditar.id_produto}`,
        formData
      );

      console.log(response.data); // Mensagem do servidor (opcional)

      // Atualizar a lista de produtos após a edição
      const updatedProdutos = produtos.map((produto) =>
        produto.id_produto === produtoParaEditar.id_produto ? produtoParaEditar : produto
      );
      setProdutos(updatedProdutos);

      // Recarregar a página após o salvamento bem-sucedido
      window.location.reload();
      console.log('Valor de ativo antes de enviar para o servidor:', valTemp.toString());

      // Fechar o modal após o salvamento
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  const handleUpdate = (id_produto) => {
    const produto = data.find((p) => p.id_produto === id_produto);
    setProdutoParaEditar(produto);
    setShowModal(true);
  };


  const handleCloseModal = () => {
    setProdutoParaEditar(null);
    setShowModal(false);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Ativo</th>
            <th>Imagem</th>
            <th scope="col">Add</th>
            <th scope="col">Del</th>
            <th scope="col">Estoque</th>
          </tr>
        </thead>
        <tbody>
          {data.map((db, index) => (
            <tr key={index}>
              <td>{db.id_produto}</td>
              <td>{db.nome}</td>
              <td>{db.valor}</td>
              <td>{db.ativo ? 'Sim' : 'Não'}</td>
              <td>
                <img
                  src={`http://127.0.0.1:3001/uploads/${db.nome_imagemM}`}
                  alt={db.nome_imagemM}
                  style={{ maxWidth: '100px', height: 'auto', border: '1px solid #ccc' }}
                />
              </td>
              <td>
                <button
                  className="btn btn-success mx-2"
                  onClick={() => handleUpdate(db.id_produto)}>
                  U
                </button>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(db.id_produto)}>
                  D
                </button>
              </td>
              <td>
                <Button variant="info" onClick={() => handleUpdateEstoque(db.id_produto)}>
                  E
                </Button>
              </td>
              <EstoqueModal
                show={showEstoqueModal}
                handleClose={handleCloseEstoqueModal}
                handleSaveEstoque={handleSaveEstoque}
                produtoSelecionado={produtoEstoqueSelecionado}
                className="remove-fade"

              />
            </tr>
          ))}
        </tbody>
      </table>
      <br></br>

      {/* Modal de Edição */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNome">
              Nome:
              <Form.Control
                type="text"
                value={produtoParaEditar?.nome || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    nome: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formValor">
              Valor:
              <Form.Control
                type="text"
                value={produtoParaEditar?.valor || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    valor: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDescricao">
              Descrição:
              <Form.Control
                as="textarea"
                rows={3}
                value={produtoParaEditar?.descricao || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    descricao: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formAtivo">
              Ativo:
              <Form.Control
                as="select"
                value={
                  produtoParaEditar?.ativo !== undefined
                    ? produtoParaEditar.ativo === 1
                      ? 'true'
                      : 'false'
                    : ''
                }
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    ativo: e.target.value === 'true' ? 1 : 0,
                  })
                }
              >
                <option value="">Selecione</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImagem">
              <Form.Label>Imagem</Form.Label>
              {produtoParaEditar?.nome_imagem ? (
                <img
                  src={`http://127.0.0.1:3001/uploads/${produtoParaEditar.nome_imagem}`}
                  alt={produtoParaEditar.nome_imagem}
                  style={{ maxWidth: '100px', height: 'auto', border: '1px solid #ccc' }}
                />
              ) : (
                <span>Nenhuma imagem disponível</span>
              )}
              <Form.Control
                type="file" name="imagem" onChange={(e) => handleFileChange(e)}
              />
            </Form.Group>


            <Form.Group controlId="formNomeMarca">
              Marca:
              <Form.Control
                type="text"
                value={produtoParaEditar?.nome_marca || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    nome_marca: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Salvar Alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdmProduto;
