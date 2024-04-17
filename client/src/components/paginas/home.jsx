import bFT from "../../images/bFT.png";

import "../estilo/style.css";
import "../estilo/swiper-bundle.min.css";
import Footer from "../elementos/footer";
import Banner from "../banner/banner"

import React, { Component } from 'react';
import ProdutoFilter from "./produtoFilter"
import Navbar from "../elementos/navbar";
import Offer from "./offer";
import Provider from "../api/Provider"
import Cart from "../carrinho/Cart"
import CatalogoDi from "../dinamico/catalogo";

export default function Home() {
    return (
        <Provider>
            <><Navbar /><>
                <section id="main">
                    <Banner />
                </section>
                <br />
                <section className="image-container">
                    <img src={bFT} alt="Imagem" />
                </section>

                <CatalogoDi />

                <section className="product-grid-3">
                </section>

            </>
                <Footer />
            </>
            <Cart />
        </Provider>
    )
}