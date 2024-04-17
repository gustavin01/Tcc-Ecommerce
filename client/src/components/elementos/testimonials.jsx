import "../estilo/style.css";
import "../estilo/swiper-bundle.min.css";
import { Helmet } from "react-helmet";
import ttest from "../../images/t-member.jpg"
import t5 from "../../images/t-5.jpg"
import t1 from "../../images/t-1.jpg"
import logoGuya from "../../images/logo.png"

export default function Testimonials(){
    return(
        <>
        <section id="testimonials">

                <div className="testmonials-img">
                    <img src={logoGuya} />
                </div>

                <div className="testmonials-slider">

                    <div className="swiper mySwipertest">
                        <div className="swiper-wrapper">
                            <div className="swiper-slide">
                                <div className="testimonials-box">
                                    <div className="testimonials-box-text">
                                        <i className="fas fa-quote-left"></i>
                                        <p>Produto de extrema qualidade. Obrigado guya.</p>
                                        <strong>Jonas Gabriel</strong>
                                    </div>
                                    <div className="testimonials-box-img">
                                        <img src={t5} />
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="testimonials-box">
                                    <div className="testimonials-box-text">
                                        <i className="fas fa-quote-left"></i>
                                        <p>Finalmente eu tenho acesso a produtos de extrema dentro do brasil. #GuyaForever.</p>
                                        <strong>Larica Barbosa</strong>
                                    </div>
                                    <div className="testimonials-box-img">
                                        <img src={ttest} />
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-slide">
                                <div className="testimonials-box">
                                    <div className="testimonials-box-text">
                                        <i className="fas fa-quote-left"></i>
                                        <p>È simplemente inacreditavel. eu posso adquirir um Produto exclusivo de lancamento internacional em alguns poucos cliques. Valeu Guya.</p>
                                        <strong>Fredo Barrucão</strong>
                                    </div>
                                    <div className="testimonials-box-img">
                                        <img src={t1} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    <div className="swiper-pagination"></div>
                    </div>

                </div>
        
                </section>
            <Helmet>
            <script src="../js/swiper-bundle.min.js" type="text/javascript" />
                <script type="text/javascript">
                {`
                var swiper = new Swiper(".mySwipercard", {
                    slidesPerView: 1,
                    spaceBetween: 10,
                    pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                    },
                    breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween:20,
                    },
                    },
                });

                var swiper = new Swiper(".mySwipertest", {
                    pagination: {
                    el: ".swiper-pagination",
                    },
                });
                `}
                </script>
            </Helmet>
        </>
    )
}