import React from 'react';
import Navbar from './navbar';
import Footer from './footer';

const Sobre = () => {
    return (
        <> <Navbar />
            <div>
                <header><br/>
                <h1 style={{ color: 'black' }}>Bem-vindo à GUYA</h1>
                </header><br/>

                <section>
                    <h2>Nossa História</h2>
                    <p>
                        Fundada em 2022, a GUYA é uma boutique online que nasceu da paixão por produtos excepcionais e exclusivos. Desde o início, buscamos criar um espaço onde a qualidade e a sofisticação se encontram. Ao longo dos anos, desenvolvemos parcerias com as marcas mais renomadas e designers de prestígio, garantindo que cada item em nossa coleção conte uma história única.
                    </p>
                </section><br/>

                <section>
                    <h2>O Que Nos Torna Exclusivos</h2>
                    <p>
                        Na GUYA, acreditamos que a verdadeira elegância está na exclusividade. Nossos produtos são escolhidos a dedo para oferecer a você uma experiência de compra diferenciada. Trabalhamos de perto com artesãos e criadores, buscando constantemente a inovação e a qualidade impecável. Cada peça em nosso catálogo é uma expressão de estilo e distinção.
                    </p>
                </section><br/>

                <section>
                    <h2>Nossos Produtos</h2>
                    <p>
                        Explore a coleção GUYA e descubra a beleza que vai além do ordinário. De roupas exclusivas a acessórios requintados e itens de decoração para casa, nossa variedade de produtos é cuidadosamente selecionada para atender aos gostos mais refinados. Cada compra na GUYA é uma oportunidade de elevar seu estilo e desfrutar do luxo autêntico.
                    </p>
                </section><br/>

                <section>
                    <h2>Contate-nos</h2>
                    <p>
                        Estamos aqui para tornar sua experiência na GUYA excepcional. Se tiver dúvidas sobre nossos produtos, precisar de recomendações personalizadas ou assistência, entre em contato conosco. Nosso compromisso é fornecer um atendimento ao cliente tão excepcional quanto nossos produtos. Utilize nosso formulário de contato ou ligue para nossa equipe dedicada.
                    </p>
                </section><br/><br/>
            </div>
            <Footer />
        </>

    );
};

export default Sobre;
