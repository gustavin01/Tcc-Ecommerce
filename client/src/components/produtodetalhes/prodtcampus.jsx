import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import n3 from '../../images/n3.png';
import './produto.css';
import Footer from '../elementos/footer';
import Navbar from '../elementos/navbar';
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Provider from "../api/Provider";
import Cart from "../carrinho/Cart";
import AppContext from '../api/AppContext';
import fetchProducts from '../api/fetchProducts';

let numeroStorage = parseInt(localStorage.getItem('numero'), 13) || 32;

export default function ProdTCampusF({ data }) {
    const { products, setProducts, loading, setLoading } = useContext(AppContext);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [product, setProduct] = useState();
    const selectedProductId = 78;
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productQtde, setProductQtde] = useState();
    const [productTam, setProductTam] = useState();
    const [valTotal, setValTotal] = useState();

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState({});
    const { cartItems, setCartItems } = useContext(AppContext);

    useEffect(() => {
        const retrievedData = retrieveDataFromLocalStorage(selectedProductId);
        let sizeFromData = '';

        if (retrievedData) {
            console.log("Dados recuperados:", retrievedData);
            sizeFromData = retrievedData.size;
            console.log("Tamanho recuperado:", sizeFromData);
        } else {
            console.log("Nenhum dado encontrado para o productId:", selectedProductId);
        }

        async function fetchProductsAsync() {
            try {
                const response = await fetchProducts();
                console.log('Dados dos produtos:', response);

                // Certifique-se de que 'items' existe nos dados recebidos
                const productsData = response && response.length > 0 ? response : [];

                // Se selectedProductId estiver definido, aplique o filtro
                const filteredProducts = selectedProductId
                    ? productsData.filter(product => product.id_produto === selectedProductId)
                    : productsData;

                // Atualizar estados com base nos dados do produto
                if (filteredProducts.length > 0) {
                    const product = filteredProducts[0];
                    setProduct(product);
                    setProductName(product.nome);
                    setProductPrice(product.valor);

                    // Dividir os tamanhos e quantidades em arrays
                    const sizes = product.nome_tamanho.split(',');
                    const quantities = product.qtde.split(',');

                    // Criar um objeto para mapear tamanhos para quantidades
                    const sizesAndQuantities = sizes.reduce((acc, size, index) => {
                        acc[size.trim()] = parseInt(quantities[index].trim(), 10);
                        return acc;
                    }, {});

                    setProductTam(sizesAndQuantities);

                    // Definir o tamanho inicial e a quantidade inicial com base nos dados
                    const initialSize = Object.keys(sizesAndQuantities)[0];
                    if (sizeFromData === '') {
                        setSelectedSize(initialSize || '');
                    } else {
                        // Converte sizeFromData para inteiro e define em selectedSize
                        setSelectedSize(sizeFromData);
                    }
                    setSelectedQuantity(1);
                }

                setLoading(false);
                setForceUpdate((prev) => !prev);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }

        fetchProductsAsync();
    }, [setProducts, setLoading]);

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

    useEffect(() => {
        // Verifica se o selectedSize está definido
        if (selectedSize) {
            const fetchData = async () => {
                try {
                    // Fazer solicitação ao backend para obter dados do qtdesize.json
                    const sizeResponse = await fetch(`http://localhost:3001/qtdesize-data02/${selectedSize}/${selectedProductId}`);

                    if (sizeResponse.ok) {
                        const { exactData } = await sizeResponse.json();

                        // Verificar se há dados para o selectedSize e selectedProductId
                        if (exactData) {
                            // Se houver dados, definir o selectedQuantity conforme os dados do qtdesize.json
                            setSelectedQuantity(exactData.selectedQuantity);
                        } else {
                            // Se não houver dados, definir o selectedQuantity como 1
                            setSelectedQuantity(1);
                        }
                    } else {
                        // Se a solicitação ao backend falhar, definir o selectedQuantity como 1
                        setSelectedQuantity(1);
                    }
                } catch (error) {
                    console.error('Erro ao buscar dados do qtdesize.json:', error);
                }
            };

            console.log("Qtde Selecionado UF:", selectedQuantity);
            verificarQtdeTrue(selectedQuantity);

            // Chama a função fetchData
            fetchData();
        }
    }, [selectedSize, selectedProductId]);

    const [preferenceId, setPreferenceId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [numero, setNumero] = useState(numeroStorage);

    console.log("numeros: ", numero);

    const fecharCarrinho = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/cartpage';
        } else {
            window.location.href = '/login';
            alert('Para comprar, é necessário estar cadastrado e logado.');
        }
        handleAddCart();
    };

    const handleIncreaseQuantity = () => {
        const maxQuantity = selectedSize ? productTam[selectedSize] || 1 : 1;

        if (selectedQuantity < maxQuantity) {
            const updatedQuantity = selectedQuantity + 1;
            setSelectedQuantity(updatedQuantity);
            sendToBackend(updatedQuantity);
            DataQtdeSizeId(updatedQuantity);
        }
    };

    const handleDecreaseQuantity = () => {
        if (selectedQuantity > 1) {
            const updatedQuantity = selectedQuantity - 1;
            setSelectedQuantity(updatedQuantity);
            sendToBackend(updatedQuantity);
            DataQtdeSizeId(updatedQuantity);
        }
    };

    const DataQtdeSizeId = (updatedQuantity) => {
        const sltQtde = updatedQuantity;
        const data = {
            size: selectedSize,
            quantity: sltQtde,
            productId: selectedProductId
        };

        // Verifica se já existe um dado com o mesmo productId no localStorage
        const storedData = localStorage.getItem(selectedProductId);

        if (storedData) {
            // Se existir, remove o dado antigo
            localStorage.removeItem(selectedProductId);
        }

        // Armazena o novo dado com o mesmo productId
        localStorage.setItem(selectedProductId, JSON.stringify(data));

        console.log("Data Array:", data);
    };

    const sendToBackend = async (updatedQuantity) => {
        console.log("selectedQuantity: ", updatedQuantity);
        try {
            const response = await axios.post('http://localhost:3001/dados-Qtde-Size', {
                selectedQuantity: updatedQuantity,
                selectedProductId,
                selectedSize,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Lógica adicional após o envio bem-sucedido
            setTimeout(() => {
                window.location.reload();
            }, 1000);

            console.log(response.data);
        } catch (error) {
            console.error('Erro ao enviar dados para o backend:', error);
        }
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        // Verifica se a nova quantidade está dentro do intervalo permitido
        const maxQuantity = selectedSize ? productTam[selectedSize] || 1 : 1;

        if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= maxQuantity) {
            setSelectedQuantity(newQuantity);
        }
    };

    const handleSizeChange = async (event) => {
        const newSize = event.target.value;

        try {
            // Faz uma solicitação ao backend para obter os dados do qtdesize.json
            const response = await fetch(`http://localhost:3001/qtdesize-data/${newSize}/${selectedProductId}`);
            console.log('Dados recebidos do backend:', response);

            if (response.ok) {
                const jsonData = await response.json();
                const selectedItem = jsonData.find(item => item.nome_tamanho === newSize && item.id_produto === selectedProductId);
                let QtdeTrue = selectedItem ? selectedItem.qtde : 0;
                verificarQtdeTrue(QtdeTrue);
                console.log("QtdeTrue Size ", QtdeTrue);
                // Se o item for encontrado, ajusta o selectedQuantity
                if (selectedItem) {
                    setSelectedSize(newSize);
                    setSelectedQuantity(selectedItem.qtde); // Ajuste para selecionar a quantidade corretamente
                } else {
                    // Se não houver item correspondente, ajusta o selectedQuantity para 1
                    setSelectedSize(newSize);
                    setSelectedQuantity(1);
                }
            } else {
                throw new Error('Erro ao obter dados do backend');
            }
        } catch (error) {
            console.error('Erro ao obter dados do backend:', error);
        }
    };

    const verificarQtdeTrue = (QtdeTrue) => {
        // Faça a verificação aqui
        const resultadoVerificacao = QtdeTrue !== 0;
        console.log("Resultado da verificação: ", resultadoVerificacao);
        localStorage.setItem('resultadoVerificacao', resultadoVerificacao);
    };

    useEffect(() => {
        // Atualiza o número com base no tamanho selecionado
        const novoNumero = parseInt(selectedSize, 14);
        if (!isNaN(novoNumero) && 32 && novoNumero <= 46) {
            setNumero(novoNumero);
        }
    }, [selectedSize]);

    const handleNumeroChange = (e) => {
        // Certifica-se de que o número selecionado esteja dentro do intervalo permitido
        const novoNumero = parseInt(e.target.value, 14);
        if (!isNaN(novoNumero) && novoNumero >= 32 && novoNumero <= 46) {
            setNumero(novoNumero);
        }
    };

    useEffect(() => {
        const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        setCartItems(storedCartItems);
    }, []); // Executar apenas uma vez no início

    const handleAddCart = async () => {
        const productToAdd = { ...product };

        const data = {
            selectedProductId,
            selectedSize,
            selectedQuantity,
        };

        try {
            const response = await fetch('http://localhost:3001/salvar-dados-do-carrinho', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Dados do carrinho salvos com sucesso!');
                alert('Produto adicionado ao carrinho!');
                window.location.reload();
            } else {
                console.error('Erro ao salvar dados do carrinho');
                //alert('Erro ao adicionar o produto ao carrinho');
            }
        } catch (error) {
            console.error('Erro ao enviar a solicitação:', error);
            alert('Erro ao adicionar o produto ao carrinho');
        }

        if (productToAdd) {
            console.log("Produto a ser adicionado:", productToAdd);

            const existingItem = cartItems.find((item) => item.id_produto === productToAdd.id_produto);

            if (existingItem) {
                console.log("Produto já foi adicionado!");
            } else {
                const updatedCart = [...cartItems, productToAdd];
                setCartItems(updatedCart);
                localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                console.log("Produto adicionado ao carrinho!");
                window.location.reload();
            }
        }
    };

    const getTotalValue = () => {
        const resultadoVerificacao = localStorage.getItem('resultadoVerificacao');

        // Verificar se resultadoVerificacao é verdadeiro
        if (resultadoVerificacao === 'true') {
            const valueTotal = productPrice * selectedQuantity;
            setValTotal(valueTotal);
        } else {
            const valueTotal = 0;
            setValTotal(valueTotal);
        }
    };

    useEffect(() => {
        getTotalValue();
    }, [productName, productPrice, selectedQuantity]);

    const QuantityButtons = ({ handleDecreaseQuantity, handleQuantityChange, handleIncreaseQuantity, selectedQuantity }) => {
        // Puxar o dado do localStorage e armazená-lo em uma variável
        const resultadoVerificacao = localStorage.getItem('resultadoVerificacao');

        // Verificar se resultadoVerificacao é verdadeiro
        if (resultadoVerificacao === 'true') {
            // Se for verdadeiro, exibir os botões de quantidade
            return (
                <>
                    <button onClick={handleDecreaseQuantity}>-</button>
                    <input type="text" value={selectedQuantity} onChange={handleQuantityChange} />
                    <button onClick={handleIncreaseQuantity}>+</button>
                </>
            );
        } else {
            // Se não for verdadeiro, exibir apenas a mensagem 'kkkkkk'
            return <p style={{ color: 'red' }}>Item Esgotado</p>;
        }
    };

    const ButtonComprarSalvar = () => {
        // Puxar o dado do localStorage e armazená-lo em uma variável
        const resultadoVerificacao = localStorage.getItem('resultadoVerificacao');

        // Verificar se resultadoVerificacao é verdadeiro
        if (resultadoVerificacao === 'true') {
            // Se for verdadeiro, exibir os botões de quantidade
            return (
                <>
                    <a href="#" className="add-cart buy-now" onClick={fecharCarrinho}>
                        Comprar Agora
                    </a>
                    <a href="#" className="add-cart" onClick={handleAddCart}>
                        Salvar
                    </a>
                </>
            );
        } else {
            return (
                <>
                </>
            );
        }
    };

    return (
        <Provider>
            <>
                <Navbar />
                <div className="product-page-container">
                    <span className="link-route">
                        <a href={'Home'}>Home</a> {'>'} <a href="#">Tenis Campus</a>
                    </span>
                    <section id="product-page">
                        <div className="product-page-img">
                            <div className="product">
                                <div>
                                    <div>
                                        <img src={n3} alt="Product image" js-selector="image-container" />
                                    </div>
                                </div>
                                <div>
                                    <button className="btnt active" js-class="image-button">
                                        <img src={n3} alt="Product Image" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="product-page-details">
                            <strong>{productName}</strong>
                            <span className="product-category">Nike - Casual</span>
                            <span className="price">R$ {productPrice}</span>
                            <p className="price">SubTotal R$ {valTotal}.00</p>
                            <div>
                                <div className="quantity-container">
                                    {productTam && <QuantityButtons
                                        handleDecreaseQuantity={handleDecreaseQuantity}
                                        handleQuantityChange={handleQuantityChange}
                                        handleIncreaseQuantity={handleIncreaseQuantity}
                                        selectedQuantity={selectedQuantity}
                                    />}

                                    <form>
                                        <select
                                            name="tamanho"
                                            value={selectedSize}
                                            onChange={handleSizeChange}
                                        >
                                            {/* Verifique se productTam é definido antes de chamar Object.keys */}
                                            {productTam && Object.keys(productTam).map((size) => (
                                                <option key={size} value={size}>
                                                    {size}
                                                </option>
                                            ))}
                                        </select>

                                    </form>
                                </div>
                            </div>
                            <p>O <em>Tênis Campus Youth of Paris</em> é uma colaboração exclusiva que une o estilo atemporal do Tênis Campus com a expressão artística única da Youth of Paris. Com detalhes marcantes e materiais premium, este tênis é uma peça de destaque para os amantes da moda urbana.</p>
                            <section>
                                <div class="text-warning mb-1 me-2">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span class="ms-1">
                                        4.5
                                    </span>
                                </div>
                            </section>
                            <br />

                            <div class="cart-btns">
                                {ButtonComprarSalvar()}
                            </div>
                        </div>
                    </section>

                    <section className="product-all-info">
                        <ul className="product-info-menu">
                            <li className="p-info-list active" data-filter="heighlights">
                                Galeria
                            </li>
                            <li className="p-info-list" data-filter="materials">
                                Descrição
                            </li>
                            <li className="p-info-list" data-filter="howuse">
                                Materials
                            </li>
                        </ul>
                        <div className="info-container heighlights active">
                            <p>Carregando...</p>
                        </div>
                        <div className="info-container materials">
                            <p>O <em>Tênis Campus Youth of Paris</em> é o resultado de uma colaboração exclusiva, unindo a elegância clássica do Tênis Campus com a expressão artística distinta da Youth of Paris. Este tênis transcende as fronteiras entre moda e arte, proporcionando uma experiência única para os admiradores de calçados sofisticados.</p>

                            <p>A parte superior do tênis apresenta materiais premium, garantindo qualidade e durabilidade. Os detalhes marcantes, inspirados na estética parisiense contemporânea, conferem um toque de originalidade. A sola, além de oferecer conforto, contribui para a estética única deste calçado colaborativo.</p>

                            <p>Edição limitada e disponível em diferentes cores, o <em>Tênis Campus Youth of Paris</em> é mais do que um calçado; é uma obra de arte para os pés, celebrando a fusão entre moda e expressão criativa.</p>

                        </div>
                        <div className="info-container howuse">
                            <p><strong>1. Parte Superior:</strong></p>
                            <ul>
                                <li>Materiais premium para qualidade e durabilidade.</li>
                                <li>Detalhes marcantes inspirados na estética parisiense contemporânea.</li>
                            </ul>

                            <p><strong>2. Sola:</strong></p>
                            <ul>
                                <li>Conforto aliado à estética única da colaboração.</li>
                                <li>Contribui para a originalidade do design.</li>
                            </ul>

                            <p>O <em>Tênis Campus Youth of Paris</em> é uma declaração de estilo, representando a fusão exclusiva entre a tradição do Tênis Campus e a inovação artística da Youth of Paris.</p>
                        </div>
                    </section>
                </div>
                <br />
                <Footer />

                <Helmet>
                    <script type="text/javascript">
                        {`
            //only one color select
            $(document).ready(function(){
              $('input:checkbox').click(function(){
                $('input:checkbox').not(this).prop('checked', false);
              });
            });
            //product info menu
            $(document).on('click','.product-info-menu li', function(){
              $(this).addClass('active').siblings().removeClass('active')
            });
            //product-info-filter
            $(document).ready(function(){
              $('.p-info-list').click(function(){
                const value = $(this).attr('data-filter');
                if(value == 'all'){
                  $('.info-container').filter('.'+value).show('1000');
                }
                else{
                  $('.info-container').not('.'+value).hide('1000');
                  $('.info-container').filter('.'+value).show('1000');
                }
              });
            });
          `}
                    </script>
                </Helmet>

                <Helmet>
                    <script>
                        {`
            (() => {
              var buttonImages = Array.from(document.querySelectorAll('[js-class="image-button"]'));
              var imageContainer = document.querySelector('[js-selector="image-container"]');
              buttonImages.forEach(item => {
                item.onclick = () => {
                  if(item.className.includes('inactive')) {
                    var active = document.querySelector('.active');
                    active.className = "btnt inactive";
                    item.className = item.className.replace('inactive', 'active');
                    imageContainer.src = item.querySelector('img').src;
                  }
                }
              })
            })()
          `}
                    </script>
                </Helmet>
            </>
            <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </Provider>
    );
}
