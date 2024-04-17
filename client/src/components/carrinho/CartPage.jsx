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

function CartPage() {
    const { cartItems, setCartItems } = useContext(AppContext);
    const [productTam, setProductTam] = useState({});
    const [productQuantityData, setProductQuantityData] = useState({});
    const [selectedSize, setSelectedSize] = useState({});
    const [selectedSizeAtual, setSelectedSizeAtual] = useState({});
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
    const [multipleSizeProductIds, setMultipleSizeProductIds] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [idProd, setIdProd] = useState('');
    const [Vnome, setVNome] = useState('');
    const [Vvalor, setVValor] = useState('');
    const [resultData, setResultData] = useState({});
    const [valorTotal, setValorTotal] = useState(0);
    const [productIdsAndValues, setProductIdsAndValues] = useState({})
    const [allData, setAllData] = useState([]);
    const [pdAllData, setPdAllData] = useState({});

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    initMercadoPago("TEST-af584e0f-46f2-41b5-a361-45f16749075f");

    const createPreference = async () => {
        const cartValue = valorTotal;
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
                const multipleSizeProductIds = []; // Array para armazenar IDs de produtos com mais de 1 tamanho
                const productIdsAndValues = []; // Array para armazenar productId e valor

                cartItems.forEach((item) => {
                    const productId = item.id_produto;
                    setSelectedId(productId);
                    const product = productsData.find((p) => p.id_produto === productId);

                    if (product) {
                        const sizes = product.nome_tamanho.split(',');

                        if (sizes.length > 1) {
                            multipleSizeProductIds.push(productId);
                        }

                        numberOfUniqueItems++;

                        if (!firstItemName) {
                            firstItemName = item.nome; // Armazenando o nome do primeiro item
                        }

                        allProductsTam[productId] = sizes.reduce((acc, size) => {
                            acc[size.trim()] = product.qtde;
                            return acc;
                        }, {});

                        newProductQuantityData[productId] = {};
                        sizes.forEach((size) => {
                            newProductQuantityData[productId][size.trim()] = product.qtde;
                        });

                        productIdsAndValues.push({
                            productId,
                            valor: item.valor, // Certifique-se de ajustar conforme a estrutura real do seu item
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

                // Armazenar os IDs dos produtos com mais de 1 tamanho
                setMultipleSizeProductIds(multipleSizeProductIds);

                // Armazenar todos os productId e valor
                setProductIdsAndValues(productIdsAndValues);

            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        };

        fetchProductsAsync();
    }, [cartItems]);

    useEffect(() => {
        const retrievedData = retrieveDataFromLocalStorage(selectedId);
        let sizeFromData = '';

        if (retrievedData) {
            console.log("Dados recuperados:", retrievedData);
            sizeFromData = retrievedData.size;
            console.log("Tamanho recuperado:", sizeFromData);
        } else {
            console.log("Nenhum dado encontrado para o productId:", selectedId);
        }

        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3001/getTotalCartValue');
                if (response.ok) {
                    const data = await response.json();

                    const dataqtdesize = data.dataqtdesize;

                    const newData = dataqtdesize.map(item => ({
                        productId: item.productId,
                        selectedSize: item.selectedSize,
                        selectedQuantity: item.selectedQuantity,
                    }));

                    setAllData(newData);
                } else {
                    console.error('Erro ao obter dados:', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao obter dados:', error);
            }
        };

        fetchData();

        const loadedSizes = {};
        const loadedQuantities = {};
        let idExists = 0;
        let idAtual = 0;
        // Array de dados obtidos do localStorage
        const dataLocal = JSON.parse(localStorage.getItem("dataQtdeSizeVal"));
        const productsData = {};

        // Preencher loadedSizes e loadedQuantities com os valores de localStorage
        cartItems.forEach((item) => {
            const productId = item.id_produto;
            loadedSizes[productId] = localStorage.getItem(`selectedSize_${productId}`) || (productTam[productId] && Object.keys(productTam[productId])[0]) || '';

            const position = getPositionOfSize(productId, loadedSizes[productId]);
            const positionWithOffset = position + 1;
            const quantitiesForProduct = productQuantityData[productId] || {};
            const quantityForSize = quantitiesForProduct[positionWithOffset];

            // Extrair as chaves (números) do objeto productTam[productId]
            const sizesForProductKeys = productTam[productId] ? Object.keys(productTam[productId]).map(Number) : [];

            // Contar o número total de elementos e armazenar em uma constante
            const totalNumbers = sizesForProductKeys.length;

            // Crie um objeto para armazenar as sizes e quantities para este produto
            let productData = {};
            let sizesAndQuantities = {};

            // Armazene as sizes para este produto
            productData.sizes = productTam[productId] ? Object.keys(productTam[productId]).map(Number) : [];

            // Armazene as quantities para este produto
            productData.quantities = productQuantityData[productId] || {};

            // Armazene os dados deste produto no objeto principal usando o ID do produto como chave
            sizesAndQuantities[productId] = productData;

            console.log(`On page load - Quantity for size ${loadedSizes[productId]} and product ${productId}: ${quantityForSize}`);
            console.log('Sizes For Product:', sizesForProductKeys);
            console.log('quantities For Product:', quantitiesForProduct);
            console.log('quantity For Size:', quantityForSize);
            console.log('Total Numbers:', totalNumbers);
            setMaxSize(totalNumbers);
            console.log('maxsize: ', typeof maxSize, '. Total Numbers: ', typeof totalNumbers);
            console.log("max size:", maxSize);
            setSelectedSizeAtual(loadedSizes[productId])
            console.log("ID existe no idSizeMap:", idExists);
            console.log("ID existente:", idAtual);

            const foundItem = allData.find(dataItem => dataItem.productId === productId);

            if (!foundItem) {
                loadedQuantities[productId] = 0; // Define o valor como 0 se não houver correspondência em allData
            } else {
                loadedQuantities[productId] = foundItem.selectedQuantity;
            }
            productsData[productId] = {
                sizesForProductKeys,
                quantitiesForProduct
            };
        });

        console.log("allData: ", allData);
        console.log("loadedQuantities: ", loadedQuantities);

        setPdAllData(productsData);
        setSelectedSize(loadedSizes);
        setSelectedQuantities(loadedQuantities);
        getTotalCartValue();

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


    const retrieveDataFromLocalStorage = (productId) => {
        // Obtém os dados armazenados no localStorage com a chave productId
        const storedData = localStorage.getItem(productId);

        if (storedData) {
            // Se existirem dados, converte-os de volta para um objeto JavaScript
            const data = JSON.parse(storedData);
            return data;
        } else {
            // Se não houver dados correspondentes, retorna null ou qualquer valor que você preferir
            return null;
        }
    };

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
                DataQtdeSizeId(increasedQuantity, productId);
                sendToBackend(productId, selectedSize, { ...prevQuantities, [productId]: increasedQuantity });
                return { ...prevQuantities, [productId]: increasedQuantity };
            });
            console.log('Increased Quantity:', increasedQuantity);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    };

    const handleDecreaseQuantity = (productId) => {
        const currentQuantity = selectedQuantities[productId] || 0;

        if (currentQuantity > 0) {
            setSelectedQuantities((prevQuantities) => {
                const decreasedQuantity = currentQuantity - 1;
                DataQtdeSizeId(decreasedQuantity, productId);
                sendToBackend(productId, selectedSize, { ...prevQuantities, [productId]: decreasedQuantity });
                return { ...prevQuantities, [productId]: decreasedQuantity };
            });
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
    };

    const DataQtdeSizeId = (updatedQuantity, idAtu) => {
        const idProd = idAtu;
        const sltQtde = updatedQuantity;
        const sizeData = selectedSize[idProd];

        // Extrair o tamanho a partir dos dados correspondentes ao selectedId
        const sizeSele = sizeData.trim(); // Remover espaços em branco extras
        console.log("size Filtrado", sizeSele)

        const data = {
            size: sizeSele,
            quantity: sltQtde,
            productId: idProd
        };

        let storedData = JSON.parse(localStorage.getItem("dataQtdeSizeVal"));

        console.log("storedData ", storedData);

        if (!Array.isArray(storedData)) {
            storedData = []; // Inicializa storedData como um array vazio se não houver dados armazenados ou se os dados armazenados não forem um array
        }

        const existingDataIndex = storedData.findIndex(item => item.productId === idProd);
        console.log("existingDataIndex ", existingDataIndex);

        if (existingDataIndex !== -1) {
            // Se o productId já existir, substitui os dados
            storedData[existingDataIndex] = {
                size: sizeSele,
                quantity: updatedQuantity,
                productId: idProd
            };
        } else {
            // Se o productId não existir, adiciona os novos dados
            storedData.push({
                size: sizeSele,
                quantity: updatedQuantity,
                productId: idProd
            });
        }

        localStorage.setItem("dataQtdeSizeVal", JSON.stringify(storedData)); // Salva os dados atualizados no localStorage 
        //alert("Teste");
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

    const handleSizeChange = async (event, productId) => {
        const newSize = event.target.value;
        let quantityForSize;  // Declare a variável fora do escopo da constante
        const idproduto = productId;

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

        try {
            // Faz uma solicitação ao backend para obter os dados do qtdesize.json
            const response = await fetch(`http://localhost:3001/qtdesize-data02/${newSize}/${productId}`);
            console.log('Dados recebidos do backend:', response);

            if (response.ok) {
                const jsonData = await response.json();
                console.log('Dados JSON recebidos:', jsonData);

                // Verifica se a resposta é um array, se não for, converte para um array
                const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];

                // Encontra o item correspondente ao newSize e productId no array
                const selectedItem = dataArray[0]?.exactData;

                // Se o item for encontrado, ajusta o selectedQuantity
                if (selectedItem) {
                    setSelectedQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: selectedItem.selectedQuantity,
                    }));
                } else {
                    // Se não houver item correspondente, ajusta o selectedQuantity para 1
                    setSelectedQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: 0,
                    }));
                }
            } else {
                throw new Error('Erro ao obter dados do backend');
            }
        } catch (error) {
            console.error('Erro ao obter dados do backend:', error);
        }

        getTotalCartValue();
        console.log("dados: ", newSize, idproduto)
    };

    const getTotalCartValue = async () => {
        console.log("chegou no getTotalCartValue");
        try {
            const response = await fetch('http://localhost:3001/getTotalCartValue');
            if (response.ok) {
                const data = await response.json();
                console.log("data ", data);

                // Agora você pode acessar diretamente os dadosqtdesize
                const dataqtdesize = data.dataqtdesize;
                console.log("dataqtdesize", dataqtdesize);

                // Armazene todos os dados em uma única variável
                const allData = dataqtdesize.map(item => ({
                    productId: item.productId,
                    selectedSize: item.selectedSize,
                    selectedQuantity: item.selectedQuantity,
                }));

                console.log("allData", allData);

                // Calcule a quantidade e o valor total por productId
                const totalQuantityAndValueByProductId = {};
                let totalValueSum = 0; // Nova variável para armazenar a soma total dos valores

                allData.forEach(item => {
                    const { productId, selectedQuantity } = item;
                    const valor = productIdsAndValues.find(p => p.productId === productId)?.valor || 0;

                    // Inicialize os valores se o productId ainda não estiver no objeto
                    if (!totalQuantityAndValueByProductId[productId]) {
                        totalQuantityAndValueByProductId[productId] = {
                            totalQuantity: 0,
                            totalValue: 0,
                        };
                    }

                    // Adicione a quantidade e o valor correspondentes ao productId
                    totalQuantityAndValueByProductId[productId].totalQuantity += parseInt(selectedQuantity, 10);
                    const totalValue = parseInt(selectedQuantity, 10) * parseFloat(valor);
                    totalQuantityAndValueByProductId[productId].totalValue += totalValue;

                    // Atualize a soma total dos valores
                    totalValueSum += totalValue;
                });
                setValorTotal(totalValueSum);
                localStorage.setItem('totalValueSum', totalValueSum.toString());

                console.log("totalQuantityAndValueByProductId", totalQuantityAndValueByProductId);
                console.log("totalValueSum", totalValueSum); // Adicione esta linha para imprimir a soma total
            } else {
                console.error('Erro ao obter o valor total do carrinho:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao obter o valor total do carrinho:', error);
        }
    };

    const getPedidosExtras = async (productId, nome, valor) => {
        setIdProd(productId);
        setVNome(nome);
        setVValor(valor);
        console.log("idProd ", idProd);
        console.log("multipleSizeProductIds ", multipleSizeProductIds);
        console.log("Nome do produto: ", nome);
        console.log("Valor do produto: ", valor);

        // Enviar os IDs para o backend
        const url = 'http://localhost:3001/prodDupli/' + multipleSizeProductIds.join(',');

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ multipleSizeProductIds }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Resultados retornados do backend:', data);

                // Atualizar o estado com os dados
                setResultData(data);

                // Adicione qualquer lógica adicional aqui, se necessário
                handleShowModal();
            } else {
                console.error('Erro ao enviar IDs para o backend:', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao enviar IDs para o backend:', error);
        }
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
        getTotalCartValue();
    };

    const RemoveDataQtdeSizeId = (prodId) => {
        let storedData = JSON.parse(localStorage.getItem("dataQtdeSizeVal"));

        console.log("storedData ", storedData);

        if (!Array.isArray(storedData)) {
            storedData = [];
        }

        const newData = storedData.filter(item => {
            console.log("item.productId: ", item.productId);
            console.log("prodId: ", prodId);
            return item.productId !== prodId;
        });

        console.log("newData ", newData);

        if (newData.length !== storedData.length) {
            // Se algum item foi removido, atualiza o localStorage
            localStorage.setItem("dataQtdeSizeVal", JSON.stringify(newData));
            console.log("Item removido do localStorage");
        } else {
            console.log("Não existe esse item no localStorage");
        }
    };

    const handleRemoveItem = async (idProd) => {
        // Verifica se o usuário realmente deseja remover o item
        const confirmRemoval = window.confirm("Tem certeza de que deseja remover este item do carrinho?");
        const productId = idProd;

        console.log("productId ", productId);

        if (!confirmRemoval) {
            console.log("Remoção cancelada pelo usuário.");
            return;
        }

        try {
            await new Promise((resolve) => {
                // Delay execution by 2 seconds
                setTimeout(resolve, 1000);
            });

            let updatedItems;

            // Envia uma requisição DELETE para remover o item do carrinho.json no servidor
            axios.delete(`http://127.0.0.1:3001/api/carrinho/${productId}`)
                .then(() => {
                    updatedItems = cartItems.filter(item => item.id_produto !== productId);
                    setCartItems(updatedItems);
                    onUpdateCart(updatedItems);
                    getTotalCartValue();
                })
                .catch(error => {
                    console.error('Erro ao remover o item do carrinho:', error);
                });

            RemoveDataQtdeSizeId(productId);

        } catch (error) {
            console.error('Erro ao remover o item do carrinho:', error);
        }

    };

    const renderButtons = (item) => {
        if (Object.keys(productTam[item.id_produto] || {}).length > 1) {
            return (
                <div className="cart-btns">
                    <Button
                        onClick={() => getPedidosExtras(item.id_produto, item.nome, item.valor)}
                        className="green-button"
                    >
                        Detalhes
                    </Button>
                    <Button
                        onClick={() => handleRemoveItem(item.id_produto)}
                        className="red-button"
                    >
                        Deletar
                    </Button>
                </div>
            );
        } else {
            return (
                <div className="cart-btns">
                    <Button
                        onClick={() => handleRemoveItem(item.id_produto)}
                        className="red-button"
                    >
                        Deletar
                    </Button>
                </div>
            );
        }
    };

    const renderQuantityContainer = (item, productId) => {
        let prodId = productId;
        let slSize = selectedSize[prodId];
        let allData = pdAllData;
    
        // Verifica se o ID do produto está presente no objeto allData
        if (allData.hasOwnProperty(prodId)) {
            // Obtém os dados do produto correspondente ao ID
            const productData = allData[prodId];
            //console.log("Produto selecionado:", productData);
    
            // Encontra a posição do tamanho selecionado dentro do array de tamanhos disponíveis
            const sizeIndex = productData.sizesForProductKeys.indexOf(parseInt(slSize));
            if (sizeIndex !== -1) {
                // Obtém a quantidade para o tamanho selecionado usando a posição encontrada
                const quantitiesForSize = productData.quantitiesForProduct[sizeIndex + 1];
                //console.log("Quantidade para o tamanho selecionado:", quantitiesForSize);
    
                // Verifica se a quantidade é diferente de 0
                if (parseInt(quantitiesForSize) !== 0) {
                    return (
                        <div className="quantity-container">
                            <button onClick={() => handleDecreaseQuantity(item.id_produto)}>-</button>
                            <input
                                type="text"
                                value={selectedQuantities[item.id_produto] || 0}
                                onChange={(e) => handleQuantityChange(e, item.id_produto)}
                            />
                            <button onClick={() => handleIncreaseQuantity(item.id_produto)}>+</button>
                        </div>
                    );
                } else {
                    return <p style={{ color: 'red' }}>Item Esgotado</p>;
                }
            } else {
                console.log("Tamanho selecionado não encontrado nas quantidades disponíveis.");
            }
        } else {
            console.log("Produto não encontrado em allData");
        }
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
                                                {renderButtons(item)}
                                            </div>

                                            {/* Renderize o container de quantidade */}
                                            {renderQuantityContainer(item, item.id_produto)}

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
                                <h2>Total do Carrinho: R$ {valorTotal}</h2>
                            </div>
                            {preferenceId && <Wallet initialization={{ preferenceId }} />}
                        </div>
                    )}
                </div>
            </div>
            {/* Modal Bootstrap */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{Vnome}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Renderize os dados no corpo do modal usando resultData */}
                    {resultData[idProd]?.map(({ selectedSize, selectedQuantity }) => (
                        <div key={`${selectedSize}-${selectedQuantity}`}>
                            <h5>Quantidade: {selectedQuantity} || Tamanho: {selectedSize} </h5>
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fechar
                    </Button>
                    {/* Multiplicar o valor pelo total de selectedQuantity */}
                    <h4>Total: R$ {(Vvalor * resultData[idProd]?.reduce((acc, { selectedQuantity }) => acc + parseInt(selectedQuantity), 0)).toFixed(2)}</h4>
                </Modal.Footer>
            </Modal>
            <Cart />
        </>
    );
}

export default CartPage;