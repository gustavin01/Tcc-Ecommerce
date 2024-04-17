import React from 'react';
import "../estilo/style.css";
import "../estilo/swiper-bundle.min.css";

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

export default function Offer() {
      return (
        <>
        <section id="popular-product">
                <div className="popular-heading">
                    <h3>Melhores Ofertas</h3>
                    <a>Todas</a>
                </div>

                <div className="popular-container">

                    <div className="popular-box">
                        <a href="ProdDesc" className="popular-box-img">
                            <img src={n1} />
                        </a>
                        <div className="popular-box-text">
                            <a href="ProdDesc">Chuteira Nike Mercurial Zoom Vapor 15 Elite Campo</a>
                            <span className="p-category">Nike</span>
                            <span className="p-price">R$ 890,00 <del>1590,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="prodtadizero" className="popular-box-img">
                            <img src={n2} />
                        </a>
                        <div className="popular-box-text">
                            <a href="prodtadizero">TÊNIS ADIZERO ADIOS PRO 3.0</a>
                            <span className="p-category">Adidas</span>
                            <span className="p-price">R$ 1450,00 <del>1250,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="prodtcampusf" className="popular-box-img">
                            <img src={n3} />
                        </a>
                        <div className="popular-box-text">
                            <a href="prodtcampusf">TÊNIS CAMPUS YOUTH OF PARIS</a>
                            <span className="p-category">Adidas</span>
                            <span className="p-price">R$ 1090,00 <del>1790,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="prodforumb" className="popular-box-img">
                            <img src={n4} />
                        </a>
                        <div className="popular-box-text">
                            <a href="prodforumb">TÊNIS FORUM BOLD X ANDRÉ SARAIVA</a>
                            <span className="p-category">Adidas</span>
                            <span className="p-price">R$ 2100,00 <del>3100,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="prodtcampus00s" className="popular-box-img">
                            <img src={n5} />
                        </a>
                        <div className="popular-box-text">
                            <a href="prodtcampus00s">TÊNIS CAMPUS 00S</a>
                            <span className="p-category">Puma</span>
                            <span className="p-price">R$ 1560,00 <del>2060,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="prodjordan1" className="popular-box-img">
                            <img src={n6} />
                        </a>
                        <div className="popular-box-text">
                            <a href="prodjordan1">Tênis Air Jordan 1 Elevate High Feminino</a>
                            <span className="p-category">Nike</span>
                            <span className="p-price">R$ 1980,00 <del>2580,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="prodforum84" className="popular-box-img">
                            <img src={n7} />
                        </a>
                        <div className="popular-box-text">
                            <a href="prodforum84">TÊNIS FORUM 84 HIGH</a>
                            <span className="p-category">Adidas</span>
                            <span className="p-price">R$ 4710,00 <del>7110,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="prodfastfwd" className="popular-box-img">
                            <img src={n8} />
                        </a>
                        <div className="popular-box-text">
                            <a href="prodfastfwd">TÊNIS FAST-FWD NITRO ELITE RUN 75 MASCULINO</a>
                            <span className="p-category">Puma</span>
                            <span className="p-price">R$ 3800,00 <del>4200,00</del></span>
                        </div>
                    </div>

                    <div className="popular-box">
                        <a href="proddiscblaze" className="popular-box-img">
                            <img src={n9} />
                        </a>
                        <div className="popular-box-text">
                            <a href="proddiscblaze">TÊNIS DISC BLAZE SNAKE</a>
                            <span className="p-category">Puma</span>
                            <span className="p-price">R$ 2400,00 <del>3900,00</del></span>
                        </div>
                    </div>
                    </div>
                </section>
            </>
    )
}
