import n1 from "../../images/n1.png"
import n2 from "../../images/n2.png"
import n3 from "../../images/n3.png"
import n4 from "../../images/n4.png"
import n5 from "../../images/n5.png"
import n6 from "../../images/n6.png"
import n7 from "../../images/n7.png"
import n8 from "../../images/n8.png"
import n9 from "../../images/n9.png"
import n10 from "../../images/n10.png"
import airf1 from "../imgproduto/airf1.jpg"
import ach221 from "../imgproduto/ach221.jpg"


import React, { useContext } from 'react';
import "../estilo/style.css";
import "../estilo/swiper-bundle.min.css";
import { Helmet } from "react-helmet";
import ProductCard from "../catalogo/ProductCard"
import AppContext from "../api/AppContext";
import fetchProducts from "../api/fetchProducts";


const ProdutoFilter = ({ onUpdateCart }) => {
    const { cartItems, setCartItems } = useContext(AppContext);

    const handleAddToCart = (productId) => {
        console.log(`Adicionando ao carrinho: ${productId}`);

        const updatedItems = [...cartItems, { /* novo item */ }];
        setCartItems(updatedItems);
        onUpdateCart(updatedItems);
    };

    return (
        <section id="new_products">
            <div className="new-p-heading">
                <h3>Novos Produtos</h3>
                <ul>
                    <li className="filter-list active" data-filter="all">Todos</li>
                    <li className="filter-list" data-filter="nike">Nike</li>
                    <li className="filter-list" data-filter="adidas">Adidas</li>
                    <li className="filter-list" data-filter="puma">Puma</li>
                </ul>
            </div>

            <div className="new-product-container">
                <div className="new-product-box-wrapper nike">
                    <div className="new-product-box">
                        <a href="ProdDesc" className="new-product-img">
                            <span>Nike</span>
                            <img src={n1} />
                        </a>
                        <div className="new-product-text">
                            <a href="ProdDesc" className="new-product-title">Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo</a>
                            <span>R$ 890,00</span>
                            <ProductCard data={{ id_produto: 22, img: n1, nome: "Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo", valor: 890.00 }} onAddToCart={handleAddToCart} />
                        </div>
                    </div>
                </div>


                

            </div>
            <Helmet>
                <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
                <script>
                    {`
                var selector = '.new-p-heading li';

                $(selector).on('click', function(){
                    $(selector).removeClass('active');
                    $(this).addClass('active');
                });

                $(document).ready(function(){
                    $('.filter-list').click(function(){
                    const value = $(this).attr('data-filter');
                    if(value == 'all'){
                        $('.new-product-box-wrapper').show('1000');
                    }
                    else{
                        $('.new-product-box-wrapper').not('.'+value).hide('1000');
                        $('.new-product-box-wrapper').filter('.'+value).show('1000');
                    }
                    });
                });
                `}
                </script>
            </Helmet>

        </section>
    );
};

export default ProdutoFilter;