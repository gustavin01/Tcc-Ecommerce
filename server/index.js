
const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const mercadopago = require("mercadopago");
const cookieParser = require('cookie-parser');
const axios = require('axios');
const uploadRoutes = require('./uploadRoutes');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');


var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var jwt = require("jsonwebtoken");
const secret = "Guya-Ilimiteds-2023";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbecommerce",
});

const store = require("store");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post("/register", (req, res) => {
  const usuario = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const rua = req.body.rua;
  const numero = req.body.numero;
  const bairro = req.body.bairro;
  const complemento = req.body.complemento;
  const cidade = req.body.cidade;
  const uf = req.body.uf;

  const nome = req.body.nome;
  const cpf = req.body.cpf;
  const idade = req.body.idade;
  const telefone = req.body.telefone;
  db.query("SELECT * FROM usuarios WHERE email = ?", [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length === 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          res.send(err);
        } else {
          // Inserção na tabela 'usuarios'
          db.query(
            "INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)",
            [usuario, email, hash],
            (error, response) => {
              if (error) {
                res.send(error);
              } else {
                // Obtém o ID do usuário inserido na tabela 'usuarios'

                const userId = response.insertId;
                // Inserção na tabela 'enderecos'
                db.query(
                  "INSERT INTO enderecos (id_usuario, rua, numero, bairro, complemento, cidade, uf) VALUES (?, ?, ?, ?, ?, ?, ?)",
                  [userId, rua, numero, bairro, complemento, cidade, uf],
                  (error, response) => {
                    if (error) {
                      res.send(error);
                    } else {
                      // Inserção na tabela 'contatos'

                      db.query(
                        "INSERT INTO contatos (id_usuario, nome_completo, cpf, idade, telefone) VALUES (?, ?, ?, ?, ?)",
                        [userId, nome, cpf, idade, telefone],
                        (error, response) => {
                          if (error) {
                            res.send(error);
                          } else {
                            res.send({ msg: "Cadastrado com sucesso" });
                          }
                        }
                      );
                    }
                  });
              }
            });
        }
      });
    } else {
      res.send({ msg: "Usuário já cadastrado" });
    }
  });
});


app.post("/login", jsonParser, function (req, res, next) {
  db.execute(
    "SELECT * FROM usuarios WHERE email=?",
    [req.body.email],
    function (err, usuarios, fields) {
      if (err) {
        res.send({ msg: "não encontrado" });
        return;
      }
      if (usuarios.length == 0) {
        res.send({ msg: "não encontrado" });
        return;
      }
      bcrypt.compare(
        req.body.senha,
        usuarios[0].senha,
        function (error, isLogin) {
          if (isLogin) {
            var token = jwt.sign({ email: usuarios[0].email }, secret, { expiresIn: "1h" });
            var userId = (usuarios[0].id);
            res.send({ status: "ok", msg: "login success", token, userId });
          } else {
            res.send({ status: "error", msg: "login fail" });
          }
        });
    });
});

app.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.messages });
  }
});

app.get('/verDados', (req, res) => {
  const userId = req.query.userId;

  db.execute(
    `
      SELECT *
      FROM usuarios
      JOIN enderecos ON usuarios.id = enderecos.id_usuario
      JOIN contatos ON enderecos.id_usuario = contatos.id_usuario
      WHERE usuarios.id = ?
      `,
    [userId],
    function (err, result) {
      if (err) {
        res.send({ msg: "seila" });
        return;
      }
      if (result.length == 0) {
        res.send({ msg: "seila" });
        return;
      }

      var userName = result[0].usuario;
      var userEmail = result[0].email;
      var userId = result[0].id;

      var userRua = result[0].rua;
      var userNumero = result[0].numero;
      var userBairro = result[0].bairro;
      var userComple = result[0].complemento;
      var userCidade = result[0].cidade;
      var userUf = result[0].uf;

      var userNome = result[0].nome_completo;
      var userCpf = result[0].cpf;
      var userIdade = result[0].idade;
      var userTele = result[0].telefone;

      res.json({ status: "ok", userName, userEmail, userRua, userNumero, userBairro, userComple, userCidade, userUf, userNome, userCpf, userIdade, userTele });
    }
  );
});

app.post('/DULo', (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const id = req.body.id;
  const conSenha = req.body.senha; // Senha fornecida pelo cliente

  console.log("Valores recebidos:", name, email, id, conSenha);

  // Consulta para obter a senha criptografada do banco de dados
  db.execute(
    `
      SELECT senha FROM usuarios WHERE id = ?
      `,
    [id],
    function (err, result) {
      if (err) {
        console.error(err);
        res.json({ status: "desok", msg: "Erro interno do servidor" });
        return;
      }

      if (result.length === 0) {
        // Se nenhum usuário com o ID especificado for encontrado
        res.json({ status: "desok", msg: "Usuário não encontrado" });
        return;
      }

      const senhaCriptografadaDoBanco = result[0].senha;

      // Verificar se a senha fornecida pelo cliente corresponde à senha criptografada do banco de dados
      bcrypt.compare(conSenha, senhaCriptografadaDoBanco, function (err, senhaCorrespondente) {
        if (err) {
          console.error(err);
          res.json({ status: "desok", msg: "Erro na verificação de senha" });
          return;
        }

        if (senhaCorrespondente) {
          // Se a senha estiver correta, execute a atualização no banco de dados
          db.execute(
            `
              UPDATE usuarios SET usuario = ?, email = ? WHERE id = ?
              `,
            [name, email, id],
            function (err, result) {
              if (err) {
                console.error(err);
                res.json({ msg: "Erro interno do servidor" });
                return;
              } else {
                res.json({ status: "ok", userName: name, userEmail: email });
              }
            }
          );
        } else {
          // Se a senha estiver incorreta, retorne um erro
          res.json({ status: "desok", msg: "Dados Invalidos ou Inexistentes" });
        }
      });
    }
  );
});

app.post('/DUEn', (req, res) => {
  const rua = req.body.rua;
  const numero = req.body.numero;
  const comple = req.body.comple;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  const id = req.body.id;
  const conSenha = req.body.senha; // Senha fornecida pelo cliente

  // Consulta para obter a senha criptografada do banco de dados
  db.execute(
    `
      SELECT senha FROM usuarios WHERE id = ?
      `,
    [id],
    function (err, result) {
      if (err) {
        console.error(err);
        res.json({ status: "desok", msg: "Erro interno do servidor" });
        return;
      }

      if (result.length === 0) {
        // Se nenhum usuário com o ID especificado for encontrado
        res.json({ status: "desok", msg: "Usuário não encontrado" });
        return;
      }

      const senhaCriptografadaDoBanco = result[0].senha;

      // Verificar se a senha fornecida pelo cliente corresponde à senha criptografada do banco de dados
      bcrypt.compare(conSenha, senhaCriptografadaDoBanco, function (err, senhaCorrespondente) {
        if (err) {
          console.error(err);
          res.json({ status: "desok", msg: "Erro na verificação de senha" });
          return;
        }

        if (senhaCorrespondente) {
          // Se a senha estiver correta, execute a atualização no banco de dados
          db.execute(
            `
              UPDATE enderecos SET rua = ?, numero = ?, bairro = ?, complemento = ?, cidade = ?, uf = ? WHERE id_usuario = ?
              `,
            [rua, numero, comple, bairro, cidade, uf, id],
            function (err, result) {
              if (err) {
                console.error(err);
                res.json({ msg: "Erro interno do servidor" });
                return;
              } else {
                res.json({ status: "ok", inputRua: rua, inputNumero: numero, inputBairro: bairro, inputComplemento: comple, inputCidade: cidade, inputUf: uf });
              }
            }
          );
        } else {
          // Se a senha estiver incorreta, retorne um erro
          res.json({ status: "desok", msg: "Dados Invalidos ou Inexistentes" });
        }
      });
    }
  );
});

app.post('/DUCo', (req, res) => {
  const nome = req.body.nome;
  const idade = req.body.idade;
  const cpf = req.body.cpf;
  const telefone = req.body.telefone;
  const id = req.body.id;
  const conSenha = req.body.senha;

  db.execute(
    `
      SELECT senha FROM usuarios WHERE id = ?
      `,
    [id],
    function (err, result) {
      if (err) {
        console.error(err);
        res.json({ status: "desok", msg: "Erro interno do servidor" });
        return;
      }

      if (result.length === 0) {
        // Se nenhum usuário com o ID especificado for encontrado
        res.json({ status: "desok", msg: "Usuário não encontrado" });
        return;
      }

      const senhaCriptografadaDoBanco = result[0].senha;

      // Verificar se a senha fornecida pelo cliente corresponde à senha criptografada do banco de dados
      bcrypt.compare(conSenha, senhaCriptografadaDoBanco, function (err, senhaCorrespondente) {
        if (err) {
          console.error(err);
          res.json({ status: "desok", msg: "Erro na verificação de senha" });
          return;
        }

        if (senhaCorrespondente) {
          // Se a senha estiver correta, execute a atualização no banco de dados
          db.execute(
            `
              UPDATE contatos SET nome_completo = ?, cpf = ?, idade = ?, telefone = ? WHERE id_usuario = ?
              `,
            [nome, cpf, idade, telefone, id],
            function (err, result) {
              if (err) {
                console.log(err);
                res.json({ msg: "Erro interno do servidor" });
                return;
              } else {
                res.json({ status: "ok", inputNome: nome, inputIdade: idade, inputCPF: cpf, inputTelefone: telefone });
              }
            }
          );
        } else {
          // Se a senha estiver incorreta, retorne um erro
          res.json({ status: "desok", msg: "Dados Invalidos ou Inexistentes" });
        }
      });
    }
  );
});

app.post('/DUAll', (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const rua = req.body.rua;
  const numero = req.body.numero;
  const comple = req.body.comple;
  const bairro = req.body.bairro;
  const cidade = req.body.cidade;
  const uf = req.body.uf;
  const nome = req.body.nome;
  const idade = req.body.idade;
  const cpf = req.body.cpf;
  const telefone = req.body.telefone;
  const id = req.body.id;
  const conSenha = req.body.senha;

  db.execute(
    `
      SELECT senha FROM usuarios WHERE id = ?
      `,
    [id],
    function (err, result) {
      if (err) {
        console.error(err);
        res.json({ status: "desok", msg: "Erro interno do servidor" });
        return;
      }

      if (result.length === 0) {
        // Se nenhum usuário com o ID especificado for encontrado
        res.json({ status: "desok", msg: "Usuário não encontrado" });
        return;
      }

      const senhaCriptografadaDoBanco = result[0].senha;

      // Verificar se a senha fornecida pelo cliente corresponde à senha criptografada do banco de dados
      bcrypt.compare(conSenha, senhaCriptografadaDoBanco, function (err, senhaCorrespondente) {
        if (err) {
          console.error(err);
          res.json({ status: "desok", msg: "Erro na verificação de senha" });
          return;
        }

        if (senhaCorrespondente) {
          // Se a senha estiver correta, execute as atualizações no banco de dados

          // Atualizar a tabela "usuarios"
          db.execute(
            `
              UPDATE usuarios SET usuario = ?, email = ? WHERE id = ?
              `,
            [name, email, id],
            function (err, result) {
              if (err) {
                console.log(err);
                res.json({ msg: "Erro na atualização de usuário" });
                return;
              }

              // Atualizar a tabela "enderecos"
              db.execute(
                `
                  UPDATE enderecos SET rua = ?, numero = ?, bairro = ?, complemento = ?, cidade = ?, uf = ? WHERE id_usuario = ?
                  `,
                [rua, numero, bairro, comple, cidade, uf, id],
                function (err, result) {
                  if (err) {
                    console.log(err);
                    res.json({ msg: "Erro na atualização de endereço" });
                    return;
                  }

                  // Atualizar a tabela "contatos"
                  db.execute(
                    `
                      UPDATE contatos SET nome_completo = ?, cpf = ?, idade = ?, telefone = ? WHERE id_usuario = ?
                      `,
                    [nome, cpf, idade, telefone, id],
                    function (err, result) {
                      if (err) {
                        console.log(err);
                        res.json({ msg: "Erro na atualização de contato" });
                        return;
                      }

                      res.json({
                        status: "ok",
                        userName: name,
                        userEmail: email,
                        inputRua: rua,
                        inputNumero: numero,
                        inputBairro: bairro,
                        inputComplemento: comple,
                        inputCidade: cidade,
                        inputUf: uf,
                        inputNome: nome,
                        inputIdade: idade,
                        inputCPF: cpf,
                        inputTelefone: telefone
                      });
                    }
                  );
                }
              );
            }
          );
        } else {
          // Se a senha estiver incorreta, retorne um erro
          res.json({ status: "desok", msg: "Dados Inválidos ou Inexistentes" });
        }
      });
    }
  );
});



app.post('/AlterSenha', (req, res) => {
  const senha = req.body.senha;
  const newSenha = req.body.newSenha;
  const newSenha2 = req.body.newSenha2;
  const id = req.body.id;

  db.execute(
    `
      SELECT senha FROM usuarios WHERE id = ?
      `,
    [id],
    function (err, result) {
      if (err) {
        console.error(err);
        res.json({ status: "desok", msg: "Erro interno do servidor" });
        return;
      }

      if (result.length === 0) {
        // Se nenhum usuário com o ID especificado for encontrado
        res.json({ status: "desok", msg: "Usuário não encontrado" });
        return;
      }

      const senhaCriptografadaDoBanco = result[0].senha;

      // Verificar se a senha fornecida pelo cliente corresponde à senha criptografada do banco de dados
      bcrypt.compare(senha, senhaCriptografadaDoBanco, function (err, senhaCorrespondente) {
        if (err) {
          console.error(err);
          res.json({ status: "desok", msg: "Erro na verificação de senha" });
          return;
        }

        if (senhaCorrespondente) {
          // Agora que a senha foi verificada com sucesso, você pode verificar e atualizar a nova senha
          bcrypt.hash(newSenha, saltRounds, (err, hash) => {
            if (err) {
              console.error(err);
              res.json({ status: "desok", msg: "Erro na criptografia da nova senha" });
            } else {
              // Atualizar a senha no banco de dados com a nova senha criptografada
              db.execute(
                `
                  UPDATE usuarios SET senha = ? WHERE id = ?
                  `,
                [hash, id],
                function (err, result) {
                  if (err) {
                    console.error(err);
                    res.json({ status: "desok", msg: "Erro na atualização da senha" });
                  } else {
                    res.json({ status: "ok" });
                  }
                }
              );
            }
          });
        } else {
          // Se a senha estiver incorreta, retorne um erro
          res.json({ status: "desok", msg: "Senha incorreta" });
        }
      });
    }
  );
});

//INICIO TESTE MP
app.use(express.json());
app.use(cookieParser());

mercadopago.configure({
  access_token: "TEST-2799460849626849-093011-53db7a38a4faac2e9f2bfaffcd316eaa-1217272975",
});

app.get("/", function (req, res) {
  res.send("¡El servidor de Mercado Pago funciona! :)");
});

app.post("/create_preference", (req, res) => {
  var title = req.body.description;
  var unit_price = Number(req.body.price);
  var quantity = Number(req.body.quantity);

  store.set('Vtitle', { title });
  store.set('Vprice', { unit_price });
  store.set('Vquantity', { quantity });

  {/*
  let val1 = store.get('Vtitle');
  let val2 = store.get('Vprice');
  let val3 = store.get('Vquantity');

  const cookieTitle = Object.values(val1)[0];
  const cookiePrice = Object.values(val2)[0];
  const cookieQuantity = Object.values(val3)[0];

  console.log(cookieTitle, cookiePrice, cookieQuantity);
  */}
  let preference = {
    items: [
      {
        title: req.body.description,
        unit_price: Number(req.body.price),
        quantity: Number(req.body.quantity),
      },
    ],
    back_urls: {
      success: "http://localhost:5173/aprovado",
      failure: "http://localhost:5173/recusado",
      pending: "http://localhost:5173/pendente",
    },
    auto_return: "approved",
  };

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      res.json({
        id: response.body.id,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});
//FIM TESTE MP

// PEGAR PEDIDO STATUS
app.get("/getPedidoStatus", (req, res) => {
  let val1 = store.get('Vtitle');
  let val2 = store.get('Vprice');
  let val3 = store.get('Vquantity');

  // Obtém a data e hora atual
  const dataHoraAtual = new Date();

  // Formata a data e hora
  const formatoDataHora = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };

  const val4 = dataHoraAtual.toLocaleString('pt-BR', formatoDataHora);

  // Exibe a data e hora formatadas

  const cookieTitle = Object.values(val1)[0];
  const cookiePrice = Object.values(val2)[0];
  const cookieQuantity = Object.values(val3)[0];
  const cookieData = val4;

  if (!cookieTitle || !cookiePrice || !cookieQuantity) {
    console.error("Alguns parâmetros não foram fornecidos corretamente.");
    res.json({ status: "desok" });
  } else {
    res.json({ status: "ok", cookieTitle, cookiePrice, cookieQuantity, cookieData });
  }
});

// PEGAR PEDIDO STATUS
app.post("/setPedidoStatus", (req, res) => {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const qtd = req.body.qtd;
  const datah = req.body.datah;
  const userid = req.body.userid;
  const status = req.body.status;
  const productId = req.body.productId;
  const selectedSize = req.body.selectedSize;
  const selectedQuantity = req.body.selectedQuantity;
  const idEstoque = req.body.idEstoque;
  const qtdeUp = req.body.qtdeUp;
  const DPproductId = req.body.DPproductId;
  const DPnomeProd = req.body.DPnomeProd;
  const DPvalorProd = req.body.DPvalorProd;
  const DPselectedSize = req.body.DPselectedSize;
  const DPselectedQuantity = req.body.DPselectedQuantity;
  const DPsubTotal = req.body.DPsubTotal;

  const allDataProd = productId.map((id, index) => ({
    DPproductId: id,
    DPnomeProd: DPnomeProd[index],
    DPvalorProd: DPvalorProd[index],
    DPselectedSize: DPselectedSize[index],
    DPselectedQuantity: DPselectedQuantity[index],
    DPsubTotal: DPsubTotal[index],
  }));

  const allData = productId.map((id, index) => ({
    productId: id,
    selectedSize: selectedSize[index],
    selectedQuantity: selectedQuantity[index],
  }));

  const estoqueData = idEstoque.map((id, index) => ({
    idEstoque: id,
    qtdeUp: qtdeUp[index],
  }));

  console.log("allData: ", allData);
  console.log("estoqueData: ", estoqueData);

  estoqueData.forEach((item, index) => {
    const { qtdeUp, idEstoque } = item;
    db.query(
      'UPDATE estoque SET qtde = ? WHERE id_estoque = ?',
      [qtdeUp, idEstoque],
      (err, result) => {
        if (err) {
          console.error(`Erro ao atualizar o estoque ${idEstoque}: ${err.message}`);
          return;
        }
        console.log(`Estoque ${idEstoque} atualizado com sucesso.`);

        if (index === estoqueData.length - 1) {
          console.log("Todas as atualizações foram concluídas.");
        }
      }
    );
  });

  db.query(
    "INSERT INTO pedidos (id_usuario, nomePedido, preco, qtd, status, data, detalhe_pedidos) VALUES (?, ?, ?, ?, ?, ?, ?) ",
    [userid, nome, preco, qtd, status, datah, JSON.stringify(allDataProd)],
    (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ status: "ok" });
      }
    }
  );
});

app.post("/setPedidoStatusRecusado", (req, res) => {
  const nome = req.body.nome;
  const preco = req.body.preco;
  const qtd = req.body.qtd;
  const datah = req.body.datah;
  const userid = req.body.userid;
  const status = req.body.status;
  const productId = req.body.productId;
  const selectedSize = req.body.selectedSize;
  const selectedQuantity = req.body.selectedQuantity;
  const DPproductId = req.body.DPproductId;
  const DPnomeProd = req.body.DPnomeProd;
  const DPvalorProd = req.body.DPvalorProd;
  const DPselectedSize = req.body.DPselectedSize;
  const DPselectedQuantity = req.body.DPselectedQuantity;
  const DPsubTotal = req.body.DPsubTotal;

  const allDataProd = productId.map((id, index) => ({
    DPproductId: id,
    DPnomeProd: DPnomeProd[index],
    DPvalorProd: DPvalorProd[index],
    DPselectedSize: DPselectedSize[index],
    DPselectedQuantity: DPselectedQuantity[index],
    DPsubTotal: DPsubTotal[index],
  }));

  const allData = productId.map((id, index) => ({
    productId: id,
    selectedSize: selectedSize[index],
    selectedQuantity: selectedQuantity[index],
  }));

  db.query(
    "INSERT INTO pedidos (id_usuario, nomePedido, preco, qtd, status, data, detalhe_pedidos) VALUES (?, ?, ?, ?, ?, ?, ?) ",
    [userid, nome, preco, qtd, status, datah, JSON.stringify(allDataProd)],
    (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.json({ status: "ok" });
      }
    }
  );
});

// PEGAR LISTA PEDIDO STATUS
app.get("/ListPedidoStatus", (req, res) => {
  const userId = req.query.userId;
  console.log(userId);

  db.execute(
    `
    SELECT *
    FROM pedidos
    WHERE id_usuario = ?
    ORDER BY id DESC;    
    `,
    [userId],
    function (err, result) {
      if (err) {
        res.send({ msg: "algum erro", err });
        return;
      }
      if (result.length === 0) {
        res.send({ msg: "ta vazio" });
        return;
      }

      const pedidos = result.map((pedido) => {
        return {
          userNomePedido: pedido.nomePedido,
          userPreco: pedido.preco,
          userStatus: pedido.status,
          userData: pedido.data,
          userId: pedido.id
        };
      });

      res.json({ status: "ok", pedidos });
    }
  );
});


app.post('/process-form', async (req, res) => {
  // Extrai os dados do formulário do req.body
  const {
    nome_completo,
    celular,
    senha,
    endereco,
    cidade,
    bairro,
    numero,
    cep,
    complemento,
    uf,
    email,
  } = req.body;

  // Realiza o processamento dos dados do formulário conforme necessário
  console.log('Dados do formulário:');
  console.log('Nome Completo:', nome_completo);
  console.log('Celular:', celular);
  console.log('Senha:', senha);
  console.log('Endereço:', endereco);
  console.log('Cidade:', cidade);
  console.log('Bairro:', bairro);
  console.log('Número:', numero);
  console.log('CEP:', cep);
  console.log('Complemento:', complemento);
  console.log('UF:', uf);
  console.log('Email:', email);

  // Exemplo de envio de dados para a API Oracle usando axios
  try {
    const response = await axios.post('https://apex.oracle.com/pls/apex/ecommerceeeee/produts/client', req.body);
    console.log(response.data); // Dados da resposta da API
  } catch (error) {
    console.error(error);
  }

  // Redirecionar o usuário para a mesma página
  res.redirect(303, '/');
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'))

app.get('/getListProd', (req, res) => {
  const sql = `
    SELECT 
    produto.*, 
    imagens.nome_imagemM, 
    GROUP_CONCAT(estoque.qtde) AS qtde,
    GROUP_CONCAT(estoque.id_estoque) AS id_estoque,
    GROUP_CONCAT(estoque.nome_tamanho) AS nome_tamanho,
    GROUP_CONCAT(estoque.nome_cor) AS nome_cor
  FROM produto 
  LEFT JOIN imagens ON produto.id_produto = imagens.id_produtoM
  LEFT JOIN estoque ON produto.id_produto = estoque.id_produto
  GROUP BY produto.id_produto`;

  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "Error" });

    return res.json(result);
  });
});

app.post('/uploadProduto', upload.single('image'), async (req, res) => {
  try {
    const fileName = req.file.filename;
    console.log('FileName:', fileName);

    const { nome, valor, descricao, nome_marca } = req.body;
      let Ativo = false;

    db.query('INSERT INTO produto (nome, valor, descricao, nome_marca, nome_imagem, ativo) VALUES ( ?, ?, ?, ?, ?, ?)',
      [nome, valor, descricao, nome_marca, fileName, Ativo]);

    console.log('Produto salvo no banco de dados:', nome);
    res.json({ success: true, message: 'Produto enviado e salvo com sucesso' });
  } catch (error) {
    console.error('Erro ao receber e salvar produto:', error);
    res.status(500).json({ success: false, message: 'Erro ao receber e salvar produto', error: error.message });
  }
});

app.post('/loginadm', (req, res) => {
  const { admin, senha } = req.body;
  const query = `SELECT * FROM adm WHERE nome='${admin}' AND senha='${senha}'`;

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Erro no servidor');
      return;
    }

    if (result.length > 0) {
      res.status(200).send('Login bem-sucedido');
    } else {
      res.status(401).send('Credenciais inválidas');
    }
  });
});


app.get('/VerProdutos', (req, res) => {
  const query = 'SELECT id_produto, nome, valor, qtd, ativo, nome_cor, nome_tamanho, imagem FROM produto ORDER BY id_produto ASC';

  db.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Erro no servidor');
      return;
    }

    res.status(200).json(result);
  });
});

app.delete('/excluirProduto/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM produto WHERE id_produto = ?';

  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao excluir o produto');
      return;
    }

    res.status(200).send('Produto excluído com sucesso');
  });
});

app.put('/atualizarProduto/:id', upload.single('imagem'), async (req, res) => {
  const { id } = req.params;
  const { nome, valor, qtd, descricao, nome_tamanho, nome_cor, nome_marca, ativo } = req.body;

  try {
    let updateFields = {
      nome,
      valor,
      descricao,
      nome_marca,
      ativo
    };

    console.log("ativo ", ativo);

    // Se houver um novo upload de imagem, atualize o nome da imagem
    if (req.file) {
      const newImageName = req.file.filename;
      updateFields.nome_imagem = newImageName;

      // Atualize o nome da imagem no banco de dados
      db.query(
        'UPDATE produto SET nome_imagem = ? WHERE id_produto = ?',
        [newImageName, id]
      );

      console.log('Nome da imagem atualizado no banco de dados:', newImageName);
    }

    // Atualize os outros campos no banco de dados
    db.query(
      'UPDATE produto SET nome = ?, valor = ?, descricao = ?, nome_marca = ?, ativo = ? WHERE id_produto = ?',
      [nome, valor, descricao, nome_marca, ativo, id]
    );

    console.log('Produto atualizado no banco de dados:', nome);
    res.json({ success: true, message: 'Produto atualizado com sucesso', updatedProduct: updateFields });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res.status(500).json({ success: false, message: 'Erro ao atualizar produto', error: error.message });
  }
});


app.get('/obterMovimentos', (req, res) => {
  const { pagina } = req.query;
  const itensPorPagina = 25;
  const offset = (pagina - 1) * itensPorPagina;

  // Consulta SQL para obter os movimentos com paginação
  const sql = `SELECT * FROM movimentacoes ORDER BY id_movimento DESC LIMIT ${itensPorPagina} OFFSET ${offset}`;

  // Execute a consulta no banco de dados
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter movimentos do banco de dados:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter movimentos' });
    } else {
      res.json(result);
    }
  });
});

app.get('/obterEstoque', (req, res) => {
  const { pagina } = req.query;
  const itensPorPagina = 25;
  const offset = (pagina - 1) * itensPorPagina;

  // Consulta SQL para obter os dados do estoque com paginação e incluir o nome do produto
  const sql = `
    SELECT e.*, p.nome
    FROM estoque e
    JOIN produto p ON e.id_produto = p.id_produto
    ORDER BY e.id_estoque DESC
    LIMIT ${itensPorPagina} OFFSET ${offset}
  `;

  // Execute a consulta no banco de dados
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter dados do estoque do banco de dados:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter dados do estoque' });
    } else {
      res.json(result);
    }
  });
});

app.post('/api/salvarEstoque', (req, res) => {
  const { id_produto, itensEstoque } = req.body;

  // Para cada item no estoque
  Promise.all(
    itensEstoque.map((item) => {
      // Verificar se já existe um registro com as mesmas informações
      const selectQuery = `SELECT * FROM estoque WHERE id_produto = ? AND nome_tamanho = ? AND nome_cor = ?`;
      const selectValues = [id_produto, item.nome_tamanho, item.nome_cor];

      return new Promise((resolve) => {
        db.query(selectQuery, selectValues, (err, result) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          if (result && result.length > 0) {
            // Se já existe, atualizar a quantidade
            const updateQuery = `UPDATE estoque SET qtde = ? WHERE id_produto = ? AND nome_tamanho = ? AND nome_cor = ?`;
            const updateValues = [item.qtde, id_produto, item.nome_tamanho, item.nome_cor];

            db.query(updateQuery, updateValues, (err) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              resolve();
            });
          } else {
            // Se não existe, inserir um novo registro
            const insertQuery = 'INSERT INTO estoque (id_produto, nome_tamanho, nome_cor, qtde) VALUES (?, ?, ?, ?)';
            const insertValues = [id_produto, item.nome_tamanho, item.nome_cor, item.qtde];

            db.query(insertQuery, insertValues, (err) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              resolve();
            });
          }
        });
      });
    })
  )
    .then(() => {
      res.json({ message: 'Estoque salvo com sucesso!' });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

app.put('/atualizarEstoque/:IdEstoque', (req, res) => {
  const idEstoque = req.params.IdEstoque;
  const { novaQuantidade, tamanho, cor } = req.body;

  const sql = 'UPDATE estoque SET qtde = ?, nome_tamanho = ?, nome_cor = ? WHERE id_estoque = ?';

  db.query(sql, [novaQuantidade, tamanho, cor, idEstoque], (err) => {
    if (err) {
      console.error('Erro ao executar a consulta SQL:', err);
      res.status(500).send('Erro ao atualizar o estoque.');
      return;
    }

    console.log('Estoque atualizado com sucesso!');
    res.status(200).send('Estoque atualizado com sucesso.');
  });
});

app.delete('/excluirEstoque/:IdEstoque', (req, res) => {
  const idEstoque = req.params.IdEstoque;

  const sql = 'DELETE FROM estoque WHERE id_estoque = ?';

  db.query(sql, [idEstoque], (err) => {
    if (err) {
      console.error('Erro ao executar a consulta SQL:', err);
      res.status(500).send('Erro ao excluir o produto do estoque.');
      return;
    }

    console.log('Produto excluído do estoque com sucesso!');
    res.status(200).send('Produto excluído do estoque com sucesso.');
  });
});

app.get('/api/estoque/:id_produto', (req, res) => {
  const { id_produto } = req.params;

  const query = 'SELECT * FROM estoque WHERE id_produto = ?';

  db.query(query, [id_produto], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const estoqueData = {
      id_produto,
      itensEstoque: results,
    };

    res.json(estoqueData);
  });
});

app.get('/getQtdeEstoque/:id_produto', (req, res) => {
  const { id_produto } = req.params;

  // Consulta SQL para obter a quantidade de estoque com base no id_produto
  const sql = `SELECT id_produto, qtde, nome_tamanho FROM estoque WHERE id_produto = ?`;

  db.query(sql, [id_produto], (error, results) => {
    if (error) {
      console.error('Erro ao executar a consulta SQL:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    } else {
      if (results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ error: 'Nenhum dado encontrado para o id_produto fornecido' });
      }
    }
  });
});

app.get('/obterPedidos', (req, res) => {
  const { pagina } = req.query;
  const itensPorPagina = 25;
  const offset = (pagina - 1) * itensPorPagina;

  // Consulta SQL para obter os dados dos pedidos com paginação
  const sql = `
    SELECT *
    FROM pedidos
    ORDER BY id DESC
    LIMIT ${itensPorPagina} OFFSET ${offset}
  `;

  // Execute a consulta no banco de dados
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter dados dos pedidos do banco de dados:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter dados dos pedidos' });
    } else {
      res.json(result);
    }
  });
});

app.put('/atualizarPedido/:idPedido', (req, res) => {
  const idPedido = req.params.idPedido;
  const { nomePedido, preco, novaQuantidade, data, status } = req.body;

  const sql = 'UPDATE pedidos SET nomePedido = ?, preco = ?, qtd = ?, data = ?, status = ? WHERE id = ?';

  db.query(sql, [nomePedido, preco, novaQuantidade, data, status, idPedido], (err) => {
    if (err) {
      console.error('Erro ao executar a consulta SQL:', err);
      res.status(500).send('Erro ao atualizar o pedido.');
      return;
    }

    console.log('Pedido atualizado com sucesso!');
    res.status(200).send('Pedido atualizado com sucesso.');
  });
});

app.get('/obterPedidosGraficos', (req, res) => {

  const sql = `
    SELECT *
    FROM pedidos
  `;

  // Execute a consulta no banco de dados
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter dados dos pedidos do banco de dados:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter dados dos pedidos' });
    } else {
      res.json(result);
    }
  });
});

app.get('/obterProdutos', (req, res) => {

  const sql = `
    SELECT *
    FROM produto
  `;

  // Execute a consulta no banco de dados
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter dados dos produtos do banco de dados:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter dados dos produtos' });
    } else {
      res.json(result);
    }
  });
});

app.get('/obterEstoqueGraficos', (req, res) => {

  const sql = `
    SELECT *
    FROM estoque
  `;

  // Execute a consulta no banco de dados
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Erro ao obter dados dos produtos do banco de dados:', err);
      res.status(500).json({ success: false, message: 'Erro ao obter dados dos produtos' });
    } else {
      res.json(result);
    }
  });
});

app.put('/sizeQuantity', (req, res) => {
  console.log("Chegou na rota /sizeQuantity");

  const size = req.body.Size;
  const quantity = req.body.Quantity;
  const idproduto = req.body.IdProduto;

  console.log("Dados recebidos - Size:", size, "Quantity:", quantity, "IdProduto:", idproduto);

  store.set('Vsize', { size });
  store.set('Vquant', { quantity });
  store.set('Vidprod', { idproduto });
});

//TESTE CRUD JSON
/* app.get('/getSizeQuantity', (req, res) => {
  let size = store.get('Vsize');
  let quant = store.get('Vquant');
  let idproduto = store.get('Vidprod');

  return res.send({ size, quant, idproduto });
}); 

app.post('/salvar-dados', async (req, res) => {
  try {
    const data = req.body;

    // Você pode personalizar o caminho e o nome do arquivo conforme necessário
    const filePath = path.join(__dirname, 'dados.json');

    // Lê os dados existentes no arquivo, se houver
    const existingData = await fs.readFile(filePath, 'utf-8');
    const parsedData = existingData ? JSON.parse(existingData) : [];

    // Adiciona os novos dados
    parsedData.push(data);

    // Salva os dados atualizados de volta no arquivo
    await fs.writeFile(filePath, JSON.stringify(parsedData, null, 2), 'utf-8');

    res.status(200).json({ message: 'Dados salvos com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar os dados:', error);
    res.status(500).json({ error: 'Erro ao salvar os dados.' });
  }
});

app.get('/obter-dados', async (req, res) => {
  try {
    // Caminho para o arquivo dados.json
    const filePath = path.join(__dirname, 'dados.json');

    // Lê os dados do arquivo
    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    res.json(jsonData);
  } catch (error) {
    console.error('Erro ao obter dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados.' });
  }
}); 

app.delete('/deletar-dado/:index', async (req, res) => {
  try {
    const index = parseInt(req.params.index, 10);
    const filePath = path.join(__dirname, 'dados.json');

    const data = await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(data);

    // Verifica se o índice está dentro dos limites
    if (index >= 0 && index < jsonData.length) {
      // Remove o item correspondente
      jsonData.splice(index, 1);

      // Salva os dados atualizados de volta no arquivo
      await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');

      res.json({ message: 'Dado deletado com sucesso!' });
    } else {
      res.status(400).json({ error: 'Índice inválido.' });
    }
  } catch (error) {
    console.error('Erro ao deletar dado:', error);
    res.status(500).json({ error: 'Erro ao deletar dado.' });
  }
});*/

app.put('/api/produtos/:id_produto', async (req, res) => {
  try {
    const { id_produto } = req.params;
    const selectedProductId = parseInt(id_produto, 10);

    // Consulta SQL para obter o produto pelo ID no banco de dados
    const sql = 'SELECT * FROM dataqtdesize WHERE productId = ?';
    const [rows] = await db.promise().query(sql, [selectedProductId]);

    if (rows.length > 0) {
      const selectedProduct = rows[0];
      res.json(selectedProduct);
    } else {
      res.status(404).json({ error: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao processar a requisição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.delete('/api/carrinho/:id_produto', async (req, res) => {
  try {
    const { id_produto } = req.params;
    const productIdToRemove = parseInt(id_produto, 10);

    // Consulta SQL para remover o item do carrinho pelo ID
    const sql = 'DELETE FROM dataqtdesize WHERE productId = ?';
    const [result] = await db.promise().query(sql, [productIdToRemove]);

    if (result.affectedRows > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Produto não encontrado no carrinho' });
    }
  } catch (error) {
    console.error('Erro ao remover o item do carrinho:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


app.delete('/api/carrinhoDeleteAll', async (req, res) => {
  try {
    // Executar uma consulta SQL para excluir todos os dados da tabela carrinho
    const sql = 'DELETE FROM dataqtdesize';
    await db.promise().query(sql);

    res.json({ success: true, message: 'Todos os dados do carrinho foram removidos.' });
  } catch (error) {
    console.error('Erro ao remover todos os dados do carrinho:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});


//PARA QUANDO O VALOR DO QUANTITY É ALTERADO, ELE SALVA NO BANCO
app.post('/dados-Qtde-Size', async (req, res) => {
  const { selectedQuantity, selectedProductId, selectedSize } = req.body;

  // Log das informações recebidas
  console.log('Informações recebidas:', {
    selectedQuantity,
    selectedProductId,
    selectedSize,
  });

  try {
    const { selectedQuantity, selectedProductId, selectedSize } = req.body;

    // Query SQL para inserção ou atualização
    const sql = `
      INSERT INTO dataqtdesize (productId, selectedSize, selectedQuantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
      selectedQuantity = VALUES(selectedQuantity)
    `;

    // Parâmetros para a consulta
    const values = [selectedProductId, selectedSize, selectedQuantity];

    // Executar a consulta
    db.query(sql, values);

    res.status(200).send('Operação realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao executar a consulta SQL:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

//PARA QUANDO A PAGINA ALTERAR O SIZE, ELE DEFINE O QTDE
app.get('/qtdesize-data/:size/:productId', async (req, res) => {
  const { size, productId } = req.params;

  try {
    // Leitura dos dados do banco de dados ou outra lógica necessária
    const sql = 'SELECT * FROM estoque WHERE nome_tamanho = ? AND id_produto = ?';
    const values = [size, productId];

    // Executar a consulta
    const [rows] = await db.promise().query(sql, values); // Use db.promise().query para obter uma Promise

    // Verifique se há dados
    if (rows.length > 0) {
      // Envie os dados encontrados como resposta
      res.json(rows);
    } else {
      console.log('Nenhum dado encontrado.');
      res.status(404).json({ message: 'Nenhum dado encontrado' });
    }
  } catch (error) {
    console.error('Erro ao ler dados do banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//PARA QUANDO A PAGINA INICIAR, ELE DEFINE O VALOR INICIAL DO QTDE
app.get('/qtdesize-data02/:selectedSize/:selectedProductId', async (req, res) => {
  const { selectedSize, selectedProductId } = req.params;

  try {
    // Consulta SQL para obter dados do banco de dados
    const sql = 'SELECT * FROM dataqtdesize WHERE selectedSize = ? AND productId = ?';
    const values = [selectedSize, selectedProductId];

    // Executar a consulta no banco de dados
    const [rows] = await db.promise().query(sql, values);

    if (rows.length > 0) {
      // Se houver dados correspondentes, envie-os como resposta
      res.json({ exactData: rows[0] });
    } else {
      // Se não houver dados correspondentes, envie uma resposta vazia
      res.json({ exactData: null });
    }
  } catch (error) {
    console.error('Erro ao ler dados do banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//PARA QUANDO O QUANTITY DO CARTPAGE FOR ALTERADO, ELE SALVO NO BANCO
app.post('/dados-Qtde-Size02', async (req, res) => {
  try {
    const { selectedQuantity, selectedProductId, selectedSize } = req.body;

    // Query SQL para inserção ou atualização
    const sql = `
      INSERT INTO dataQtdeSize (productId, selectedSize, selectedQuantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE
      selectedQuantity = VALUES(selectedQuantity)
    `;

    // Parâmetros para a consulta
    const values = [selectedProductId, selectedSize, selectedQuantity];

    // Executar a consulta
    db.query(sql, values);

    res.status(200).send('Operação realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao executar a consulta SQL:', error);
    res.status(500).send('Erro interno do servidor');
  }
});

//PARA QUANDO O CARTPAGE ALTERAR O SIZE, ELE DEFINE O QTDE
app.get('/qtdesize-data02/:size/:productId', async (req, res) => {
  const { newSize, idproduto } = req.params;

  try {
    // Leitura dos dados do banco de dados ou outra lógica necessária
    const sql = 'SELECT * FROM dataqtdesize WHERE selectedSize = ? AND productId = ?';
    const values = [newSize, idproduto];

    // Executar a consulta
    const [rows] = await db.promise().query(sql, values);

    // Envie os dados encontrados como resposta
    const responseData = Array.isArray(rows) ? rows : [rows]; // Envolva os dados em um array
    res.json(responseData);
  } catch (error) {
    console.error('Erro ao ler dados do banco de dados:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

//PARA QUANDO O CARTPAGE ALTERAR O SIZE, ELE DEFINE O QTDE
app.post('/prodDupli/:multipleSizeProductIds', async (req, res) => {
  try {
    const multipleSizeProductIds = req.params.multipleSizeProductIds.split(',');

    if (!multipleSizeProductIds || !Array.isArray(multipleSizeProductIds)) {
      return res.status(400).json({ error: 'Parâmetros inválidos' });
    }

    const results = {};

    for (const productId of multipleSizeProductIds) {
      const sql = 'SELECT * FROM dataqtdesize WHERE productId = ?';
      const values = [productId];

      // Executar a consulta
      const [rows] = await db.promise().query(sql, values);
      results[productId] = rows.map(({ selectedSize, selectedQuantity }) => ({
        selectedSize,
        selectedQuantity,
      }));
    }

    res.json(results);
  } catch (error) {
    console.error('Erro ao processar a solicitação:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/getTotalCartValue', async (req, res) => {
  try {
    const sql = 'SELECT * FROM dataqtdesize';

    const [rows] = await db.promise().query(sql);

    // Envie os dados como resposta
    res.json({ dataqtdesize: rows });
  } catch (error) {
    console.error('Erro ao obter dados do banco de dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
  }
});


app.get('/qtdeCI/:id_produto', async (req, res) => {
  const { id_produto } = req.params;

  try {
    const sql = 'SELECT selectedQuantity FROM dataqtdesize WHERE productId = ?';
    const [rows] = await db.promise().query(sql, [id_produto]);

    // Extrai os valores de selectedQuantity dos resultados
    const selectedQuantities = rows.map(row => row.selectedQuantity);

    // Soma os valores de selectedQuantity
    const totalQuantity = selectedQuantities.reduce((acc, cur) => acc + cur, 0);

    res.json({ totalQuantity });
  } catch (error) {
    console.error('Erro ao obter dados do banco de dados:', error);
    res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
  }
});

app.get('/getPedidosExtras/:idPed', (req, res) => {
  const { idPed } = req.params;

  const query = 'SELECT detalhe_pedidos FROM pedidos WHERE id = ?';
  const values = [idPed];

  db.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send('Erro no servidor');
      return;
    }

    // Se houver resultado da consulta
    if (result && result.length > 0) {
      // Convertendo a string JSON para um objeto JavaScript
      const data = JSON.parse(result[0].detalhe_pedidos);

      // Enviando os dados como resposta
      res.json(data);
    } else {
      res.status(404).send('Nenhum pedido encontrado');
    }
  });
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001")
});