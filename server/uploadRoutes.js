const express = require('express');
const multer = require('multer');
const fs = require('fs').promises;
const mysql = require('mysql2/promise');
const path = require('path'); // Importe o módulo 'path'

const router = express.Router();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbImg",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const query = pool.query.bind(pool);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = './uploads';
    fs.mkdir(uploadPath, { recursive: true })
      .then(() => cb(null, uploadPath))
      .catch((err) => cb(err));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.fieldname}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage }).single('imagem');

router.post('/', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Erro no upload:', err);
      return res.status(500).json({ success: false, message: 'Erro no upload', error: err.message });
    }

    try {
      // Desestruture o objeto req.file
      const { filename: imagem } = req.file;

      // Desestruture os dados do formulário do corpo da solicitação
      const { nome, valor, qtd, descricao, nome_cor, nome_tamanho, nome_marca } = req.body;

      // Corrija o SQL para inserir os dados corretos
      await query('INSERT INTO produto (nome, valor, qtd, descricao, nome_cor, nome_tamanho, nome_marca, imagem) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, valor, qtd, descricao, nome_cor, nome_tamanho, nome_marca, imagem]);    

      console.log('Produto salvo no banco de dados:', nome);
      res.json({ success: true, message: 'Produto enviado e salvo com sucesso' });
    } catch (error) {
      console.error('Erro ao receber e salvar produto:', error);
      res.status(500).json({ success: false, message: 'Erro ao receber e salvar produto', error: error.message });
    }
  });
});

module.exports = router;
