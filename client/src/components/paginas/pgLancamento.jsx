import React from 'react';
import "../estilo/style.css";
import Navbar from '../elementos/navbar';
import ProdutoFilter from './produtoFilter';
import Footer from '../elementos/footer';
import Provider from '../api/Provider';
import Cart from '../carrinho/Cart';
import CatalogoDi from '../dinamico/catalogo';

export default function PgLancamento() {
    return (
        <Provider>
            <>
                <Navbar />
                <CatalogoDi />
                <br />
                <Footer />
                <Cart />
            </>
        </Provider>

    )
}