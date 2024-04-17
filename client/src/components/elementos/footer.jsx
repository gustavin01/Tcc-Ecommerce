import "../estilo/style.css";
import master from "../../images/master_card.png"
import paypal from "../../images/paypal.png"
import ebay from "../../images/ebay.png"
import visa from "../../images/visa.png"
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer(){
    return(
        <footer>
            <div className="footer-payment">
                <div className="footer-payment-logos">
                    <img src={master} />
                    <img src={paypal} />
                    <img src={ebay} />
                    <img src={visa} />
                </div>
                <strong>Método 100% Seguro de Pagamento.</strong>
            </div>
            <div className="footer-container">
                <div className="footer-company-box">
                    <a href="#" className="footer-logo">Guya</a>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae.</p>
                    <div className="footer-social">
                        <a href="#"><FaFacebook/></a>
                        <a href="#"><FaInstagram/></a>
                        <a href="#"><FaYoutube/></a>
                        <a href="#"><FaTwitter/></a>
                    </div>
                </div>
                <div className="footer-link-box">
                    <strong>Links Principais</strong>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Quem somos</a></li>
                        <li><a href="#">Contato</a></li>
                        <li><a href="#">Perguntas</a></li>
                    </ul>
                </div>
                <div className="footer-link-box">
                    <strong>Links Externos</strong>
                    <ul>
                        <li><a href="#">Nossos Produtos</a></li>
                        <li><a href="#">Politica de Privacidade</a></li>
                        <li><a href="#">Aviso</a></li>
                        <li><a href="#">Termos e Condições</a></li>
                    </ul>
                </div>
                <div className="footer-subscribe">
                    <strong>Inscreva-se Agora</strong>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                    <div className="subscribe-box">
                        <input type="email" placeholder="Example@gmail.com" required/>
                        <button>Inscrever</button>
                    </div>
                </div>
    
            </div>
            <div className="footer-bottom">
                <span className="footer-owner">Feito pela Equipe GUYA</span>
                <span className="copyright">© Copyright 2023 - GUYA Ltda</span>
            </div>
        
        </footer>
    )
}