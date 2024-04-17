import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function ImageTable() {
  const [produtos, setProdutos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [file, setFile] = useState(null);

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
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append('nome', produtoParaEditar.nome);
    formData.append('valor', produtoParaEditar.valor);
    formData.append('qtd', produtoParaEditar.qtd);
    formData.append('descricao', produtoParaEditar.descricao);
    formData.append('nome_cor', produtoParaEditar.nome_cor);
    formData.append('nome_tamanho', produtoParaEditar.nome_tamanho);
    formData.append('nome_marca', produtoParaEditar.nome_marca);
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
            <th>Quantidade</th>
            <th>Ativo</th>
            <th>Cor</th>
            <th>Tamanho</th>
            <th>Imagem</th>
            <th scope="col">Update</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((db, index) => (
            <tr key={index}>
              <td>{db.id_produto}</td>
              <td>{db.nome}</td>
              <td>{db.valor}</td>
              <td>{db.qtd}</td>
              <td>{db.ativo ? 'Sim' : 'Não'}</td>
              <td>{db.nome_cor}</td>
              <td>{db.nome_tamanho}</td>
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
              <Form.Label>Nome:</Form.Label>
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
              <Form.Label>Valor:</Form.Label>
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

            <Form.Group controlId="formQtd">
              <Form.Label>Quantidade:</Form.Label>
              <Form.Control
                type="text"
                value={produtoParaEditar?.qtd || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    qtd: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formDescricao">
              <Form.Label>Descrição:</Form.Label>
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
              <Form.Label>Ativo:</Form.Label>
              <Form.Control
                as="select"
                value={produtoParaEditar?.ativo || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    ativo: e.target.value,
                  })
                }
              >
                <option value={true}>Sim</option>
                <option value={false}>Não</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formNomeCor">
              <Form.Label>Nome da Cor:</Form.Label>
              <Form.Control
                type="text"
                value={produtoParaEditar?.nome_cor || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    nome_cor: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formNomeTamanho">
              <Form.Label>Nome do Tamanho:</Form.Label>
              <Form.Control
                type="text"
                value={produtoParaEditar?.nome_tamanho || ''}
                onChange={(e) =>
                  setProdutoParaEditar({
                    ...produtoParaEditar,
                    nome_tamanho: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group controlId="formImagem">
              <Form.Label>Imagem:</Form.Label>
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
              <Form.Label>Nome da Marca:</Form.Label>
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

export default ImageTable;
