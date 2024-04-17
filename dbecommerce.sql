-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 17/04/2024 às 18:38
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dbecommerce`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `adm`
--

CREATE TABLE `adm` (
  `id_adm` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `adm`
--

INSERT INTO `adm` (`id_adm`, `nome`, `email`, `senha`) VALUES
(1, 'adm', 'adm@g.com', 'adm');

-- --------------------------------------------------------

--
-- Estrutura para tabela `contatos`
--

CREATE TABLE `contatos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nome_completo` varchar(255) NOT NULL,
  `cpf` varchar(20) NOT NULL,
  `idade` varchar(3) NOT NULL,
  `telefone` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `contatos`
--

INSERT INTO `contatos` (`id`, `id_usuario`, `nome_completo`, `cpf`, `idade`, `telefone`) VALUES
(1, 36, 'luisin dos gay', '32321321321', '21', '3232323233'),
(2, 39, 'yago guedes paulo', '32165487699', '206', '181234-56767'),
(3, 40, 'joao carlhos gabriel', '34509823456', '21', '3244324324'),
(4, 41, 'Xicao da silva freitas', '12345689041', '37', '18996542345'),
(5, 42, 'xandao xandoso', '12345678901', '33', '3244324324'),
(6, 43, 'Joelmir da silva', '45354345', '23', '18996542345'),
(7, 44, 'Gustavo gabriel', '4234234', '21', '43242343443');

-- --------------------------------------------------------

--
-- Estrutura para tabela `cor`
--

CREATE TABLE `cor` (
  `id_cor` int(11) NOT NULL,
  `nome_cor` varchar(50) NOT NULL,
  `ativa` tinyint(1) NOT NULL DEFAULT 1,
  `nome` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `cor`
--

INSERT INTO `cor` (`id_cor`, `nome_cor`, `ativa`, `nome`) VALUES
(14, 'Vermelho', 1, 'Vermelho'),
(15, 'Laranja', 1, 'Laranja'),
(16, 'Amarelo', 1, 'Amarelo'),
(17, 'Verde', 1, 'Verde'),
(18, 'Azul', 1, 'Azul'),
(19, 'Roxo', 1, 'Roxo'),
(20, 'Rosa', 1, 'Rosa'),
(21, 'Marrom', 1, 'Marrom'),
(22, 'Cinza', 1, 'Cinza'),
(23, 'Preto', 1, 'Preto'),
(24, 'Branco', 1, 'Branco');

-- --------------------------------------------------------

--
-- Estrutura para tabela `dataqtdesize`
--

CREATE TABLE `dataqtdesize` (
  `id` int(11) NOT NULL,
  `productId` int(11) DEFAULT NULL,
  `selectedSize` int(11) DEFAULT NULL,
  `selectedQuantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `dataqtdesize`
--

INSERT INTO `dataqtdesize` (`id`, `productId`, `selectedSize`, `selectedQuantity`) VALUES
(1582, 85, 42, 3),
(1584, 85, 32, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `enderecos`
--

CREATE TABLE `enderecos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `rua` varchar(100) NOT NULL,
  `numero` int(10) NOT NULL,
  `bairro` varchar(100) NOT NULL,
  `complemento` varchar(100) NOT NULL,
  `cidade` varchar(100) NOT NULL,
  `uf` varchar(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `enderecos`
--

INSERT INTO `enderecos` (`id`, `id_usuario`, `rua`, `numero`, `bairro`, `complemento`, `cidade`, `uf`) VALUES
(2, 36, 'R dos Desmamatato', 23, 'jonas', 'casa', 'mamatolandia', 'AC'),
(5, 39, 'rua dos Aguas', 56, 'centro', 'ap', 'birigui', 'SP'),
(6, 40, 'R dos Desmamatato', 23, 'jonas', 'casar', 'mamatolandia', 'SP'),
(7, 41, 'R dos tcc', 45, 'centro', 'Casa', 'Birigui', 'SP'),
(8, 42, 'Rua do tcc', 23, 'centro', 'Casa', 'araçatuba', 'SP'),
(9, 43, 'R dos Desmamatato', 23, '432654', 'Casagu', 'birigui', 'SP'),
(10, 44, 'R dos Desmamatato', 23, 'jonas', 'casa', 'birigui', 'SP');

-- --------------------------------------------------------

--
-- Estrutura para tabela `estoque`
--

CREATE TABLE `estoque` (
  `id_estoque` int(11) NOT NULL,
  `qtde` int(11) NOT NULL,
  `id_produto` int(11) DEFAULT NULL,
  `nome_tamanho` varchar(50) DEFAULT NULL,
  `nome_cor` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `estoque`
--

INSERT INTO `estoque` (`id_estoque`, `qtde`, `id_produto`, `nome_tamanho`, `nome_cor`) VALUES
(132, 0, 75, '32', 'Vermelho'),
(133, 63, 75, '34', 'Vermelho'),
(134, 100, 75, '36', 'Vermelho'),
(135, 82, 75, '38', 'Vermelho'),
(136, 40, 75, '40', 'Vermelho'),
(137, 55, 75, '42', 'Vermelho'),
(138, 21, 75, '44', 'Vermelho'),
(139, 294, 76, '32', 'Roxo'),
(140, 46, 76, '34', 'Roxo'),
(141, 115, 76, '36', 'Roxo'),
(142, 68, 76, '38', 'Roxo'),
(143, 33, 76, '40', 'Roxo'),
(144, 27, 76, '42', 'Roxo'),
(145, 41, 76, '44', 'Roxo'),
(146, 19, 76, '45', 'Roxo'),
(147, 33, 77, '32', 'Branco'),
(148, 69, 77, '34', 'Branco'),
(149, 12, 77, '36', 'Branco'),
(150, 58, 77, '38', 'Branco'),
(151, 44, 77, '40', 'Branco'),
(152, 26, 77, '42', 'Branco'),
(153, 39, 77, '44', 'Branco'),
(154, 17, 77, '45', 'Branco'),
(155, 8, 78, '32', 'Branco'),
(156, 92, 78, '34', 'Branco'),
(157, 121, 78, '36', 'Branco'),
(158, 41, 78, '38', 'Branco'),
(159, 52, 78, '40', 'Branco'),
(160, 37, 78, '42', 'Branco'),
(161, 51, 78, '44', 'Branco'),
(162, 23, 78, '45', 'Branco'),
(163, 23, 79, '32', 'Marrom'),
(164, 77, 79, '34', 'Marrom'),
(165, 53, 79, '36', 'Marrom'),
(166, 112, 79, '38', 'Marrom'),
(167, 29, 79, '40', 'Marrom'),
(168, 62, 79, '42', 'Marrom'),
(169, 45, 79, '44', 'Marrom'),
(170, 18, 79, '45', 'Marrom'),
(171, 1, 80, '32', 'Branco'),
(172, 88, 80, '34', 'Branco'),
(173, 40, 80, '36', 'Branco'),
(174, 76, 80, '38', 'Branco'),
(175, 33, 80, '40', 'Branco'),
(176, 27, 80, '42', 'Branco'),
(177, 14, 80, '44', 'Branco'),
(178, 9, 80, '45', 'Branco'),
(179, 34, 81, '40', 'Preto'),
(180, 17, 81, '42', 'Preto'),
(181, 22, 81, '44', 'Preto'),
(182, 9, 81, '45', 'Preto'),
(183, 37, 82, '32', 'Azul'),
(184, 59, 82, '34', 'Azul'),
(185, 22, 82, '36', 'Azul'),
(186, 98, 82, '38', 'Azul'),
(187, 41, 82, '40', 'Azul'),
(188, 64, 82, '42', 'Azul'),
(189, 28, 82, '44', 'Azul'),
(190, 13, 82, '45', 'Azul'),
(191, 14, 83, '32', 'Laranja'),
(192, 96, 83, '34', 'Laranja'),
(193, 73, 83, '38', 'Laranja'),
(194, 49, 83, '40', 'Laranja'),
(195, 25, 83, '42', 'Laranja'),
(196, 37, 83, '44', 'Laranja'),
(197, 18, 83, '45', 'Laranja'),
(198, 44, 84, '32', 'Verde'),
(199, 68, 84, '34', 'Verde'),
(200, 31, 84, '36', 'Verde'),
(201, 53, 84, '38', 'Verde'),
(202, 29, 84, '40', 'Verde'),
(203, 17, 84, '42', 'Verde'),
(204, 22, 84, '44', 'Verde'),
(205, 11, 84, '45', 'Verde'),
(206, 18, 85, '32', 'Rosa'),
(207, 104, 85, '34', 'Rosa'),
(208, 89, 85, '38', 'Rosa'),
(209, 0, 85, '40', 'Rosa'),
(210, 27, 85, '42', 'Rosa'),
(211, 33, 85, '44', 'Rosa'),
(212, 15, 85, '45', 'Rosa'),
(213, 49, 86, '32', 'Marrom'),
(214, 82, 86, '34', 'Marrom'),
(215, 76, 86, '38', 'Marrom'),
(216, 38, 86, '40', 'Marrom'),
(217, 21, 86, '42', 'Marrom'),
(218, 29, 86, '44', 'Marrom'),
(219, 14, 86, '45', 'Marrom'),
(223, 40, 96, '33', 'Azul');

--
-- Acionadores `estoque`
--
DELIMITER $$
CREATE TRIGGER `after_delete_estoque` AFTER DELETE ON `estoque` FOR EACH ROW BEGIN
    -- Inserir dados na tabela movimentacoes
    INSERT INTO movimentacoes (data_alteracao, tipo_alteracao, quantidade_selecionada, nome_produto, estoque_atual, cor_produto, tamanho_produto, id_produto)
    SELECT NOW(), 'Excluido', ABS(OLD.qtde), p.nome, OLD.qtde, OLD.nome_cor, OLD.nome_tamanho, OLD.id_produto
    FROM produto p
    WHERE p.id_produto = OLD.id_produto;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_insert_estoque` AFTER INSERT ON `estoque` FOR EACH ROW BEGIN
    -- Inserir dados na tabela movimentacoes
    INSERT INTO movimentacoes (data_alteracao, tipo_alteracao, quantidade_selecionada, nome_produto, estoque_atual, cor_produto, tamanho_produto, id_produto)
    SELECT NOW(), 'Adicionar', ABS(NEW.qtde), p.nome, NEW.qtde, NEW.nome_cor, NEW.nome_tamanho, NEW.id_produto
    FROM produto p
    WHERE p.id_produto = NEW.id_produto;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_update_estoque` AFTER UPDATE ON `estoque` FOR EACH ROW BEGIN
    DECLARE tipo_alteracao VARCHAR(255);

    -- Determinar se a atualização é uma adição ou remoção de estoque
    SET tipo_alteracao = CASE
        WHEN NEW.qtde > OLD.qtde THEN 'Adicionar'
        WHEN NEW.qtde < OLD.qtde THEN 'Remover'
        ELSE 'Editar'
    END;

    -- Inserir dados na tabela movimentacoes
    INSERT INTO movimentacoes (data_alteracao, tipo_alteracao, quantidade_selecionada, nome_produto, estoque_atual, cor_produto, tamanho_produto, id_produto)
    SELECT NOW(), tipo_alteracao, ABS(NEW.qtde - OLD.qtde), p.nome, NEW.qtde, NEW.nome_cor, NEW.nome_tamanho, NEW.id_produto
    FROM produto p
    WHERE p.id_produto = NEW.id_produto;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_estoque` BEFORE INSERT ON `estoque` FOR EACH ROW BEGIN
    DECLARE produto_existente INT;
    DECLARE tamanho_existente INT;
    DECLARE cor_existente INT;

    -- Verificar se o id_produto existe na tabela produto
    SELECT COUNT(*) INTO produto_existente
    FROM produto
    WHERE id_produto = NEW.id_produto;

    -- Verificar se o nome_tamanho existe na tabela tamanho
    SELECT COUNT(*) INTO tamanho_existente
    FROM tamanho
    WHERE nome_tamanho = NEW.nome_tamanho;

    -- Verificar se o nome_cor existe na tabela cor
    SELECT COUNT(*) INTO cor_existente
    FROM cor
    WHERE nome_cor = NEW.nome_cor;

    -- Se produto, tamanho ou cor não existir, abortar a inserção
    IF produto_existente = 0 OR tamanho_existente = 0 OR cor_existente = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'O produto, tamanho ou cor especificado não existe na tabela correspondente.';
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `imagens`
--

CREATE TABLE `imagens` (
  `id_imagem` int(11) NOT NULL,
  `id_produtoM` int(11) DEFAULT NULL,
  `nome_imagemM` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `imagens`
--

INSERT INTO `imagens` (`id_imagem`, `id_produtoM`, `nome_imagemM`) VALUES
(2, NULL, 'image-1704422714347-171689940.jpg'),
(16, 75, 'image-1705086396897-474130.png'),
(17, 76, 'image-1705086513929-106225260.png'),
(18, 77, 'image-1705086686584-764464360.png'),
(19, 78, 'image-1705086762712-508218331.png'),
(20, 79, 'image-1705086837096-832032392.png'),
(21, 80, 'image-1705086902066-784912006.png'),
(22, 81, 'image-1705087022711-16949409.png'),
(23, 82, 'image-1705087146818-423925594.png'),
(24, 83, 'image-1705087195358-744144182.png'),
(25, 84, 'image-1705088018483-399304474.png'),
(26, 85, 'image-1705088087318-269733145.png'),
(27, 86, 'image-1705088160982-878482314.png'),
(37, 96, 'image-1712343023870-771416579.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `marca`
--

CREATE TABLE `marca` (
  `id_marca` int(11) NOT NULL,
  `nome_marca` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `marca`
--

INSERT INTO `marca` (`id_marca`, `nome_marca`) VALUES
(1, 'Nike'),
(2, 'Adidas'),
(3, 'Pulma');

-- --------------------------------------------------------

--
-- Estrutura para tabela `movimentacoes`
--

CREATE TABLE `movimentacoes` (
  `id_movimento` int(11) NOT NULL,
  `data_alteracao` datetime NOT NULL,
  `tipo_alteracao` enum('Adicionar','Remover','Excluido') NOT NULL,
  `quantidade_selecionada` int(11) NOT NULL,
  `nome_produto` varchar(255) NOT NULL,
  `id_produto` int(11) DEFAULT NULL,
  `estoque_atual` int(11) NOT NULL,
  `cor_produto` varchar(50) NOT NULL,
  `tamanho_produto` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `movimentacoes`
--

INSERT INTO `movimentacoes` (`id_movimento`, `data_alteracao`, `tipo_alteracao`, `quantidade_selecionada`, `nome_produto`, `id_produto`, `estoque_atual`, `cor_produto`, `tamanho_produto`) VALUES
(1, '2023-12-21 20:16:04', 'Adicionar', 6, 'Nike Jordan', NULL, 17, 'laranja', '40'),
(2, '2023-12-21 20:18:18', 'Adicionar', 300, 'jordan Pirate', NULL, 300, 'verde', '39'),
(3, '2023-12-21 20:19:28', 'Adicionar', -48, 'Tênis Novo', NULL, 2, 'verde', '40'),
(4, '2023-12-21 20:20:36', 'Adicionar', 98, 'Tênis Novo', NULL, 100, 'verde', '40'),
(5, '2023-12-21 20:23:59', 'Remover', 2, 'Tênis Novo0', NULL, 48, 'verde', '40'),
(6, '2023-12-22 01:48:35', '', 0, '', NULL, 0, 'cor_padrão', 'tamanho_pa'),
(7, '2023-12-22 01:48:35', 'Adicionar', 100, 'Tênis Novo0\r\n', NULL, 0, 'cor_padrão', 'tamanho_pa'),
(8, '2023-12-21 21:53:15', 'Adicionar', 100, 'Tênis Novo0\r\n', NULL, 0, 'cor_padrão', 'tamanho_pa'),
(9, '2023-12-21 21:54:47', 'Adicionar', 100, 'Tênis Novo0\r\n', NULL, 0, 'cor_padrão', 'tamanho_pa'),
(10, '2023-12-22 11:06:45', 'Adicionar', 2, 'Tênis Novo0', 33, 50, 'verde', '40'),
(11, '2023-12-22 11:09:08', 'Adicionar', 0, 'Tenis jao', 39, 300, 'Verde', '40'),
(12, '2023-12-22 11:26:59', 'Remover', 145, 'Tenis jao', 39, 155, 'Verde', '40'),
(26, '2023-12-27 23:11:30', 'Adicionar', 0, 'joao', 51, 12000, 'Verde', '42'),
(27, '2023-12-27 23:12:44', 'Remover', 0, 'tenis joao', 51, 12000, 'Verde', '42'),
(28, '2023-12-27 23:14:25', 'Adicionar', 0, 'Tenis Dri', 52, 1200, 'Verde', '42'),
(29, '2023-12-27 23:23:46', 'Adicionar', 0, 'ttbeg', 53, 3, 'Verde', '42'),
(30, '2023-12-27 23:29:45', 'Adicionar', 0, 'Tenis GU', 54, 11, 'Amarelo', '43'),
(31, '2023-12-28 02:03:30', 'Adicionar', 0, 'Tenis Gusta', 55, 123, 'Verde', '43'),
(32, '2023-12-28 16:17:02', 'Remover', 3, 'ttbeg', 53, 0, 'Verde', '42'),
(33, '2023-12-28 16:37:53', 'Adicionar', 0, 'teste ff', 56, 21000, 'Verde', '39'),
(34, '2023-12-28 16:49:21', 'Remover', 21000, 'teste ff', 56, 0, 'Verde', '39'),
(35, '2023-12-28 16:49:26', 'Remover', 100, 'Tênis Novo', 35, 0, 'verde', '40'),
(36, '2023-12-28 16:49:30', 'Remover', 50, 'Tênis Novo0', 33, 0, 'verde', '40'),
(37, '2023-12-28 16:53:49', 'Adicionar', 0, 'teste ff', 57, 21000, 'Verde', '39'),
(38, '2023-12-28 16:54:02', 'Remover', 21000, 'teste ff', 57, 0, 'Verde', '39'),
(39, '2023-12-30 01:50:34', 'Remover', 12000, 'tenis joao', 51, 0, 'Verde', '42'),
(40, '2023-12-30 01:50:51', 'Remover', 155, 'Tenis jao', 39, 0, 'Verde', '40'),
(41, '2023-12-30 01:52:11', 'Remover', 1080, 'Tenis Dri', 52, 120, 'Verde', '42'),
(42, '2023-12-30 01:53:39', 'Remover', 110, 'Tenis Gusta', 55, 13, 'Verde', '43'),
(43, '2023-12-30 02:25:04', 'Remover', 0, 'Tenis Dri', 52, 120, 'Verde', '42'),
(44, '2023-12-30 02:27:40', 'Remover', 0, 'Tenis Dri', 52, 120, 'Verde', '42'),
(45, '2024-01-02 11:01:34', 'Adicionar', 0, 'Tenis ss Edt', 58, 130, 'Branco', '42'),
(46, '2024-01-02 11:04:11', 'Remover', 0, 'Tenis ss Edt', 58, 130, 'Branco', '42'),
(47, '2024-01-02 11:04:50', 'Remover', 0, 'Tenis ss Edt', 58, 130, 'Branco', '42'),
(48, '2024-01-02 11:05:12', 'Remover', 0, 'Tenis ss Edt', 58, 130, 'Branco', '42'),
(49, '2024-01-02 11:07:11', 'Remover', 130, 'Tenis ss Edt', 58, 0, 'Branco', '42'),
(50, '2024-01-02 11:07:13', 'Remover', 13, 'Tenis Gusta', 55, 0, 'Verde', '43'),
(51, '2024-01-02 11:07:16', 'Remover', 11, 'Tenis GU', 54, 0, 'Amarelo', '43'),
(52, '2024-01-02 11:07:18', 'Remover', 120, 'Tenis Dri', 52, 0, 'Verde', '42'),
(53, '2024-01-02 12:47:24', 'Adicionar', 0, 'chaves del 8', 59, 12, 'Verde', '42'),
(54, '2024-01-03 04:09:01', 'Adicionar', 0, 'joao', 60, 3334, 'Branco', '42'),
(55, '2024-01-03 14:44:47', 'Remover', 0, 'joao', 60, 3334, 'Branco', '42'),
(56, '2024-01-04 02:49:38', 'Adicionar', 0, 'tester 15', 61, 48, 'Laranja', '40'),
(57, '2024-01-05 00:00:10', 'Adicionar', 0, 'joaoJJJ', 62, 12000, 'Verde', '42'),
(58, '2024-01-05 00:06:24', 'Adicionar', 0, 'joaoJJ', 63, 21000, 'Branco', '39'),
(59, '2024-01-05 00:14:31', 'Adicionar', 0, 'joaoJ', 64, 21000, 'Branco', '42'),
(63, '2024-01-05 00:39:46', 'Adicionar', 0, 'joaoTT', 68, 12000, 'Verde', '42'),
(64, '2024-01-05 00:48:57', 'Adicionar', 0, 'jon4s5TT', 69, 21000, 'Verde', '42'),
(65, '2024-01-05 01:03:51', 'Remover', 17, 'Nike Jordan', 36, 0, 'laranja', '40'),
(66, '2024-01-05 01:03:53', 'Remover', 300, 'jordan Pirate', 37, 0, 'verde', '39'),
(67, '2024-01-05 01:07:45', 'Remover', 3334, 'joao', 60, 0, 'Branco', '42'),
(68, '2024-01-05 01:07:49', 'Remover', 12, 'chaves del 8', 59, 0, 'Verde', '42'),
(69, '2024-01-05 01:38:27', 'Adicionar', 0, 'joaoTTTT', 70, 12000, 'Verde', '42'),
(70, '2024-01-05 01:48:24', 'Remover', 21000, 'jon4s5TT', 69, 0, 'Verde', '42'),
(71, '2024-01-05 01:51:56', 'Remover', 21000, 'joaoJJ', 63, 0, 'Branco', '39'),
(72, '2024-01-05 01:54:47', 'Adicionar', 0, 'joaoTTTTT', 71, 21000, 'Branco', '42'),
(73, '2024-01-05 01:56:12', 'Remover', 48, 'tester 15', 61, 0, 'Laranja', '40'),
(74, '2024-01-05 02:44:51', 'Remover', 0, 'joaoT1', 70, 12000, 'Verde', '42'),
(75, '2024-01-05 02:45:28', 'Remover', 0, 'joaoTT', 68, 12000, 'Verde', '42'),
(76, '2024-01-05 03:04:43', 'Remover', 0, 'joaoT1', 70, 12000, 'Verde', '42'),
(77, '2024-01-05 03:08:38', 'Remover', 12000, 'joaoTT', 68, 0, 'Verde', '42'),
(78, '2024-01-05 03:31:06', 'Adicionar', 0, 'joaoT66', 72, 1200, 'Verde', '42'),
(79, '2024-01-05 03:40:25', 'Remover', 1200, 'joaoT66', 72, 0, 'Verde', '42'),
(80, '2024-01-05 04:43:04', 'Adicionar', 0, 'Tenis ss Edt', 73, 21000, 'Preto', '42'),
(81, '2024-01-05 05:04:47', 'Remover', 0, 'joaoTTTTT', 71, 21000, 'Branco', '42'),
(82, '2024-01-05 05:07:17', 'Remover', 0, 'joaoTTTTT', 71, 21000, 'Branco', '42'),
(83, '2024-01-05 05:19:10', 'Remover', 0, 'joaoTTTTT', 71, 21000, 'Branco', '42'),
(84, '2024-01-05 05:19:20', 'Remover', 0, 'joaoTTTTT', 71, 21000, 'Branco', '41'),
(85, '2024-01-05 05:19:41', 'Remover', 20790, 'joaoTT ss', 71, 210, 'Branco', '41'),
(86, '2024-01-05 05:22:03', 'Remover', 0, 'joao ss', 71, 210, 'Branco', '41'),
(87, '2024-01-05 05:27:16', 'Remover', 0, 'joaoT1', 70, 12000, 'Verde', '42'),
(88, '2024-01-05 05:27:24', 'Remover', 0, 'joao ss', 71, 210, 'Branco', '41'),
(89, '2024-01-05 05:35:50', 'Remover', 0, 'joao ss', 71, 210, 'Branco', '41'),
(90, '2024-01-05 05:35:50', 'Remover', 0, 'joao ss', 71, 210, 'Branco', '41'),
(91, '2024-01-05 05:36:08', 'Remover', 0, 'bat imagem', 71, 210, 'Branco', '41'),
(92, '2024-01-05 05:38:38', 'Remover', 0, 'Tenis ss Edt', 73, 21000, 'Preto', '42'),
(93, '2024-01-05 05:38:38', 'Remover', 0, 'Tenis ss Edt', 73, 21000, 'Preto', '42'),
(94, '2024-01-05 05:39:39', 'Adicionar', 0, 'btc510 Fg', 74, 13, 'Laranja', '42'),
(95, '2024-01-05 05:46:18', 'Remover', 0, 'joaoT1', 70, 12000, 'Verde', '42'),
(96, '2024-01-05 05:46:18', 'Remover', 0, 'joaoT1', 70, 12000, 'Verde', '42'),
(97, '2024-01-05 06:21:49', 'Remover', 11994, 'joaoJJJ', 62, 6, 'Verde', '42'),
(98, '2024-01-05 06:21:49', 'Remover', 0, 'joaoJJJ', 62, 6, 'Verde', '42'),
(99, '2024-01-05 08:36:13', 'Remover', 0, 'btc510 Fg', 74, 13, 'Laranja', '42'),
(100, '2024-01-05 08:36:13', 'Remover', 0, 'btc510 Fg', 74, 13, 'Laranja', '42'),
(101, '2024-01-05 21:48:17', 'Remover', 20988, 'Tenis ss Edt', 73, 12, 'Preto', '42'),
(102, '2024-01-05 21:54:38', '', 0, 'Tenis ss Edt', 73, 12, 'Preto', '42'),
(103, '2024-01-05 21:54:38', '', 0, 'Tenis ss Edt', 73, 12, 'Preto', '42'),
(104, '2024-01-05 21:55:22', '', 0, 'Tenis ss Edt', 73, 12, 'Preto', '42'),
(105, '2024-01-05 21:55:22', '', 0, 'Tenis ss Edt', 73, 12, 'Preto', '42'),
(106, '2024-01-05 21:56:09', 'Adicionar', 5, 'Tenis ss Edt', 73, 17, 'Preto', '42'),
(107, '2024-01-05 22:01:40', 'Excluido', 17, 'Tenis ss Edt', 73, 0, 'Preto', '42'),
(108, '2024-01-05 22:02:04', 'Excluido', 13, 'btc510 Fg', 74, 0, 'Laranja', '42'),
(109, '2024-01-12 16:06:36', 'Adicionar', 0, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 110, 'Vermelho', '42'),
(110, '2024-01-12 16:08:33', 'Adicionar', 0, 'TÊNIS CAMPUS 00S', 76, 78, 'Roxo', '39'),
(111, '2024-01-12 16:08:43', 'Excluido', 210, 'bat Item', 71, 0, 'Branco', '41'),
(112, '2024-01-12 16:08:45', 'Excluido', 12000, 'joaoT1', 70, 0, 'Verde', '42'),
(113, '2024-01-12 16:08:46', 'Excluido', 21000, 'joaoJ', 64, 0, 'Branco', '42'),
(114, '2024-01-12 16:08:53', 'Excluido', 6, 'joaoJJJ', 62, 0, 'Verde', '42'),
(115, '2024-01-12 16:11:26', 'Adicionar', 0, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 120, 'Branco', '41'),
(116, '2024-01-12 16:12:42', 'Adicionar', 0, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 45, 'Branco', '38'),
(117, '2024-01-12 16:13:57', 'Adicionar', 0, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 101, 'Marrom', '42'),
(118, '2024-01-12 16:15:02', 'Adicionar', 0, 'TÊNIS FORUM 84 HIGH', 80, 32, 'Branco', '41'),
(119, '2024-01-12 16:17:02', 'Adicionar', 0, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 46, 'Preto', '43'),
(120, '2024-01-12 16:19:06', 'Adicionar', 0, 'TÊNIS DISC BLAZE SNAKE', 82, 76, 'Azul', '40'),
(121, '2024-01-12 16:19:55', 'Adicionar', 0, 'CHUTEIRA X SPEEDPORTAL.3 FUTSAL', 83, 45, 'Laranja', '41'),
(122, '2024-01-12 16:33:38', 'Adicionar', 0, 'AIR FORCE 1 MID X OFF-WHITE', 84, 110, 'Verde', '43'),
(123, '2024-01-12 16:34:47', 'Adicionar', 0, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 178, 'Rosa', '39'),
(124, '2024-01-12 16:36:00', 'Adicionar', 0, 'CHINELO ADILETTE 22', 86, 390, 'Marrom', '40'),
(125, '2024-01-13 03:33:09', 'Remover', 169, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 9, 'Rosa', '39'),
(126, '2024-01-13 03:33:45', 'Adicionar', 81, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 90, 'Rosa', '39'),
(127, '2024-01-17 00:41:26', 'Adicionar', 32, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 32, 'Roxo', '42'),
(128, '2024-01-17 00:41:26', 'Adicionar', 13, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 13, 'Roxo', '41'),
(129, '2024-01-17 00:42:22', 'Adicionar', 32, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 32, 'Roxo', '42'),
(130, '2024-01-17 00:42:22', 'Adicionar', 12, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 12, 'Roxo', '41'),
(131, '2024-01-17 01:06:33', 'Adicionar', 67, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 67, 'Branco', '45'),
(132, '2024-01-17 01:06:33', 'Adicionar', 73, 'TÊNIS CAMPUS 00S', 76, 73, 'Branco', '43'),
(133, '2024-01-17 01:06:33', 'Adicionar', 71, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 71, 'Branco', '33'),
(134, '2024-01-17 01:06:33', 'Adicionar', 52, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 52, 'Branco', '33'),
(135, '2024-01-17 01:06:33', 'Adicionar', 81, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 81, 'Branco', '44'),
(136, '2024-01-17 01:06:33', 'Adicionar', 84, 'TÊNIS FORUM 84 HIGH', 80, 84, 'Branco', '41'),
(137, '2024-01-17 01:06:33', 'Adicionar', 65, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 65, 'Branco', '35'),
(138, '2024-01-17 01:06:33', 'Adicionar', 21, 'TÊNIS DISC BLAZE SNAKE', 82, 21, 'Branco', '33'),
(139, '2024-01-17 01:06:33', 'Adicionar', 89, 'CHUTEIRA X SPEEDPORTAL.3 FUTSAL', 83, 89, 'Branco', '36'),
(140, '2024-01-17 01:06:33', 'Adicionar', 69, 'AIR FORCE 01 MID X OFF-WHITE', 84, 69, 'Branco', '39'),
(141, '2024-01-17 01:06:33', 'Adicionar', 52, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 52, 'Branco', '44'),
(142, '2024-01-17 01:06:33', 'Adicionar', 99, 'CHINELO ADILETTE 22', 86, 99, 'Branco', '36'),
(143, '2024-01-17 01:07:22', 'Adicionar', 100, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 100, 'Vermelho', '42'),
(144, '2024-01-17 01:07:22', 'Adicionar', 67, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 67, 'Vermelho', '45'),
(145, '2024-01-17 01:07:28', 'Adicionar', 73, 'TÊNIS CAMPUS 00S', 76, 73, 'Roxo', '43'),
(146, '2024-01-17 01:07:43', 'Adicionar', 81, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 81, 'Marrom', '44'),
(147, '2024-01-17 01:07:53', 'Adicionar', 65, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 65, 'Preto', '35'),
(148, '2024-01-17 01:07:59', 'Adicionar', 21, 'TÊNIS DISC BLAZE SNAKE', 82, 21, 'Azul', '33'),
(149, '2024-01-17 01:08:07', 'Adicionar', 89, 'CHUTEIRA X SPEEDPORTAL.3 FUTSAL', 83, 89, 'Laranja', '36'),
(150, '2024-01-17 01:08:12', 'Adicionar', 400, 'AIR FORCE 01 MID X OFF-WHITE', 84, 400, 'Verde', '40'),
(151, '2024-01-17 01:08:12', 'Adicionar', 69, 'AIR FORCE 01 MID X OFF-WHITE', 84, 69, 'Verde', '39'),
(152, '2024-01-17 01:08:18', 'Adicionar', 27, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 27, 'Roxo', '42'),
(153, '2024-01-17 01:08:18', 'Adicionar', 13, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 13, 'Roxo', '41'),
(154, '2024-01-17 01:08:18', 'Adicionar', 52, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 52, 'Roxo', '44'),
(155, '2024-01-17 01:08:23', 'Adicionar', 99, 'CHINELO ADILETTE 22', 86, 99, 'Marrom', '36'),
(156, '2024-01-17 01:59:32', 'Adicionar', 31, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 31, 'Verde', '32'),
(157, '2024-01-17 04:12:14', 'Adicionar', 37, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 37, 'Vermelho', '32'),
(158, '2024-01-17 04:28:55', 'Remover', 10, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 27, 'Vermelho', '32'),
(159, '2024-01-17 04:31:22', 'Excluido', 27, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 27, 'Roxo', '42'),
(160, '2024-01-19 17:10:10', '', 0, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 21, 'Branco', '33'),
(161, '2024-02-08 17:58:23', 'Remover', 391, 'AIR FORCE 01 MID X OFF-WHITE', 84, 9, 'Verde', '40'),
(162, '2024-02-08 17:58:59', 'Adicionar', 417, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 517, 'Branco', '42'),
(163, '2024-02-21 15:08:07', 'Adicionar', 37, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 37, 'Vermelho', '33'),
(164, '2024-03-11 18:54:05', 'Remover', 2, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 41, 'Branco', '42'),
(165, '2024-03-12 16:54:20', 'Remover', 2, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 39, 'Branco', '42'),
(166, '2024-03-12 16:54:20', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 68, 'Branco', '33'),
(167, '2024-03-12 16:54:20', 'Remover', 1, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 12, 'Roxo', '41'),
(168, '2024-03-13 07:50:11', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 65, 'Branco', '33'),
(169, '2024-03-13 07:50:11', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 7, 'Roxo', '41'),
(170, '2024-03-13 07:50:11', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 19, 'Branco', '33'),
(171, '2024-03-13 07:50:11', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, 6, 'Verde', '40'),
(172, '2024-03-13 07:50:11', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 35, 'Vermelho', '33'),
(173, '2024-03-13 07:54:18', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 62, 'Branco', '33'),
(174, '2024-03-13 07:54:18', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 33, 'Vermelho', '33'),
(175, '2024-03-13 07:54:18', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 17, 'Branco', '33'),
(176, '2024-03-13 07:54:18', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 2, 'Roxo', '41'),
(177, '2024-03-13 07:54:18', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, 3, 'Verde', '40'),
(178, '2024-03-13 08:00:49', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 59, 'Branco', '33'),
(179, '2024-03-13 08:00:49', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -3, 'Roxo', '41'),
(180, '2024-03-13 08:00:49', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, 0, 'Verde', '40'),
(181, '2024-03-13 08:00:49', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 15, 'Branco', '33'),
(182, '2024-03-13 08:00:49', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 31, 'Vermelho', '33'),
(183, '2024-03-13 08:11:58', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 56, 'Branco', '33'),
(184, '2024-03-13 08:11:58', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 29, 'Vermelho', '33'),
(185, '2024-03-13 08:11:58', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -3, 'Verde', '40'),
(186, '2024-03-13 08:11:58', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 13, 'Branco', '33'),
(187, '2024-03-13 08:11:58', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -8, 'Roxo', '41'),
(188, '2024-03-13 08:13:25', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -13, 'Roxo', '41'),
(189, '2024-03-13 08:13:25', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 53, 'Branco', '33'),
(190, '2024-03-13 08:13:25', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -6, 'Verde', '40'),
(191, '2024-03-13 08:13:25', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 11, 'Branco', '33'),
(192, '2024-03-13 08:13:25', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 27, 'Vermelho', '33'),
(193, '2024-03-13 08:14:31', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -9, 'Verde', '40'),
(194, '2024-03-13 08:14:31', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -18, 'Roxo', '41'),
(195, '2024-03-13 08:14:31', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 9, 'Branco', '33'),
(196, '2024-03-13 08:14:31', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 50, 'Branco', '33'),
(197, '2024-03-13 08:14:31', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 25, 'Vermelho', '33'),
(198, '2024-03-13 08:15:44', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -12, 'Verde', '40'),
(199, '2024-03-13 08:15:44', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 47, 'Branco', '33'),
(200, '2024-03-13 08:15:44', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -23, 'Roxo', '41'),
(201, '2024-03-13 08:15:44', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 7, 'Branco', '33'),
(202, '2024-03-13 08:15:44', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 23, 'Vermelho', '33'),
(203, '2024-03-13 08:19:20', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 44, 'Branco', '33'),
(204, '2024-03-13 08:19:20', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -15, 'Verde', '40'),
(205, '2024-03-13 08:19:20', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 21, 'Vermelho', '33'),
(206, '2024-03-13 08:19:20', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 5, 'Branco', '33'),
(207, '2024-03-13 08:19:20', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -28, 'Roxo', '41'),
(208, '2024-03-13 08:20:44', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 41, 'Branco', '33'),
(209, '2024-03-13 08:20:44', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -18, 'Verde', '40'),
(210, '2024-03-13 08:20:44', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -33, 'Roxo', '41'),
(211, '2024-03-13 08:20:44', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 19, 'Vermelho', '33'),
(212, '2024-03-13 08:20:44', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 3, 'Branco', '33'),
(213, '2024-03-13 08:21:54', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -21, 'Verde', '40'),
(214, '2024-03-13 08:21:54', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -38, 'Roxo', '41'),
(215, '2024-03-13 08:21:54', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 1, 'Branco', '33'),
(216, '2024-03-13 08:21:54', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 38, 'Branco', '33'),
(217, '2024-03-13 08:21:54', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 17, 'Vermelho', '33'),
(218, '2024-03-13 08:23:29', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 35, 'Branco', '33'),
(219, '2024-03-13 08:23:29', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -24, 'Verde', '40'),
(220, '2024-03-13 08:23:29', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 15, 'Vermelho', '33'),
(221, '2024-03-13 08:23:29', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -43, 'Roxo', '41'),
(222, '2024-03-13 08:23:29', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -1, 'Branco', '33'),
(223, '2024-03-13 08:24:08', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 32, 'Branco', '33'),
(224, '2024-03-13 08:24:08', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -48, 'Roxo', '41'),
(225, '2024-03-13 08:24:08', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 13, 'Vermelho', '33'),
(226, '2024-03-13 08:24:08', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -3, 'Branco', '33'),
(227, '2024-03-13 08:24:08', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -27, 'Verde', '40'),
(228, '2024-03-13 08:26:13', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 29, 'Branco', '33'),
(229, '2024-03-13 08:26:13', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -30, 'Verde', '40'),
(230, '2024-03-13 08:26:13', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 11, 'Vermelho', '33'),
(231, '2024-03-13 08:26:13', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -53, 'Roxo', '41'),
(232, '2024-03-13 08:26:13', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -5, 'Branco', '33'),
(233, '2024-03-13 08:47:36', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 26, 'Branco', '33'),
(234, '2024-03-13 08:47:36', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -33, 'Verde', '40'),
(235, '2024-03-13 08:47:36', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -58, 'Roxo', '41'),
(236, '2024-03-13 08:47:36', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 9, 'Vermelho', '33'),
(237, '2024-03-13 08:47:36', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -7, 'Branco', '33'),
(238, '2024-03-13 08:48:36', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 23, 'Branco', '33'),
(239, '2024-03-13 08:48:36', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -36, 'Verde', '40'),
(240, '2024-03-13 08:48:36', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 7, 'Vermelho', '33'),
(241, '2024-03-13 08:48:36', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -63, 'Roxo', '41'),
(242, '2024-03-13 08:48:36', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -9, 'Branco', '33'),
(243, '2024-03-13 08:55:52', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 20, 'Branco', '33'),
(244, '2024-03-13 08:55:52', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -11, 'Branco', '33'),
(245, '2024-03-13 08:55:52', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -39, 'Verde', '40'),
(246, '2024-03-13 08:55:52', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -68, 'Roxo', '41'),
(247, '2024-03-13 08:55:52', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 5, 'Vermelho', '33'),
(248, '2024-03-13 08:57:42', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 17, 'Branco', '33'),
(249, '2024-03-13 08:57:42', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -42, 'Verde', '40'),
(250, '2024-03-13 08:57:42', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -73, 'Roxo', '41'),
(251, '2024-03-13 08:57:42', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 3, 'Vermelho', '33'),
(252, '2024-03-13 08:57:42', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -13, 'Branco', '33'),
(253, '2024-03-13 09:26:19', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 14, 'Branco', '33'),
(254, '2024-03-13 09:26:19', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -78, 'Roxo', '41'),
(255, '2024-03-13 09:26:19', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 1, 'Vermelho', '33'),
(256, '2024-03-13 09:26:19', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -15, 'Branco', '33'),
(257, '2024-03-13 09:26:19', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -45, 'Verde', '40'),
(258, '2024-03-13 09:27:21', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 11, 'Branco', '33'),
(259, '2024-03-13 09:27:21', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -48, 'Verde', '40'),
(260, '2024-03-13 09:27:21', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -17, 'Branco', '33'),
(261, '2024-03-13 09:27:21', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -1, 'Vermelho', '33'),
(262, '2024-03-13 09:27:21', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -83, 'Roxo', '41'),
(263, '2024-03-13 09:29:45', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 8, 'Branco', '33'),
(264, '2024-03-13 09:29:45', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -51, 'Verde', '40'),
(265, '2024-03-13 09:29:45', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -3, 'Vermelho', '33'),
(266, '2024-03-13 09:29:45', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -88, 'Roxo', '41'),
(267, '2024-03-13 09:29:45', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -19, 'Branco', '33'),
(268, '2024-03-13 09:31:22', 'Remover', 3, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 5, 'Branco', '33'),
(269, '2024-03-13 09:31:22', 'Remover', 3, 'AIR FORCE 01 MID X OFF-WHITE', 84, -54, 'Verde', '40'),
(270, '2024-03-13 09:31:22', 'Remover', 5, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -93, 'Roxo', '41'),
(271, '2024-03-13 09:31:22', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, -21, 'Branco', '33'),
(272, '2024-03-13 09:31:22', 'Remover', 2, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, -5, 'Vermelho', '33'),
(273, '2024-03-13 13:37:10', 'Adicionar', 62, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 41, 'Branco', '33'),
(274, '2024-03-13 13:37:28', 'Adicionar', 83, 'AIR FORCE 01 MID X OFF-WHITE', 84, 29, 'Verde', '40'),
(275, '2024-03-13 13:37:39', 'Adicionar', 166, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 73, 'Roxo', '41'),
(276, '2024-03-13 13:37:48', 'Adicionar', 27, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 22, 'Vermelho', '33'),
(277, '2024-03-14 00:39:52', 'Remover', 4, 'AIR FORCE 01 MID X OFF-WHITE', 84, 25, 'Verde', '40'),
(278, '2024-03-14 00:39:52', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 38, 'Branco', '33'),
(279, '2024-03-14 00:39:52', 'Remover', 4, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 69, 'Roxo', '41'),
(280, '2024-03-14 00:39:52', 'Remover', 3, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 19, 'Vermelho', '33'),
(281, '2024-03-14 00:48:11', 'Remover', 4, 'AIR FORCE 01 MID X OFF-WHITE', 84, 21, 'Verde', '40'),
(282, '2024-03-14 00:48:11', 'Remover', 4, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 65, 'Roxo', '41'),
(283, '2024-03-14 00:48:11', 'Remover', 3, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 16, 'Vermelho', '33'),
(284, '2024-03-14 00:48:11', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 35, 'Branco', '33'),
(285, '2024-03-15 23:51:14', 'Remover', 1, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 64, 'Roxo', '41'),
(286, '2024-03-15 23:51:14', 'Remover', 1, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 15, 'Vermelho', '33'),
(287, '2024-03-15 23:51:14', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 32, 'Branco', '33'),
(288, '2024-03-16 00:21:40', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 29, 'Branco', '33'),
(289, '2024-03-16 00:21:40', 'Remover', 1, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 63, 'Roxo', '41'),
(290, '2024-03-16 00:21:40', 'Remover', 1, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 14, 'Vermelho', '33'),
(291, '2024-03-16 00:21:40', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 24, 'Vermelho', '32'),
(292, '2024-03-16 00:31:03', 'Remover', 1, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 62, 'Roxo', '41'),
(293, '2024-03-16 00:31:03', 'Remover', 1, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 13, 'Vermelho', '33'),
(294, '2024-03-16 00:31:03', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 26, 'Branco', '33'),
(295, '2024-03-16 00:31:03', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 21, 'Vermelho', '32'),
(296, '2024-03-16 02:17:43', 'Remover', 3, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 120, 'Branco', '39'),
(297, '2024-03-16 02:17:43', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 515, 'Branco', '42'),
(298, '2024-03-16 02:17:43', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 50, 'Branco', '33'),
(299, '2024-03-16 02:17:43', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 23, 'Branco', '33'),
(300, '2024-03-16 02:17:43', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 18, 'Vermelho', '32'),
(301, '2024-03-16 02:19:34', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 20, 'Branco', '33'),
(302, '2024-03-16 02:19:34', 'Remover', 3, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 15, 'Vermelho', '32'),
(303, '2024-03-16 02:27:35', 'Remover', 4, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 35, 'Branco', '42'),
(304, '2024-03-16 02:27:35', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, 71, 'Roxo', '43'),
(305, '2024-03-19 23:54:24', 'Remover', 3, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 59, 'Roxo', '41'),
(306, '2024-03-21 15:03:25', 'Excluido', 515, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 515, 'Branco', '42'),
(307, '2024-03-21 15:03:25', 'Excluido', 120, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 120, 'Branco', '39'),
(308, '2024-03-21 15:03:25', 'Excluido', 35, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 35, 'Branco', '42'),
(309, '2024-03-21 15:03:25', 'Excluido', 5, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 5, 'Branco', '33'),
(310, '2024-03-21 15:03:25', 'Excluido', 50, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 50, 'Branco', '33'),
(311, '2024-03-21 15:03:25', 'Excluido', 84, 'TÊNIS FORUM 84 HIGH', 80, 84, 'Branco', '41'),
(312, '2024-03-21 15:03:25', 'Excluido', 71, 'TÊNIS CAMPUS 00S', 76, 71, 'Roxo', '43'),
(313, '2024-03-21 15:03:25', 'Excluido', 81, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 81, 'Marrom', '44'),
(314, '2024-03-21 15:03:25', 'Excluido', 65, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 65, 'Preto', '35'),
(315, '2024-03-21 15:03:25', 'Excluido', 21, 'TÊNIS DISC BLAZE SNAKE', 82, 21, 'Azul', '33'),
(316, '2024-03-21 15:03:25', 'Excluido', 89, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 89, 'Laranja', '36'),
(317, '2024-03-21 15:03:25', 'Excluido', 21, 'AIR FORCE 01 MID X OFF-WHITE', 84, 21, 'Verde', '40'),
(318, '2024-03-21 15:03:25', 'Excluido', 69, 'AIR FORCE 01 MID X OFF-WHITE', 84, 69, 'Verde', '39'),
(319, '2024-03-21 15:03:25', 'Excluido', 59, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 59, 'Roxo', '41'),
(320, '2024-03-21 15:03:25', 'Excluido', 99, 'CHINELO ADILETTE 22', 86, 99, 'Marrom', '36'),
(321, '2024-03-21 15:03:25', 'Excluido', 20, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 20, 'Branco', '33'),
(322, '2024-03-21 15:03:25', 'Excluido', 15, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 15, 'Vermelho', '32'),
(323, '2024-03-21 15:03:25', 'Excluido', 13, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 13, 'Vermelho', '33'),
(324, '2024-03-21 15:04:00', 'Adicionar', 27, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 27, 'Vermelho', '32'),
(325, '2024-03-21 15:04:00', 'Adicionar', 63, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 63, 'Vermelho', '34'),
(326, '2024-03-21 15:04:00', 'Adicionar', 104, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 104, 'Vermelho', '36'),
(327, '2024-03-21 15:04:00', 'Adicionar', 82, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 82, 'Vermelho', '38'),
(328, '2024-03-21 15:04:00', 'Adicionar', 9, 'TÊNIS CAMPUS 00S', 76, 9, 'Roxo', '32'),
(329, '2024-03-21 15:04:00', 'Adicionar', 48, 'TÊNIS CAMPUS 00S', 76, 48, 'Roxo', '34'),
(330, '2024-03-21 15:04:00', 'Adicionar', 115, 'TÊNIS CAMPUS 00S', 76, 115, 'Roxo', '36'),
(331, '2024-03-21 15:04:01', 'Adicionar', 33, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 33, 'Branco', '32'),
(332, '2024-03-21 15:04:01', 'Adicionar', 71, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 71, 'Branco', '34'),
(333, '2024-03-21 15:04:01', 'Adicionar', 8, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 8, 'Branco', '32'),
(334, '2024-03-21 15:04:01', 'Adicionar', 92, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 92, 'Branco', '34'),
(335, '2024-03-21 15:04:01', 'Adicionar', 127, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 127, 'Branco', '36'),
(336, '2024-03-21 15:04:01', 'Adicionar', 41, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 41, 'Branco', '38'),
(337, '2024-03-21 15:04:01', 'Adicionar', 23, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 23, 'Marrom', '32'),
(338, '2024-03-21 15:04:01', 'Adicionar', 77, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 77, 'Marrom', '34'),
(339, '2024-03-21 15:04:01', 'Adicionar', 53, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 53, 'Marrom', '36'),
(340, '2024-03-21 15:04:01', 'Adicionar', 112, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 112, 'Marrom', '38'),
(341, '2024-03-21 15:04:01', 'Adicionar', 5, 'TÊNIS FORUM 84 HIGH', 80, 5, 'Branco', '32'),
(342, '2024-03-21 15:04:01', 'Adicionar', 88, 'TÊNIS FORUM 84 HIGH', 80, 88, 'Branco', '34'),
(343, '2024-03-21 15:04:01', 'Adicionar', 45, 'TÊNIS FORUM 84 HIGH', 80, 45, 'Branco', '36'),
(344, '2024-03-21 15:04:01', 'Adicionar', 12, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 12, 'Preto', '32'),
(345, '2024-03-21 15:04:01', 'Adicionar', 109, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 109, 'Preto', '34'),
(346, '2024-03-21 15:04:01', 'Adicionar', 76, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 76, 'Preto', '38'),
(347, '2024-03-21 15:04:01', 'Adicionar', 37, 'TÊNIS DISC BLAZE SNAKE', 82, 37, 'Azul', '32'),
(348, '2024-03-21 15:04:01', 'Adicionar', 59, 'TÊNIS DISC BLAZE SNAKE', 82, 59, 'Azul', '34'),
(349, '2024-03-21 15:04:01', 'Adicionar', 22, 'TÊNIS DISC BLAZE SNAKE', 82, 22, 'Azul', '36'),
(350, '2024-03-21 15:04:01', 'Adicionar', 98, 'TÊNIS DISC BLAZE SNAKE', 82, 98, 'Azul', '38'),
(351, '2024-03-21 15:04:01', 'Adicionar', 14, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 14, 'Laranja', '32'),
(352, '2024-03-21 15:04:01', 'Adicionar', 96, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 96, 'Laranja', '34'),
(353, '2024-03-21 15:04:01', 'Adicionar', 73, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 73, 'Laranja', '38'),
(354, '2024-03-21 15:04:01', 'Adicionar', 44, 'AIR FORCE 01 MID X OFF-WHITE', 84, 44, 'Verde', '32'),
(355, '2024-03-21 15:04:01', 'Adicionar', 68, 'AIR FORCE 01 MID X OFF-WHITE', 84, 68, 'Verde', '34'),
(356, '2024-03-21 15:04:01', 'Adicionar', 31, 'AIR FORCE 01 MID X OFF-WHITE', 84, 31, 'Verde', '36'),
(357, '2024-03-21 15:04:01', 'Adicionar', 18, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 18, 'Rosa', '32'),
(358, '2024-03-21 15:04:01', 'Adicionar', 104, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 104, 'Rosa', '34'),
(359, '2024-03-21 15:04:01', 'Adicionar', 89, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 89, 'Rosa', '38'),
(360, '2024-03-21 15:04:01', 'Adicionar', 49, 'CHINELO ADILETTE 22', 86, 49, 'Marrom', '32'),
(361, '2024-03-21 15:04:01', 'Adicionar', 82, 'CHINELO ADILETTE 22', 86, 82, 'Marrom', '34'),
(362, '2024-03-21 15:04:01', 'Adicionar', 76, 'CHINELO ADILETTE 22', 86, 76, 'Marrom', '38'),
(363, '2024-03-21 15:20:31', 'Excluido', 27, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 27, 'Vermelho', '32'),
(364, '2024-03-21 15:20:31', 'Excluido', 63, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 63, 'Vermelho', '34'),
(365, '2024-03-21 15:20:31', 'Excluido', 104, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 104, 'Vermelho', '36'),
(366, '2024-03-21 15:20:31', 'Excluido', 82, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 82, 'Vermelho', '38'),
(367, '2024-03-21 15:20:31', 'Excluido', 9, 'TÊNIS CAMPUS 00S', 76, 9, 'Roxo', '32'),
(368, '2024-03-21 15:20:31', 'Excluido', 48, 'TÊNIS CAMPUS 00S', 76, 48, 'Roxo', '34'),
(369, '2024-03-21 15:20:31', 'Excluido', 115, 'TÊNIS CAMPUS 00S', 76, 115, 'Roxo', '36'),
(370, '2024-03-21 15:20:31', 'Excluido', 33, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 33, 'Branco', '32'),
(371, '2024-03-21 15:20:31', 'Excluido', 71, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 71, 'Branco', '34'),
(372, '2024-03-21 15:20:31', 'Excluido', 8, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 8, 'Branco', '32'),
(373, '2024-03-21 15:20:31', 'Excluido', 92, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 92, 'Branco', '34'),
(374, '2024-03-21 15:20:31', 'Excluido', 127, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 127, 'Branco', '36'),
(375, '2024-03-21 15:20:31', 'Excluido', 41, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 41, 'Branco', '38'),
(376, '2024-03-21 15:20:31', 'Excluido', 23, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 23, 'Marrom', '32'),
(377, '2024-03-21 15:20:31', 'Excluido', 77, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 77, 'Marrom', '34'),
(378, '2024-03-21 15:20:31', 'Excluido', 53, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 53, 'Marrom', '36'),
(379, '2024-03-21 15:20:31', 'Excluido', 112, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 112, 'Marrom', '38'),
(380, '2024-03-21 15:20:31', 'Excluido', 5, 'TÊNIS FORUM 84 HIGH', 80, 5, 'Branco', '32'),
(381, '2024-03-21 15:20:31', 'Excluido', 88, 'TÊNIS FORUM 84 HIGH', 80, 88, 'Branco', '34'),
(382, '2024-03-21 15:20:31', 'Excluido', 45, 'TÊNIS FORUM 84 HIGH', 80, 45, 'Branco', '36'),
(383, '2024-03-21 15:20:31', 'Excluido', 12, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 12, 'Preto', '32'),
(384, '2024-03-21 15:20:31', 'Excluido', 109, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 109, 'Preto', '34'),
(385, '2024-03-21 15:20:31', 'Excluido', 76, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 76, 'Preto', '38'),
(386, '2024-03-21 15:20:31', 'Excluido', 37, 'TÊNIS DISC BLAZE SNAKE', 82, 37, 'Azul', '32'),
(387, '2024-03-21 15:20:31', 'Excluido', 59, 'TÊNIS DISC BLAZE SNAKE', 82, 59, 'Azul', '34'),
(388, '2024-03-21 15:20:31', 'Excluido', 22, 'TÊNIS DISC BLAZE SNAKE', 82, 22, 'Azul', '36'),
(389, '2024-03-21 15:20:31', 'Excluido', 98, 'TÊNIS DISC BLAZE SNAKE', 82, 98, 'Azul', '38'),
(390, '2024-03-21 15:20:31', 'Excluido', 14, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 14, 'Laranja', '32'),
(391, '2024-03-21 15:20:31', 'Excluido', 96, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 96, 'Laranja', '34'),
(392, '2024-03-21 15:20:31', 'Excluido', 73, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 73, 'Laranja', '38'),
(393, '2024-03-21 15:20:31', 'Excluido', 44, 'AIR FORCE 01 MID X OFF-WHITE', 84, 44, 'Verde', '32'),
(394, '2024-03-21 15:20:31', 'Excluido', 68, 'AIR FORCE 01 MID X OFF-WHITE', 84, 68, 'Verde', '34'),
(395, '2024-03-21 15:20:31', 'Excluido', 31, 'AIR FORCE 01 MID X OFF-WHITE', 84, 31, 'Verde', '36'),
(396, '2024-03-21 15:20:31', 'Excluido', 18, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 18, 'Rosa', '32'),
(397, '2024-03-21 15:20:31', 'Excluido', 104, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 104, 'Rosa', '34'),
(398, '2024-03-21 15:20:31', 'Excluido', 89, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 89, 'Rosa', '38'),
(399, '2024-03-21 15:20:31', 'Excluido', 49, 'CHINELO ADILETTE 22', 86, 49, 'Marrom', '32'),
(400, '2024-03-21 15:20:31', 'Excluido', 82, 'CHINELO ADILETTE 22', 86, 82, 'Marrom', '34'),
(401, '2024-03-21 15:20:31', 'Excluido', 76, 'CHINELO ADILETTE 22', 86, 76, 'Marrom', '38'),
(402, '2024-03-21 15:20:47', 'Adicionar', 27, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 27, 'Vermelho', '32'),
(403, '2024-03-21 15:20:47', 'Adicionar', 63, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 63, 'Vermelho', '34'),
(404, '2024-03-21 15:20:47', 'Adicionar', 104, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 104, 'Vermelho', '36'),
(405, '2024-03-21 15:20:47', 'Adicionar', 82, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 82, 'Vermelho', '38'),
(406, '2024-03-21 15:20:47', 'Adicionar', 40, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 40, 'Vermelho', '40'),
(407, '2024-03-21 15:20:47', 'Adicionar', 55, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 55, 'Vermelho', '42'),
(408, '2024-03-21 15:20:47', 'Adicionar', 21, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 21, 'Vermelho', '44'),
(409, '2024-03-21 15:20:48', 'Adicionar', 9, 'TÊNIS CAMPUS 00S', 76, 9, 'Roxo', '32'),
(410, '2024-03-21 15:20:48', 'Adicionar', 48, 'TÊNIS CAMPUS 00S', 76, 48, 'Roxo', '34'),
(411, '2024-03-21 15:20:48', 'Adicionar', 115, 'TÊNIS CAMPUS 00S', 76, 115, 'Roxo', '36'),
(412, '2024-03-21 15:20:48', 'Adicionar', 68, 'TÊNIS CAMPUS 00S', 76, 68, 'Roxo', '38'),
(413, '2024-03-21 15:20:48', 'Adicionar', 33, 'TÊNIS CAMPUS 00S', 76, 33, 'Roxo', '40'),
(414, '2024-03-21 15:20:48', 'Adicionar', 27, 'TÊNIS CAMPUS 00S', 76, 27, 'Roxo', '42'),
(415, '2024-03-21 15:20:48', 'Adicionar', 41, 'TÊNIS CAMPUS 00S', 76, 41, 'Roxo', '44'),
(416, '2024-03-21 15:20:48', 'Adicionar', 19, 'TÊNIS CAMPUS 00S', 76, 19, 'Roxo', '45'),
(417, '2024-03-21 15:20:48', 'Adicionar', 33, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 33, 'Branco', '32'),
(418, '2024-03-21 15:20:48', 'Adicionar', 71, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 71, 'Branco', '34'),
(419, '2024-03-21 15:20:48', 'Adicionar', 12, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 12, 'Branco', '36'),
(420, '2024-03-21 15:20:48', 'Adicionar', 58, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 58, 'Branco', '38'),
(421, '2024-03-21 15:20:48', 'Adicionar', 44, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 44, 'Branco', '40'),
(422, '2024-03-21 15:20:48', 'Adicionar', 26, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 26, 'Branco', '42'),
(423, '2024-03-21 15:20:48', 'Adicionar', 39, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 39, 'Branco', '44'),
(424, '2024-03-21 15:20:48', 'Adicionar', 17, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 17, 'Branco', '45'),
(425, '2024-03-21 15:20:48', 'Adicionar', 8, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 8, 'Branco', '32'),
(426, '2024-03-21 15:20:48', 'Adicionar', 92, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 92, 'Branco', '34'),
(427, '2024-03-21 15:20:48', 'Adicionar', 127, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 127, 'Branco', '36'),
(428, '2024-03-21 15:20:48', 'Adicionar', 41, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 41, 'Branco', '38'),
(429, '2024-03-21 15:20:48', 'Adicionar', 64, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 64, 'Branco', '40'),
(430, '2024-03-21 15:20:48', 'Adicionar', 37, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 37, 'Branco', '42'),
(431, '2024-03-21 15:20:48', 'Adicionar', 51, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 51, 'Branco', '44'),
(432, '2024-03-21 15:20:48', 'Adicionar', 23, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 23, 'Branco', '45'),
(433, '2024-03-21 15:20:48', 'Adicionar', 23, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 23, 'Marrom', '32'),
(434, '2024-03-21 15:20:48', 'Adicionar', 77, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 77, 'Marrom', '34'),
(435, '2024-03-21 15:20:48', 'Adicionar', 53, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 53, 'Marrom', '36'),
(436, '2024-03-21 15:20:48', 'Adicionar', 112, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 112, 'Marrom', '38'),
(437, '2024-03-21 15:20:48', 'Adicionar', 29, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 29, 'Marrom', '40'),
(438, '2024-03-21 15:20:48', 'Adicionar', 62, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 62, 'Marrom', '42'),
(439, '2024-03-21 15:20:48', 'Adicionar', 45, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 45, 'Marrom', '44'),
(440, '2024-03-21 15:20:48', 'Adicionar', 18, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 79, 18, 'Marrom', '45'),
(441, '2024-03-21 15:20:48', 'Adicionar', 5, 'TÊNIS FORUM 84 HIGH', 80, 5, 'Branco', '32'),
(442, '2024-03-21 15:20:48', 'Adicionar', 88, 'TÊNIS FORUM 84 HIGH', 80, 88, 'Branco', '34'),
(443, '2024-03-21 15:20:48', 'Adicionar', 45, 'TÊNIS FORUM 84 HIGH', 80, 45, 'Branco', '36'),
(444, '2024-03-21 15:20:48', 'Adicionar', 76, 'TÊNIS FORUM 84 HIGH', 80, 76, 'Branco', '38'),
(445, '2024-03-21 15:20:48', 'Adicionar', 33, 'TÊNIS FORUM 84 HIGH', 80, 33, 'Branco', '40'),
(446, '2024-03-21 15:20:48', 'Adicionar', 27, 'TÊNIS FORUM 84 HIGH', 80, 27, 'Branco', '42'),
(447, '2024-03-21 15:20:48', 'Adicionar', 14, 'TÊNIS FORUM 84 HIGH', 80, 14, 'Branco', '44'),
(448, '2024-03-21 15:20:48', 'Adicionar', 9, 'TÊNIS FORUM 84 HIGH', 80, 9, 'Branco', '45'),
(449, '2024-03-21 15:21:05', 'Adicionar', 34, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 34, 'Preto', '40'),
(450, '2024-03-21 15:21:05', 'Adicionar', 17, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 17, 'Preto', '42'),
(451, '2024-03-21 15:21:05', 'Adicionar', 22, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 22, 'Preto', '44'),
(452, '2024-03-21 15:21:05', 'Adicionar', 9, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 81, 9, 'Preto', '45'),
(453, '2024-03-21 15:21:05', 'Adicionar', 37, 'TÊNIS DISC BLAZE SNAKE', 82, 37, 'Azul', '32'),
(454, '2024-03-21 15:21:05', 'Adicionar', 59, 'TÊNIS DISC BLAZE SNAKE', 82, 59, 'Azul', '34'),
(455, '2024-03-21 15:21:05', 'Adicionar', 22, 'TÊNIS DISC BLAZE SNAKE', 82, 22, 'Azul', '36'),
(456, '2024-03-21 15:21:05', 'Adicionar', 98, 'TÊNIS DISC BLAZE SNAKE', 82, 98, 'Azul', '38'),
(457, '2024-03-21 15:21:05', 'Adicionar', 41, 'TÊNIS DISC BLAZE SNAKE', 82, 41, 'Azul', '40'),
(458, '2024-03-21 15:21:05', 'Adicionar', 64, 'TÊNIS DISC BLAZE SNAKE', 82, 64, 'Azul', '42'),
(459, '2024-03-21 15:21:05', 'Adicionar', 28, 'TÊNIS DISC BLAZE SNAKE', 82, 28, 'Azul', '44'),
(460, '2024-03-21 15:21:05', 'Adicionar', 13, 'TÊNIS DISC BLAZE SNAKE', 82, 13, 'Azul', '45'),
(461, '2024-03-21 15:21:05', 'Adicionar', 14, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 14, 'Laranja', '32'),
(462, '2024-03-21 15:21:05', 'Adicionar', 96, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 96, 'Laranja', '34'),
(463, '2024-03-21 15:21:05', 'Adicionar', 73, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 73, 'Laranja', '38'),
(464, '2024-03-21 15:21:05', 'Adicionar', 49, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 49, 'Laranja', '40'),
(465, '2024-03-21 15:21:05', 'Adicionar', 25, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 25, 'Laranja', '42'),
(466, '2024-03-21 15:21:05', 'Adicionar', 37, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 37, 'Laranja', '44'),
(467, '2024-03-21 15:21:05', 'Adicionar', 18, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 83, 18, 'Laranja', '45'),
(468, '2024-03-21 15:21:05', 'Adicionar', 44, 'AIR FORCE 01 MID X OFF-WHITE', 84, 44, 'Verde', '32'),
(469, '2024-03-21 15:21:05', 'Adicionar', 68, 'AIR FORCE 01 MID X OFF-WHITE', 84, 68, 'Verde', '34'),
(470, '2024-03-21 15:21:05', 'Adicionar', 31, 'AIR FORCE 01 MID X OFF-WHITE', 84, 31, 'Verde', '36'),
(471, '2024-03-21 15:21:05', 'Adicionar', 53, 'AIR FORCE 01 MID X OFF-WHITE', 84, 53, 'Verde', '38'),
(472, '2024-03-21 15:21:05', 'Adicionar', 29, 'AIR FORCE 01 MID X OFF-WHITE', 84, 29, 'Verde', '40'),
(473, '2024-03-21 15:21:05', 'Adicionar', 17, 'AIR FORCE 01 MID X OFF-WHITE', 84, 17, 'Verde', '42'),
(474, '2024-03-21 15:21:05', 'Adicionar', 22, 'AIR FORCE 01 MID X OFF-WHITE', 84, 22, 'Verde', '44'),
(475, '2024-03-21 15:21:05', 'Adicionar', 11, 'AIR FORCE 01 MID X OFF-WHITE', 84, 11, 'Verde', '45'),
(476, '2024-03-21 15:21:05', 'Adicionar', 18, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 18, 'Rosa', '32'),
(477, '2024-03-21 15:21:05', 'Adicionar', 104, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 104, 'Rosa', '34'),
(478, '2024-03-21 15:21:05', 'Adicionar', 89, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 89, 'Rosa', '38'),
(479, '2024-03-21 15:21:05', 'Adicionar', 45, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 45, 'Rosa', '40'),
(480, '2024-03-21 15:21:05', 'Adicionar', 27, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 27, 'Rosa', '42'),
(481, '2024-03-21 15:21:05', 'Adicionar', 33, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 33, 'Rosa', '44'),
(482, '2024-03-21 15:21:05', 'Adicionar', 15, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 15, 'Rosa', '45'),
(483, '2024-03-21 15:21:05', 'Adicionar', 49, 'CHINELO ADILETTE 22', 86, 49, 'Marrom', '32'),
(484, '2024-03-21 15:21:05', 'Adicionar', 82, 'CHINELO ADILETTE 22', 86, 82, 'Marrom', '34'),
(485, '2024-03-21 15:21:05', 'Adicionar', 76, 'CHINELO ADILETTE 22', 86, 76, 'Marrom', '38'),
(486, '2024-03-21 15:21:05', 'Adicionar', 38, 'CHINELO ADILETTE 22', 86, 38, 'Marrom', '40'),
(487, '2024-03-21 15:21:05', 'Adicionar', 21, 'CHINELO ADILETTE 22', 86, 21, 'Marrom', '42'),
(488, '2024-03-21 15:21:05', 'Adicionar', 29, 'CHINELO ADILETTE 22', 86, 29, 'Marrom', '44'),
(489, '2024-03-21 15:21:05', 'Adicionar', 14, 'CHINELO ADILETTE 22', 86, 14, 'Marrom', '45'),
(490, '2024-03-25 19:10:32', 'Remover', 17, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 10, 'Vermelho', '32'),
(491, '2024-03-25 19:11:37', 'Remover', 10, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 0, 'Vermelho', '32'),
(492, '2024-03-25 19:11:37', 'Remover', 4, 'TÊNIS FORUM 84 HIGH', 80, 1, 'Branco', '32'),
(493, '2024-03-25 19:11:37', 'Remover', 5, 'TÊNIS FORUM 84 HIGH', 80, 40, 'Branco', '36'),
(494, '2024-03-26 00:10:15', 'Remover', 45, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 85, 0, 'Rosa', '40'),
(495, '2024-03-31 00:00:12', 'Remover', 1, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 126, 'Branco', '36'),
(496, '2024-03-31 00:00:12', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 62, 'Branco', '40'),
(497, '2024-03-31 00:00:36', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 60, 'Branco', '40'),
(498, '2024-03-31 00:00:36', 'Remover', 1, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 125, 'Branco', '36'),
(499, '2024-03-31 00:01:43', 'Remover', 1, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 124, 'Branco', '36'),
(500, '2024-03-31 00:01:43', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 58, 'Branco', '40'),
(501, '2024-03-31 00:05:22', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 56, 'Branco', '40'),
(502, '2024-03-31 00:05:22', 'Remover', 1, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 123, 'Branco', '36'),
(503, '2024-03-31 00:05:32', 'Remover', 1, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 122, 'Branco', '36'),
(504, '2024-03-31 00:05:32', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 54, 'Branco', '40'),
(505, '2024-03-31 00:07:04', 'Remover', 2, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 52, 'Branco', '40'),
(506, '2024-03-31 00:07:04', 'Remover', 1, 'TÊNIS CAMPUS YOUTH OF PARIS', 78, 121, 'Branco', '36'),
(507, '2024-03-31 00:08:27', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, 7, 'Roxo', '32'),
(508, '2024-03-31 00:12:13', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, 5, 'Roxo', '32'),
(509, '2024-03-31 00:12:15', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, 3, 'Roxo', '32'),
(510, '2024-03-31 00:12:16', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, 1, 'Roxo', '32'),
(511, '2024-03-31 00:12:21', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -1, 'Roxo', '32'),
(512, '2024-03-31 00:12:21', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -3, 'Roxo', '32'),
(513, '2024-03-31 00:12:22', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -5, 'Roxo', '32'),
(514, '2024-03-31 00:12:22', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -7, 'Roxo', '32'),
(515, '2024-03-31 00:12:22', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -9, 'Roxo', '32'),
(516, '2024-03-31 00:12:26', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -11, 'Roxo', '32'),
(517, '2024-03-31 00:12:27', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -13, 'Roxo', '32'),
(518, '2024-03-31 00:12:27', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -15, 'Roxo', '32'),
(519, '2024-03-31 00:12:27', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -17, 'Roxo', '32'),
(520, '2024-03-31 00:12:30', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -19, 'Roxo', '32'),
(521, '2024-03-31 00:12:30', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -21, 'Roxo', '32'),
(522, '2024-03-31 00:12:32', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -23, 'Roxo', '32'),
(523, '2024-03-31 00:12:57', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -25, 'Roxo', '32'),
(524, '2024-03-31 00:13:04', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -27, 'Roxo', '32');
INSERT INTO `movimentacoes` (`id_movimento`, `data_alteracao`, `tipo_alteracao`, `quantidade_selecionada`, `nome_produto`, `id_produto`, `estoque_atual`, `cor_produto`, `tamanho_produto`) VALUES
(525, '2024-03-31 00:13:27', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -29, 'Roxo', '32'),
(526, '2024-03-31 00:13:29', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -31, 'Roxo', '32'),
(527, '2024-03-31 00:13:37', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -33, 'Roxo', '32'),
(528, '2024-03-31 00:13:37', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -35, 'Roxo', '32'),
(529, '2024-03-31 00:13:38', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -37, 'Roxo', '32'),
(530, '2024-03-31 00:13:38', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -39, 'Roxo', '32'),
(531, '2024-03-31 00:14:30', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, -41, 'Roxo', '32'),
(532, '2024-03-31 00:16:03', 'Adicionar', 341, 'TÊNIS CAMPUS 00S', 76, 300, 'Roxo', '32'),
(533, '2024-03-31 00:22:07', 'Remover', 3, 'TÊNIS CAMPUS 00S', 76, 297, 'Roxo', '32'),
(534, '2024-03-31 00:32:59', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 102, 'Vermelho', '36'),
(535, '2024-03-31 00:38:12', 'Remover', 2, 'TÊNIS ADIZERO ADIOS PRO 3.0', 75, 100, 'Vermelho', '36'),
(536, '2024-03-31 00:40:29', 'Remover', 2, 'TÊNIS CAMPUS 00S', 76, 46, 'Roxo', '34'),
(537, '2024-03-31 00:40:29', 'Remover', 3, 'TÊNIS CAMPUS 00S', 76, 294, 'Roxo', '32'),
(538, '2024-03-31 00:40:29', 'Remover', 2, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 77, 69, 'Branco', '34'),
(539, '2024-04-05 15:11:11', 'Adicionar', 40, 'Teste', 92, 40, 'Azul', '32'),
(540, '2024-04-05 15:28:58', 'Adicionar', 12, 'Teste234', 95, 12, 'Verde', '43'),
(541, '2024-04-05 15:28:58', 'Adicionar', 40, 'Teste234', 95, 40, 'Azul', '32'),
(542, '2024-04-05 15:29:12', '', 0, 'Teste234', 95, 40, 'Verde', '32'),
(543, '2024-04-05 15:35:16', 'Excluido', 40, 'Teste', 92, 40, 'Azul', '32'),
(544, '2024-04-05 15:35:23', 'Excluido', 12, 'Teste234', 95, 12, 'Verde', '43'),
(545, '2024-04-05 15:35:27', 'Excluido', 40, 'Teste234', 95, 40, 'Verde', '32'),
(546, '2024-04-05 15:50:55', 'Adicionar', 40, 'Teste4444', 96, 40, 'Azul', '32'),
(547, '2024-04-05 15:51:22', '', 0, 'Teste4444', 96, 40, 'Azul', '33');

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nomePedido` varchar(100) NOT NULL,
  `preco` int(11) NOT NULL,
  `qtd` int(11) NOT NULL,
  `data` varchar(20) NOT NULL,
  `status` enum('Cancelado','Pendente','Aprovado','Preparando envio','Enviado com sucesso','Chegou em casa') DEFAULT NULL,
  `detalhe_pedidos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`detalhe_pedidos`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pedidos`
--

INSERT INTO `pedidos` (`id`, `id_usuario`, `nomePedido`, `preco`, `qtd`, `data`, `status`, `detalhe_pedidos`) VALUES
(118, 39, 'TÊNIS ADIZERO ADIOS PRO 3.0', 12500, 1, '25/03/2024 19:11:35', 'Aprovado', '[{\"DPproductId\":75,\"DPnomeProd\":\"TÊNIS ADIZERO ADIOS PRO 3.0\",\"DPvalorProd\":\"1250.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":10,\"DPsubTotal\":\"12500.00\"},{\"DPproductId\":80,\"DPnomeProd\":\"TÊNIS FORUM 84 HIGH\",\"DPvalorProd\":\"4710.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":5,\"DPsubTotal\":\"23550.00\"},{\"DPproductId\":80,\"DPnomeProd\":\"TÊNIS FORUM 84 HIGH\",\"DPvalorProd\":\"4710.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":4,\"DPsubTotal\":\"18840.00\"}]'),
(119, 39, 'TÊNIS CAMPUS YOUTH OF PARIS', 3270, 1, '30/03/2024 23:59:50', 'Aprovado', '[{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":1,\"DPsubTotal\":\"1090.00\"},{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":40,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2180.00\"}]'),
(120, 39, 'TÊNIS CAMPUS YOUTH OF PARIS', 3270, 1, '30/03/2024 23:59:50', 'Aprovado', '[{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":1,\"DPsubTotal\":\"1090.00\"},{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":40,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2180.00\"}]'),
(121, 39, 'TÊNIS CAMPUS YOUTH OF PARIS', 3270, 1, '31/03/2024 00:01:41', 'Aprovado', '[{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":1,\"DPsubTotal\":\"1090.00\"},{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":40,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2180.00\"}]'),
(122, 39, 'TÊNIS CAMPUS YOUTH OF PARIS', 3270, 1, '31/03/2024 00:05:05', 'Aprovado', '[{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":1,\"DPsubTotal\":\"1090.00\"},{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":40,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2180.00\"}]'),
(123, 39, 'TÊNIS CAMPUS YOUTH OF PARIS', 3270, 1, '31/03/2024 00:05:05', 'Aprovado', '[{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":1,\"DPsubTotal\":\"1090.00\"},{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":40,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2180.00\"}]'),
(124, 39, 'TÊNIS CAMPUS YOUTH OF PARIS', 3270, 1, '31/03/2024 00:07:00', 'Aprovado', '[{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":1,\"DPsubTotal\":\"1090.00\"},{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":40,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2180.00\"}]'),
(125, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:08:24', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(126, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(127, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(128, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(129, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(130, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:11:54', 'Cancelado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(131, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(132, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(133, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(134, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:11:54', 'Chegou em casa', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(135, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(136, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(137, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(138, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(139, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(140, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:11:54', 'Pendente', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(141, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:11:54', 'Chegou em casa', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(142, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:11:54', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(143, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:13:26', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(144, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:13:26', 'Cancelado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(145, 39, 'TÊNIS CAMPUS 00S', 3120, 1, '31/03/2024 00:13:26', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(146, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:13:26', 'Enviado com sucesso', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(147, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:13:26', 'Chegou em casa', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(148, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:13:26', 'Pendente', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(149, 39, 'TÊNIS CAMPUS 00S', 3120, 0, '31/03/2024 00:14:26', 'Pendente', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(150, 39, 'TÊNIS CAMPUS 00S', 4680, 1, '31/03/2024 00:21:58', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":3,\"DPsubTotal\":\"4680.00\"}]'),
(151, 39, 'TÊNIS ADIZERO ADIOS PRO 3.0', 2500, 0, '31/03/2024 00:32:53', 'Preparando envio', '[{\"DPproductId\":75,\"DPnomeProd\":\"TÊNIS ADIZERO ADIOS PRO 3.0\",\"DPvalorProd\":\"1250.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2500.00\"}]'),
(152, 39, 'TÊNIS ADIZERO ADIOS PRO 3.0', 2500, 0, '31/03/2024 00:38:06', 'Pendente', '[{\"DPproductId\":75,\"DPnomeProd\":\"TÊNIS ADIZERO ADIOS PRO 3.0\",\"DPvalorProd\":\"1250.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2500.00\"}]'),
(153, 39, 'TÊNIS CAMPUS 00S e mais 1 produto.', 18000, 1, '31/03/2024 00:40:27', 'Aprovado', '[{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":3,\"DPsubTotal\":\"4680.00\"},{\"DPproductId\":77,\"DPnomeProd\":\"TÊNIS FORUM BOLD X ANDRÉ SARAIVA\",\"DPvalorProd\":\"5100.00\",\"DPselectedSize\":34,\"DPselectedQuantity\":2,\"DPsubTotal\":\"10200.00\"},{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":34,\"DPselectedQuantity\":2,\"DPsubTotal\":\"3120.00\"}]'),
(154, 39, 'TÊNIS FORUM BOLD X ANDRÉ SARAI e mais 5 produtos.', 59000, 0, '03/04/2024 13:42:59', 'Pendente', '[{\"DPproductId\":77,\"DPnomeProd\":\"TÊNIS FORUM BOLD X ANDRÉ SARAIVA\",\"DPvalorProd\":\"5100.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":3,\"DPsubTotal\":\"15300.00\"},{\"DPproductId\":79,\"DPnomeProd\":\"TÊNIS AIR JORDAN 1 ELEVATE HIGH\",\"DPvalorProd\":\"3980.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":4,\"DPsubTotal\":\"15920.00\"},{\"DPproductId\":75,\"DPnomeProd\":\"TÊNIS ADIZERO ADIOS PRO 3.0\",\"DPvalorProd\":\"1250.00\",\"DPselectedSize\":34,\"DPselectedQuantity\":3,\"DPsubTotal\":\"3750.00\"},{\"DPproductId\":75,\"DPnomeProd\":\"TÊNIS ADIZERO ADIOS PRO 3.0\",\"DPvalorProd\":\"1250.00\",\"DPselectedSize\":36,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2500.00\"},{\"DPproductId\":78,\"DPnomeProd\":\"TÊNIS CAMPUS YOUTH OF PARIS\",\"DPvalorProd\":\"1090.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":5,\"DPsubTotal\":\"5450.00\"},{\"DPproductId\":76,\"DPnomeProd\":\"TÊNIS CAMPUS 00S\",\"DPvalorProd\":\"1560.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":3,\"DPsubTotal\":\"4680.00\"},{\"DPproductId\":81,\"DPnomeProd\":\"TÊNIS FAST-FWD NITRO ELITE RUN 75\",\"DPvalorProd\":\"3800.00\",\"DPselectedSize\":42,\"DPselectedQuantity\":3,\"DPsubTotal\":\"11400.00\"}]'),
(155, 39, 'Teste', 2468, 1, '05/04/2024 15:13:07', 'Cancelado', '[{\"DPproductId\":92,\"DPnomeProd\":\"Teste\",\"DPvalorProd\":\"1234.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"2468.00\"}]'),
(156, 39, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 38950, 1, '17/04/2024 13:03:01', 'Cancelado', '[{\"DPproductId\":85,\"DPnomeProd\":\"CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO\",\"DPvalorProd\":\"7790.00\",\"DPselectedSize\":42,\"DPselectedQuantity\":3,\"DPsubTotal\":\"23370.00\"},{\"DPproductId\":85,\"DPnomeProd\":\"CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO\",\"DPvalorProd\":\"7790.00\",\"DPselectedSize\":32,\"DPselectedQuantity\":2,\"DPsubTotal\":\"15580.00\"}]');

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE `produto` (
  `id_produto` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `descricao` text DEFAULT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_marca` int(11) DEFAULT NULL,
  `nome_marca` varchar(255) DEFAULT NULL,
  `nome_imagem` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produto`
--

INSERT INTO `produto` (`id_produto`, `nome`, `valor`, `descricao`, `ativo`, `data_criacao`, `id_marca`, `nome_marca`, `nome_imagem`) VALUES
(75, 'TÊNIS ADIZERO ADIOS PRO 3.0', 2250.00, 'O Tênis Adizero Adios Pro 3.0 é a escolha definitiva para corredores de elite em busca de velocidade e desempenho. Com tecnologia de ponta, este tênis oferece leveza, amortecimento responsivo e suporte estratégico para maximizar o desempenho em corridas de longa distância', 1, '2024-01-12 19:06:36', 2, 'Adidas', 'image-1705086396897-474130.png'),
(76, 'TÊNIS CAMPUS 00S', 1560.00, 'O Tênis Campus 00s é uma reinterpretação moderna do estilo clássico dos anos 2000. Com design retrô e materiais de alta qualidade, este tênis oferece um visual urbano autêntico, combinando conforto e moda de forma única.', 1, '2024-01-12 19:08:33', 2, 'Adidas', 'image-1705086513929-106225260.png'),
(77, 'TÊNIS FORUM BOLD X ANDRÉ SARAIVA', 5100.00, 'O Tênis Forum Bold x André Saraiva é uma colaboração exclusiva que combina o icônico Tênis Forum Bold com a visão criativa única de André Saraiva. Com design arrojado e detalhes artísticos, este tênis é uma expressão autêntica de estilo urbano contemporâneo.', 1, '2024-01-12 19:11:26', 2, 'Adidas', 'image-1705086686584-764464360.png'),
(78, 'TÊNIS CAMPUS YOUTH OF PARIS', 1090.00, 'O Tênis Campus Youth of Paris é uma colaboração exclusiva que une o estilo atemporal do Tênis Campus com a expressão artística única da Youth of Paris. Com detalhes marcantes e materiais premium, este tênis é uma peça de destaque para os amantes da moda urbana.', 1, '2024-01-12 19:12:42', 2, 'Adidas', 'image-1705086762712-508218331.png'),
(79, 'TÊNIS AIR JORDAN 1 ELEVATE HIGH', 3980.00, 'O Tênis Forum Bold x André Saraiva é uma colaboração exclusiva que combina o icônico Tênis Forum Bold com a visão criativa única de André Saraiva. Com design arrojado e detalhes artísticos, este tênis é uma expressão autêntica de estilo urbano contemporâneo.', 1, '2024-01-12 19:13:57', 1, 'Nike', 'image-1705086837096-832032392.png'),
(80, 'TÊNIS FORUM 84 HIGH', 4710.00, 'Cristiano Ronaldo não alcançou seu sonho sozinho. Treinadores, familiares e modelos o ajudaram a se tornar a estrela que ele é hoje. Celebre quem o motivou e deixe as inspirações saberem que são amadas. Com características técnicas avançadas, você poderá dominar nos momentos decisivos.', 1, '2024-01-12 19:15:02', 2, 'Adidas', 'image-1705086902066-784912006.png'),
(81, 'TÊNIS FAST-FWD NITRO ELITE RUN 75', 3800.00, 'O Tênis Air Jordan 1 Elevate High Feminino é uma interpretação moderna do icônico modelo Air Jordan 1, projetado especificamente para mulheres. Com design elegante e materiais premium, este tênis oferece estilo atemporal e conforto para as apaixonadas por moda e basquete.', 1, '2024-01-12 19:17:02', 2, 'Pulma', 'image-1705087022711-16949409.png'),
(82, 'TÊNIS DISC BLAZE SNAKE', 2800.00, 'O Tênis Disc Blaze Snake é uma peça única que combina o sistema de fechamento Disc Blaze com um design arrojado de pele de cobra. Este tênis oferece estilo marcante e praticidade inovadora, proporcionando um toque de extravagância para os amantes da moda urbana.\r\n\r\n', 1, '2024-01-12 19:19:06', 3, 'Pulma', 'image-1705087146818-423925594.png'),
(83, 'CHUTEIRA X SPEEDPORTAL  3 FUTSAL', 6100.00, 'A Chuteira X Speedportal.3 Futsal é projetada para proporcionar agilidade e precisão em quadras de futsal. Com um design aerodinâmico e materiais de alta qualidade, esta chuteira oferece performance excepcional para os amantes do esporte.\r\n\r\n', 1, '2024-01-12 19:19:55', 1, 'Nike', 'image-1705087195358-744144182.png'),
(84, 'AIR FORCE 01 MID X OFF-WHITE', 1990.00, 'O Air Force 1 Mid x Off-White™ é uma colaboração exclusiva que reinventa o clássico Air Force 1 com o toque distintivo da Off-White™. Com design inovador e detalhes icônicos, este tênis representa a fusão entre a estética urbana e a moda de vanguarda.\r\n\r\n', 1, '2024-01-12 19:33:38', 1, 'Nike', 'image-1705088018483-399304474.png'),
(85, 'CHUTEIRA NIKE MERCURIAL ZOOM VAPOR 15 ELITE CAMPO', 7790.00, 'A Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo é uma inovação em calçados esportivos, oferecendo desempenho excepcional no campo. Com design aerodinâmico e materiais de alta tecnologia, esta chuteira proporciona agilidade, tração e conforto para jogadores de elite.\r\n\r\n', 1, '2024-01-12 19:34:47', 1, 'Nike', 'image-1705088087318-269733145.png'),
(86, 'CHINELO ADILETTE 22', 390.00, 'O Chinelo Adilette 22 é um produto inovador que combina estilo, conforto e durabilidade. Desenvolvido para atender às necessidades modernas de calçados casuais, este chinelo oferece um design contemporâneo e funcionalidade excepcional.\r\n\r\n', 1, '2024-01-12 19:36:00', 2, 'Adidas', 'image-1705088160982-878482314.png'),
(96, 'Teste4444', 44444.00, 'Teste', 1, '2024-04-05 18:50:23', NULL, 'Adidas', 'image-1712343023870-771416579.png');

--
-- Acionadores `produto`
--
DELIMITER $$
CREATE TRIGGER `after_insert_nome_imagem` AFTER INSERT ON `produto` FOR EACH ROW BEGIN
    -- Verificar se o campo nome_imagem está preenchido
    IF NEW.nome_imagem IS NOT NULL THEN
        -- Inserir dados na tabela imagens
        INSERT INTO imagens (id_produtoM, nome_imagemM)
        VALUES (NEW.id_produto, NEW.nome_imagem);
    END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_delete_produto` BEFORE DELETE ON `produto` FOR EACH ROW BEGIN
    -- Deletar dados da tabela imagens se nome_imagem não for nulo
    IF OLD.nome_imagem IS NOT NULL THEN
        DELETE FROM imagens WHERE id_produtoM = OLD.id_produto;
    END IF;

    -- Deletar dados da tabela estoque relacionados ao id_produto
    DELETE FROM estoque WHERE id_produto = OLD.id_produto;
    
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_insert_produto` BEFORE INSERT ON `produto` FOR EACH ROW BEGIN
    -- Completa o campo data_criacao com a data e hora atuais
    SET NEW.data_criacao = IFNULL(NEW.data_criacao, CURRENT_TIMESTAMP());
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_update_nome_imagem` BEFORE UPDATE ON `produto` FOR EACH ROW BEGIN
    -- Verificar se o campo nome_imagem foi alterado
    IF NOT (NEW.nome_imagem <=> OLD.nome_imagem) THEN
        -- Atualizar a coluna nome_imagemM na tabela imagens
        UPDATE imagens SET nome_imagemM = NEW.nome_imagem WHERE id_produtoM = NEW.id_produto;
        
        -- Agora atualizar o campo nome_imagem na tabela produto
        SET NEW.nome_imagem = NEW.nome_imagem;
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `tamanho`
--

CREATE TABLE `tamanho` (
  `id_tamanho` int(11) NOT NULL,
  `numero_tamanho` int(11) NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT 1,
  `nome_tamanho` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tamanho`
--

INSERT INTO `tamanho` (`id_tamanho`, `numero_tamanho`, `ativo`, `nome_tamanho`) VALUES
(3, 39, 1, '39'),
(4, 40, 1, '40'),
(5, 32, 1, '32'),
(6, 33, 1, '33'),
(7, 34, 1, '34'),
(8, 35, 1, '35'),
(9, 36, 1, '36'),
(10, 37, 1, '37'),
(11, 38, 1, '38'),
(12, 41, 1, '41'),
(13, 42, 1, '42'),
(14, 43, 1, '43'),
(15, 44, 1, '44'),
(16, 45, 1, '45');

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `email`, `senha`) VALUES
(36, 'luisin', 'luisindfgfdg@gdrfgd.com', '$2b$10$GcXR5iYM7XbCO1r0tWZanOO8Hzb/DXlAa73Wbjs7xiGyzvlLvYGLC'),
(39, 'yagass', 'yago@gmail.com', '$2b$10$boQhvbu3TKK1Zs3SBhv5J.uWbGke7ivKVJFEFCLCX.QE18WEVgUlK'),
(40, 'joaoberto', 'joao@gmail.com', '$2b$10$vOjZUrBL9.eGIaRjTcZg.eSl8DhbyJoi1LbqhikNUhiDbmfHJ/26K'),
(41, 'xicão', 'xicao@gmail.com', '$2b$10$GTpzHxML7SsHX0Ssa7uDm.Ieq2saGJzapzz92MOXnTPJmSW6Z98Y6'),
(42, 'xandao', 'xandao@g.com', '$2b$10$Qbqx8cThgJ9QjJ6ilEYVK.3LRVL1rl5vgnI5fYEiGr71/Xb0bTPJu'),
(43, 'joelmir', 'joelmir@g.com', '$2b$10$6AGvK2PoIuRvg42TN6OnU.1Cq1yHveckiSrnd.pznMKR5cHVNimNm'),
(44, 'Gustavin', 'gustavo@e.com', '$2b$10$WHlXjqf1GpSu.MBXdMGMcuB/pCYh/RFj4hOCQ444p752CQsWDfKNm');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `adm`
--
ALTER TABLE `adm`
  ADD PRIMARY KEY (`id_adm`);

--
-- Índices de tabela `contatos`
--
ALTER TABLE `contatos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `cor`
--
ALTER TABLE `cor`
  ADD PRIMARY KEY (`id_cor`);

--
-- Índices de tabela `dataqtdesize`
--
ALTER TABLE `dataqtdesize`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_product_size` (`productId`,`selectedSize`);

--
-- Índices de tabela `enderecos`
--
ALTER TABLE `enderecos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `estoque`
--
ALTER TABLE `estoque`
  ADD PRIMARY KEY (`id_estoque`),
  ADD KEY `id_produto` (`id_produto`),
  ADD KEY `nome_tamanho` (`nome_tamanho`),
  ADD KEY `nome_cor` (`nome_cor`);

--
-- Índices de tabela `imagens`
--
ALTER TABLE `imagens`
  ADD PRIMARY KEY (`id_imagem`),
  ADD KEY `id_produto` (`id_produtoM`);

--
-- Índices de tabela `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id_marca`);

--
-- Índices de tabela `movimentacoes`
--
ALTER TABLE `movimentacoes`
  ADD PRIMARY KEY (`id_movimento`);

--
-- Índices de tabela `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Índices de tabela `produto`
--
ALTER TABLE `produto`
  ADD PRIMARY KEY (`id_produto`),
  ADD KEY `fk_produto_marca` (`id_marca`);

--
-- Índices de tabela `tamanho`
--
ALTER TABLE `tamanho`
  ADD PRIMARY KEY (`id_tamanho`);

--
-- Índices de tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `adm`
--
ALTER TABLE `adm`
  MODIFY `id_adm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `contatos`
--
ALTER TABLE `contatos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `cor`
--
ALTER TABLE `cor`
  MODIFY `id_cor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de tabela `dataqtdesize`
--
ALTER TABLE `dataqtdesize`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1585;

--
-- AUTO_INCREMENT de tabela `enderecos`
--
ALTER TABLE `enderecos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de tabela `estoque`
--
ALTER TABLE `estoque`
  MODIFY `id_estoque` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=224;

--
-- AUTO_INCREMENT de tabela `imagens`
--
ALTER TABLE `imagens`
  MODIFY `id_imagem` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT de tabela `marca`
--
ALTER TABLE `marca`
  MODIFY `id_marca` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `movimentacoes`
--
ALTER TABLE `movimentacoes`
  MODIFY `id_movimento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=548;

--
-- AUTO_INCREMENT de tabela `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT de tabela `produto`
--
ALTER TABLE `produto`
  MODIFY `id_produto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT de tabela `tamanho`
--
ALTER TABLE `tamanho`
  MODIFY `id_tamanho` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `contatos`
--
ALTER TABLE `contatos`
  ADD CONSTRAINT `contatos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `enderecos`
--
ALTER TABLE `enderecos`
  ADD CONSTRAINT `enderecos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `estoque`
--
ALTER TABLE `estoque`
  ADD CONSTRAINT `estoque_ibfk_1` FOREIGN KEY (`id_produto`) REFERENCES `produto` (`id_produto`);

--
-- Restrições para tabelas `imagens`
--
ALTER TABLE `imagens`
  ADD CONSTRAINT `imagens_ibfk_1` FOREIGN KEY (`id_produtoM`) REFERENCES `produto` (`id_produto`);

--
-- Restrições para tabelas `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Restrições para tabelas `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `fk_produto_marca` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id_marca`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
