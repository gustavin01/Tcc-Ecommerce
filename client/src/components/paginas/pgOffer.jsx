import React from 'react';
import "../estilo/style.css";
import "../estilo/swiper-bundle.min.css";
import Navbar from "../elementos/navbar";
import Offer from './offer';
import Footer from '../elementos/footer';
import Provider from '../api/Provider';

export default function PgOffer() {
    return (
        <Provider>
            <>
                <Navbar />
                <Offer />
                <br />
                <Footer />
            </>
        </Provider>

    )
}
