import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import merc1 from '../imgproduto/merc1.jpg';
import merc2 from '../imgproduto/merc2.jpg';
import merc3 from '../imgproduto/merc3.jpg';
import './produto.css';
import Footer from '../elementos/footer';
import Navbar from '../elementos/navbar';
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Provider from "../api/Provider";
import Cart from "../carrinho/Cart";
import AppContext from '../api/AppContext';
import fetchProducts from '../api/fetchProducts';

let numeroStorage = parseInt(localStorage.getItem('numero'), 13) || 32;

export default function ProdDescTeste({ data }) {
    const { products, setProducts, loading, setLoading } = useContext(AppContext);
    const [forceUpdate, setForceUpdate] = useState(false);
    const [product, setProduct] = useState();
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productName, setProductName] = useState();
    const [productPrice, setProductPrice] = useState();
    const [productQtde, setProductQtde] = useState();
    const [productTam, setProductTam] = useState();

    const [selectedSize, setSelectedSize] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const { cartItems, setCartItems } = useContext(AppContext);

    useEffect(() => {
        setSelectedProductId(85);

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
                    setSelectedSize(initialSize || '');
                    setSelectedQuantity(1);
                }

                setLoading(false);
                setForceUpdate((prev) => !prev);
            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }

        fetchProductsAsync();
    }, [selectedProductId, setProducts, setLoading]);

    const [preferenceId, setPreferenceId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [numero, setNumero] = useState(numeroStorage);

    console.log("numeros: ", numero);

    initMercadoPago("TEST-af584e0f-46f2-41b5-a361-45f16749075f");

    const createPreference = async () => {
        try {
            const response = await axios.post("http://localhost:3001/create_preference", {
                description: `Tam. ${selectedSize} | ${productName}`,
                price: parseFloat(productPrice), // Use o preço do produto, se necessário
                quantity: selectedQuantity,
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

    const handleIncreaseQuantity = () => {
        // Verifica se a quantidade selecionada é menor que o limite máximo para o tamanho escolhido
        const maxQuantity = selectedSize ? productTam[selectedSize] || 1 : 1;

        if (selectedQuantity < maxQuantity) {
            setSelectedQuantity(selectedQuantity + 1);
        }
    };

    const handleDecreaseQuantity = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(selectedQuantity - 1);
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

    const handleSizeChange = (event) => {
        const newSize = event.target.value;
        // Certifica-se de que o tamanho selecionado esteja entre os tamanhos disponíveis
        if (Object.keys(productTam).includes(newSize)) {
            setSelectedSize(newSize);
            // Ajusta a quantidade se a quantidade selecionada for maior do que a disponível para o novo tamanho
            const maxQuantity = productTam[newSize] || 1;
            if (selectedQuantity > maxQuantity) {
                setSelectedQuantity(maxQuantity);
            }
        }
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

    /*/const handleAddCart = async () => {
        const productToAdd = { ...product };

        if (productToAdd && productToAdd.id_produto) {

            const existingItem = cartItems.find((item) => item.id_produto === productToAdd.id_produto);

            try {
                if (existingItem) {
                    console.log("Dados a serem enviados:", {
                        IdProduto: selectedProductId,
                        Size: selectedSize,
                        Quantity: selectedQuantity,
                    });

                    await axios.put(`http://localhost:3001/sizeQuantity`, {
                        IdProduto: selectedProductId,
                        Size: selectedSize,
                        Quantity: selectedQuantity,
                    });
                    console.log("Produto já foi adicionado!");
                    window.location.reload();
                } else {
                    console.log("Dados a serem enviados:", {
                        IdProduto: selectedProductId,
                        Size: selectedSize,
                        Quantity: selectedQuantity,
                    });

                    await axios.put(`http://localhost:3001/sizeQuantity`, {
                        IdProduto: selectedProductId,
                        Size: selectedSize,
                        Quantity: selectedQuantity,
                    });

                    const updatedCart = [...cartItems, productToAdd];
                    setCartItems(updatedCart);
                    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
                    console.log("Produto adicionado ao carrinho!");
                    window.location.reload();
                }
            } catch (error) {
                console.error("Erro ao adicionar ao carrinho:", error.message);
            }
        } else {
            console.error("ID do produto não está definido");
        }
    }; */

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
            alert('Erro ao adicionar o produto ao carrinho');
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

    return (
        <Provider>
            <>
                <Navbar />
                <div className="product-page-container">
                    <span className="link-route">
                        <a href={'Home'}>Home</a> {'>'} <a href="#">Mercurial Zoom</a>
                    </span>
                    <section id="product-page">
                        <div className="product-page-img">
                            <div className="product">
                                <div>
                                    <div>
                                        <img src={merc1} alt="Product image" js-selector="image-container" />
                                    </div>
                                </div>
                                <div>
                                    <button className="btnt active" js-class="image-button">
                                        <img src={merc1} alt="Product Image" />
                                    </button>
                                    <button className="btnt inactive" js-class="image-button">
                                        <img src={merc2} alt="Product Image" />
                                    </button>
                                    <button className="btnt inactive" js-class="image-button">
                                        <img src={merc3} alt="Product Image" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="product-page-details">
                            <strong>{productName}</strong>
                            <span className="product-category">Nike - Casual</span>
                            <span className="price">R$ {productPrice}</span>
                            <div>
                                <div className="quantity-container">
                                    <button onClick={handleDecreaseQuantity}>-</button>
                                    <input type="text" value={selectedQuantity} onChange={handleQuantityChange} />
                                    <button onClick={handleIncreaseQuantity}>+</button>

                                    <form>
                                        <label>Tamanho: </label>
                                        <select
                                            name="tamanho"
                                            value={selectedSize}
                                            onChange={handleSizeChange}
                                        >
                                            {/* Renderizar as opções de tamanho disponíveis */}
                                            {Array.from({ length: 14 }, (_, index) => 32 + index).map((num) => (
                                                <option key={num} value={num}>
                                                    {num}
                                                </option>
                                            ))}
                                        </select>
                                    </form>
                                </div>
                            </div>
                            <p>A <em>Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo</em> é uma inovação em calçados esportivos, oferecendo desempenho excepcional no campo. Com design aerodinâmico e materiais de alta tecnologia, esta chuteira proporciona agilidade, tração e conforto para jogadores de elite.</p>
                            <section>
                                <div class="text-warning mb-1 me-2">
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fa fa-star"></i>
                                    <i class="fas fa-star-half-alt"></i>
                                    <span class="ms-1">
                                        4.9
                                    </span>
                                </div>
                            </section>
                            <br />

                            {preferenceId && <Wallet initialization={{ preferenceId }} />}

                            <div class="cart-btns">
                                <a href="#" class="add-cart buy-now" onClick={fecharCarrinho}>Comprar Agora</a>
                                <a href="#" class="add-cart" onClick={() => handleAddCart()}>Salvar</a>
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
                            <p>A <em>Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo</em> representa o ápice da tecnologia em calçados esportivos. Projetada para oferecer desempenho excepcional em campos de futebol, esta chuteira combina um design aerodinâmico com materiais de alta qualidade.</p>

                            <p>A parte superior apresenta tecnologia avançada para um ajuste preciso, oferecendo suporte e controle superiores da bola. A sola inovadora proporciona tração excepcional, permitindo movimentos rápidos e ágeis em campo. Além disso, a palmilha anatômica e a construção leve garantem conforto durante toda a partida.</p>

                            <p>Seja para dribles rápidos, chutes precisos ou sprints velozes, a <em>Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo</em> é a escolha definitiva para jogadores que buscam o melhor em termos de tecnologia, estilo e desempenho.</p>

                        </div>
                        <div className="info-container howuse">
                            <p><strong>1. Parte Superior:</strong></p>
                            <ul>
                                <li>Tecido sintético de alta qualidade para ajuste preciso.</li>
                                <li>Tecnologia avançada para suporte e controle da bola.</li>
                            </ul>

                            <p><strong>2. Sola:</strong></p>
                            <ul>
                                <li>Sola inovadora para tração excepcional em campos de futebol.</li>
                                <li>Design que permite movimentos rápidos e ágeis.</li>
                            </ul>

                            <p><strong>3. Conforto:</strong></p>
                            <ul>
                                <li>Palmilha anatômica para conforto durante toda a partida.</li>
                                <li>Construção leve para facilitar os movimentos.</li>
                            </ul>

                            <p>A <em>Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo</em> redefine a experiência de jogo, proporcionando o equilíbrio perfeito entre estilo e desempenho no campo.</p>

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
