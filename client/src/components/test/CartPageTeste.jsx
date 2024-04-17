import React, { useContext, useState, useEffect } from 'react';
import AppContext from '../api/AppContext';
import fetchProducts from '../api/fetchProducts';
import './cartpage.css';
import Navbar from '../elementos/navbar';
import Cart from './Cart';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';

let numeroStorage = parseInt(localStorage.getItem('numero'), 13) || 32;

function CartPageTeste() {
    const { cartItems, setCartItems } = useContext(AppContext);
    const [productTam, setProductTam] = useState({});
    const [productQuantityData, setProductQuantityData] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [selectedId, setSelectedId] = useState({});
    const [selectedQuantities, setSelectedQuantities] = useState({});
    const [numero, setNumero] = useState(numeroStorage);
    const [quantityForSize, setQuantityForSize] = useState(null);
    const [maxSize, setMaxSize] = useState({});
    const [preferenceId, setPreferenceId] = useState(null);
    const [numberOfUniqueItems, setNumberOfUniqueItems] = useState(0);
    const [firstItemName, setFirstItemName] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});
    const [limiteDeTamanhos, setlimiteDeTamanhos] = useState(0);
    const [contadorCliques, setContadorCliques] = useState(0);
    const [duplicationCompleted, setDuplicationCompleted] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [produtoSelecionadoId, setProdutoSelecionadoId] = useState(null);

    const handleMaisOpcoesClick = (idProduto) => {
        setProdutoSelecionadoId(idProduto);
        setShowModal(true);
    };

    const handleFecharModal = () => {
        setShowModal(false);
        setProdutoSelecionadoId(null); // Limpar o ID quando o modal for fechado
    };

    initMercadoPago("TEST-af584e0f-46f2-41b5-a361-45f16749075f");

    const createPreference = async () => {
        const cartValue = getTotalCartValue();
        console.log("cartValue ", cartValue);

        let pedidovariosnomes
        let pedidotodositem;
        let pedidofinal;

        if (numberOfUniqueItems === 1) {
            pedidofinal = firstItemName
            console.log(pedidofinal);
        } else {
            pedidotodositem = numberOfUniqueItems - 1;
            pedidovariosnomes = firstItemName.substring(0, 30);
            pedidofinal = `${pedidovariosnomes} e mais ${pedidotodositem} produto${pedidotodositem > 1 ? 's' : ''}.`;
            console.log(pedidofinal);
        }

        try {
            const response = await axios.post("http://localhost:3001/create_preference", {
                description: pedidofinal,
                price: cartValue,
                quantity: 1,
            });

            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error);
        }
    };

    const fecharCarrinho = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const id = await createPreference();
            if (id) {
                setPreferenceId(id);
            }
        } else {
            window.location.href = '/login';
            alert('Para comprar, é necessário estar cadastrado e logado.');
        }
    };

    useEffect(() => {
        const fetchProductsAsync = async () => {
            try {
                const response = await fetchProducts();
                const productsData = response && response.length > 0 ? response : [];

                const allProductsTam = {};
                const newProductQuantityData = {};

                let numberOfUniqueItems = 0;
                let firstItemName = null;

                cartItems.forEach((item) => {
                    const productId = item.id_produto;
                    setSelectedId(productId);
                    const product = productsData.find((p) => p.id_produto === productId);

                    if (product) {
                        numberOfUniqueItems++;

                        if (!firstItemName) {
                            firstItemName = item.nome; // Armazenando o nome do primeiro item
                        }

                        const sizes = product.nome_tamanho.split(',');

                        allProductsTam[productId] = sizes.reduce((acc, size) => {
                            acc[size.trim()] = product.qtde;
                            return acc;
                        }, {});

                        newProductQuantityData[productId] = {};
                        sizes.forEach((size) => {
                            newProductQuantityData[productId][size.trim()] = product.qtde;
                        });
                    }
                });

                const formattedProductQuantityData = {};
                Object.keys(newProductQuantityData).forEach((productId) => {
                    formattedProductQuantityData[productId] = {};
                    Object.keys(newProductQuantityData[productId]).forEach((size) => {
                        const quantities = newProductQuantityData[productId][size].split(',');
                        quantities.forEach((quantity, index) => {
                            formattedProductQuantityData[productId][index + 1] = quantity.trim();
                        });
                    });
                });

                setProductTam(allProductsTam);
                setProductQuantityData(formattedProductQuantityData);
                setNumberOfUniqueItems(numberOfUniqueItems);
                setFirstItemName(firstItemName);

            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProductsAsync();
    }, [cartItems]);

    useEffect(() => {
        const loadedSizes = {};
        const loadedQuantities = {};

        cartItems.forEach((item) => {
            const productId = item.id_produto;
            loadedSizes[productId] = localStorage.getItem(`selectedSize_${productId}`) || (productTam[productId] && Object.keys(productTam[productId])[0]) || '';
            loadedQuantities[productId] = parseInt(localStorage.getItem(`selectedQuantity_${productId}`), 10) || 0;

            const position = getPositionOfSize(productId, loadedSizes[productId]);
            const positionWithOffset = position + 1;
            const quantitiesForProduct = productQuantityData[productId] || {};
            const quantityForSize = quantitiesForProduct[positionWithOffset];

            // Extrair as chaves (números) do objeto productTam[productId]
            const sizesForProductKeys = productTam[productId] ? Object.keys(productTam[productId]).map(Number) : [];

            // Contar o número total de elementos e armazenar em uma constante
            const totalNumbers = sizesForProductKeys.length;

            console.log(`On page load - Quantity for size ${loadedSizes[productId]} and product ${productId}: ${quantityForSize}`);
            console.log('Sizes For Product:', sizesForProductKeys);
            console.log('Total Numbers:', totalNumbers);
            setMaxSize(totalNumbers);
            console.log('maxsize: ', typeof maxSize, '. Total Numbers: ', typeof totalNumbers);
            console.log("max size:", maxSize);
        });

        setSelectedSize(loadedSizes);
        setSelectedQuantities(loadedQuantities);
    }, [cartItems, productTam, productQuantityData]);

    useEffect(() => {
        Object.keys(selectedSize).forEach((productId) => {
            localStorage.setItem(`selectedSize_${productId}`, selectedSize[productId]);
        });

        Object.keys(selectedQuantities).forEach((productId) => {
            localStorage.setItem(`selectedQuantity_${productId}`, selectedQuantities[productId].toString());
        });
    }, [selectedSize, selectedQuantities]);

    useEffect(() => {
        localStorage.setItem('numero', numero);
    }, [numero]);

    const handleIncreaseQuantity = (productId) => {
        const selectedSizeForProduct = selectedSize[productId];
        const sizesForProduct = productTam[productId];
        const hasMultipleSizes = sizesForProduct && Object.keys(sizesForProduct).length > 1;

        let maxQuantity = 0;

        if (hasMultipleSizes) {
            const selectedSizeIndex = getPositionOfSize(productId, selectedSizeForProduct) + 1;
            maxQuantity = parseFloat(productQuantityData[productId][selectedSizeIndex]) || 0;
        } else {
            maxQuantity = parseFloat(sizesForProduct[Object.keys(sizesForProduct)[0]]) || 0;
        }

        const currentQuantity = selectedQuantities[productId] || 0;

        console.log('Handle Increase - Product ID:', productId);
        console.log('Selected Size:', selectedSizeForProduct);
        console.log('Has Multiple Sizes:', hasMultipleSizes);
        console.log('Max Quantity:', maxQuantity);
        console.log('Current Quantity:', currentQuantity);

        if (currentQuantity < maxQuantity) {
            const increasedQuantity = hasMultipleSizes ? currentQuantity + 1 : currentQuantity + 1;

            setSelectedQuantities((prevQuantities) => {
                const increasedQuantity = hasMultipleSizes ? prevQuantities[productId] + 1 : prevQuantities[productId] + 1;
                sendToBackend(productId, selectedSize, { ...prevQuantities, [productId]: increasedQuantity });
                return { ...prevQuantities, [productId]: increasedQuantity };
            });
            console.log('Increased Quantity:', increasedQuantity);
        }
    };

    const handleDecreaseQuantity = (productId) => {
        const currentQuantity = selectedQuantities[productId] || 0;

        if (currentQuantity > 0) {
            setSelectedQuantities((prevQuantities) => {
                const decreasedQuantity = currentQuantity - 1;
                sendToBackend(productId, selectedSize, { ...prevQuantities, [productId]: decreasedQuantity });
                return { ...prevQuantities, [productId]: decreasedQuantity };
            });
        }
    };

    const handleQuantityChange = (event, productId) => {
        const newQuantity = parseInt(event.target.value, 10);
        const selectedSizeForProduct = selectedSize[productId];
        const hasMultipleSizes = productQuantityData[productId] && Object.keys(productQuantityData[productId]).length > 1;

        const maxQuantity = hasMultipleSizes ? parseFloat(productQuantityData[productId][selectedSizeForProduct]) || 0 : parseFloat(productQuantityData[productId][Object.keys(productQuantityData[productId])[0]]) || 0;

        console.log('Handle Quantity Change - Product ID:', productId);
        console.log('Selected Size:', selectedSizeForProduct);
        console.log('Has Multiple Sizes:', hasMultipleSizes);
        console.log('Max Quantity:', maxQuantity);
        console.log('New Quantity:', newQuantity);

        if (!isNaN(newQuantity) && newQuantity >= 0 && newQuantity <= maxQuantity) {
            setSelectedQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: newQuantity,
            }));
            saveToLocalStorage('selectedQuantity', productId, newQuantity);
        }
    };

    const getPositionOfSize = (productId, selectedSize) => {
        const sizesForProduct = productTam[productId] || {};
        const sizeKeys = Object.keys(sizesForProduct);
        const position = sizeKeys.indexOf(selectedSize);
        return position;
    };

    const handleSizeChange = (event, productId) => {
        const newSize = event.target.value;
        let quantityForSize;  // Declare a variável fora do escopo da constante

        setSelectedSize((prevSizes) => ({
            ...prevSizes,
            [productId]: newSize,
        }));

        // Adicione este trecho para calcular a posição e imprimir o resultado
        const position = getPositionOfSize(productId, newSize);
        const positionWithOffset = position + 1;

        // Adicione este trecho para filtrar productQuantityData e exibir o dado correspondente
        const quantitiesForProduct = productQuantityData[productId] || {};
        quantityForSize = quantitiesForProduct[positionWithOffset];
        setQuantityForSize(quantityForSize);
        console.log(`Quantity: ${quantityForSize} Position: ${positionWithOffset}`);

        // Adicione esta verificação para ajustar a quantidade selecionada, se necessário
        const currentQuantity = selectedQuantities[productId] || 0;
        const newMaxQuantity = parseFloat(quantityForSize) || 0;

        if (currentQuantity > newMaxQuantity) {
            // Se a quantidade atual for maior que a nova quantidade disponível, ajustamos para a nova quantidade
            setSelectedQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: newMaxQuantity,
            }));
            console.log(`Adjusted Quantity to ${newMaxQuantity}`);
        }
    };

    const getTotalCartValue = () => {
        let totalValue = 0;

        // Itera sobre os itens do carrinho
        cartItems.forEach((item) => {
            // Calcula o subtotal para cada item e adiciona ao total
            totalValue += item.valor * (selectedQuantities[item.id_produto] || 0);
        });
        return totalValue;
    };

    const sendToBackend = (productId, selectedSize, selectedQuantities) => {
        console.log("Product ID:", productId);
        console.log("Selected Size:", selectedSize[productId]);
        console.log("Selected Quantities:", selectedQuantities[productId]);
    
        fetch(`http://localhost:3001/dados-Qtde-Size02`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedProductId: productId,
                selectedSize: selectedSize[productId],
                selectedQuantity: selectedQuantities[productId],
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao enviar dados para o backend');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados enviados com sucesso para o backend:', data);
        })
        .catch(error => {
            console.error('Erro ao enviar dados para o backend:', error);
        });
    };    

    return (
        <>
            <Navbar />
            <div className="container1">
                <div>
                    <h2 className="cartpage-heading">Itens do Carrinho</h2>
                    {cartItems.length === 0 ? (
                        <p>O carrinho está vazio.</p>
                    ) : (
                        <div>
                            <ul className="cartpage-list">
                                {cartItems.map((item) => (
                                    <React.Fragment key={item.id_produto}>
                                        <li className="cartpage-item">
                                            <div>
                                                <img
                                                    src={`http://127.0.0.1:3001/uploads/${item.nome_imagemM}`}
                                                    alt="Imagem do produto"
                                                    className="cartpage-item-image"
                                                />
                                            </div>
                                            <div className="cartpage-details">
                                                <h3 className="cartpage-item-heading">{item.nome}</h3>
                                                <h2 className="cartpage-item-heading">R$ {item.valor}</h2>
                                                <h2 className="cartpage-item-heading">Subtotal: R$ {item.valor * (selectedQuantities[item.id_produto] || 0)}</h2>
                                                {Object.keys(productTam[item.id_produto] || {}).length > 1 && (
                                                    <div className="cart-btns">
                                                        <Button
                                                            onClick={() => handleMaisOpcoesClick(item.id_produto)}
                                                            className="green-button"
                                                        >
                                                            Mais opções
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="quantity-container">
                                                <button onClick={() => handleDecreaseQuantity(item.id_produto)}>-</button>
                                                <input
                                                    type="text"
                                                    value={selectedQuantities[item.id_produto] || 0}
                                                    onChange={(e) => handleQuantityChange(e, item.id_produto)}
                                                />
                                                <button onClick={() => handleIncreaseQuantity(item.id_produto)}>+</button>
                                            </div>
                                            <div className="quantity-container">
                                            </div>
                                            <form>
                                                <select
                                                    name="tamanho"
                                                    value={selectedSize[item.id_produto] || ''}
                                                    onChange={(e) => handleSizeChange(e, item.id_produto)}
                                                >
                                                    {Object.keys(productTam[item.id_produto] || {}).map((size) => (
                                                        <option key={size} value={size}>
                                                            {size}
                                                        </option>
                                                    ))}
                                                </select>
                                            </form>
                                        </li>
                                    </React.Fragment>
                                ))}
                            </ul>
                            <div className="cart-btns">
                                <a href="#" className="add-cart buy-now" onClick={fecharCarrinho}>Finalizar Agora</a>
                                <h2>Total do Carrinho: R$ {getTotalCartValue()}</h2>
                            </div>
                            {preferenceId && <Wallet initialization={{ preferenceId }} />}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onHide={handleFecharModal}>
                <Modal.Header closeButton>
                </Modal.Header>
                <Modal.Body>
                    {/* Conteúdo do modal */}
                    {cartItems
                        .filter(item => item.id_produto === produtoSelecionadoId)
                        .map((item, itemIndex) => (
                            <React.Fragment key={item.id_produto}>
                                {/* Cabeçalho do modal */}
                                <Modal.Header closeButton>
                                    <Modal.Title>{item.nome}</Modal.Title>
                                </Modal.Header>

                                {/* Item do carrinho dentro do modal */}
                                <li className="cartpage-item">
                                    <div className="modal-content">
                                        {/* Contêiner da imagem do produto */}
                                        <div className="modal-image-container">
                                            <img
                                                src={`http://127.0.0.1:3001/uploads/${item.nome_imagemM}`}
                                                alt="Imagem do produto"
                                                className="cartpage-item-image modal-item-image"
                                            />
                                        </div>

                                        {/* Contêiner para tamanhos e quantidades */}
                                        <div className="size-quantity-container">
                                            {/* Mapeando sobre os tamanhos disponíveis para o produto */}
                                            {Object.keys(productTam[item.id_produto] || {}).map((size, sizeIndex) => (
                                                <div key={sizeIndex} className="size-quantity-group">
                                                    <div className="size-quantity-pair">
                                                        {/* Campo de entrada para quantidade */}

                                                        <button>-</button>

                                                        <input
                                                            type="text"
                                                            value={selectedQuantities[item.id_produto] && selectedQuantities[item.id_produto][size] || 0}
                                                            onChange={(e) => handleQuantityChange(e, item.id_produto, size)}
                                                        />

                                                        <button>+</button>

                                                        {/* Seletor de tamanho */}
                                                        {Object.keys(productTam[item.id_produto] || {}).length > 1 && (
                                                            <select
                                                                name="tamanho"
                                                                value={size}
                                                                // Desativa o seletor em todos os casos
                                                                disabled={true}
                                                            >
                                                                {/* Opções do seletor de tamanho */}
                                                                {Object.keys(productTam[item.id_produto] || {}).map((sizeOption) => (
                                                                    <option key={sizeOption} value={sizeOption}>
                                                                        {sizeOption}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </li>
                            </React.Fragment>
                        ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleFecharModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Cart />
        </>
    );
}

export default CartPageTeste;