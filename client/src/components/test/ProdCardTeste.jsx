import React from 'react';
import { BsFillCartPlusFill } from 'react-icons/bs';
import "../estilo/style.css";

const ProdCardTeste = ({ data }) => {
    return (
        <div className="new-product-box-wrapper">
            {data && (
                <div className="new-product-box">
                    <span>{data.nome_marca}</span>
                    <img src={`http://127.0.0.1:3001/uploads/${data.nome_imagemM}`} />
                    <div className="new-product-text">
                        <h4>R$ {data.valor},00</h4>
                        <h2 className="new-product-title">{data.nome}</h2>
                    </div>
                    <section className="product-card">
                        <div className="card__infos">COMPRAR</div>
                        <button type="button" className="button__add-cart">
                            <BsFillCartPlusFill />
                        </button>
                    </section>
                </div>
            )}
        </div>
    );
}

export default ProdCardTeste;
