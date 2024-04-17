import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React, { useState } from "react";
import Login from './components/cadLogin/login';
import Navbar from './components/elementos/navbar';
import Home from './components/paginas/home';
import Footer from './components/elementos/footer';
import Banner from './components/banner/banner';
import ProdutoFilter from './components/paginas/produtoFilter';
import Testimonials from './components/elementos/testimonials';
import Offer from './components/paginas/pgOffer';
import ProdAirf from './components/produtodetalhes/prodairf';
import ProdDesc from './components/produtodetalhes/proddesc';
import ProdAch22 from './components/produtodetalhes/prodachi22';
import CadUsuario from './components/cadLogin/cadUsuario';
import PgOffer from './components/paginas/pgOffer';
import PgLancamento from './components/paginas/pgLancamento';
import DadosUsuario from './components/usuario/dadosUsuario';
import ProdTAdizero from './components/produtodetalhes/prodtadizero';
import Aprovado from './components/mp/aprovado';
import Pendente from './components/mp/pedente';
import Recusado from './components/mp/recusado';
import Sobre from './components/elementos/sobre';

//Carrinho e Catalogo
import Catalogo from './components/catalogo/catalogo';
import Cart from './components/carrinho/Cart';
import CartButton from './components/carrinho/CartButton';
import CartItem from './components/carrinho/CartItem';
import Loading from './components/catalogo/Loading';
import Products from './components/catalogo/Products';
import Provider from './components/api/Provider';
import ProductCard from './components/catalogo/ProductCard';
import ProdTCampus from './components/produtodetalhes/prodtcampus005';
import ProdForumB from './components/produtodetalhes/prodforumb';
import ProdTCampus00s from './components/produtodetalhes/prodtcampus005';
import ProdTCampusF from './components/produtodetalhes/prodtcampus';
import ProdJordan1 from './components/produtodetalhes/prodjodan1';
import ProdForum84 from './components/produtodetalhes/prodforum84';
import ProdFastFwd from './components/produtodetalhes/propfastfwd';
import ProdDiscBlaze from './components/produtodetalhes/proddiscblaze';
import ProdChuSpeed from './components/produtodetalhes/prodchuspeed';
import CartButtonClose from './components/carrinho/CartButtonClose';
import ListPedidos from './components/mp/listPedidos';
import CartPage from './components/carrinho/CartPage';

//Dinamico
import CatalogoDi from './components/dinamico/catalogo';
import ProductCardDi from './components/dinamico/ProductCard';
import ProductsDi from './components/dinamico/Products';
import ProductNotFound from './components/dinamico/productNotFound';
import TestForm from './components/test/test';
import ImageUpload from './components/test/uploadImg';
import ProductForm from './components/test/uploadProduto';

//Admin
import AdmLogin from './components/admin/admLogin';
import BarAdmin from './components/admin/barAdmin';
import HomeAdm from './components/admin/homeAdm';
import AdmProduto from './components/admin/admProduto';
import AdmMovimentacao from './components/admin/admMov';
import PgAdmProduto from './components/admin/pgAdmProduto';
import BarLateral from './components/admin/barLateral';
import PgAdmMov from './components/admin/pgAdmMov';
import PgCadProdAdm from './components/admin/pgCadProdAdm';
import PgCadClienAdm from './components/admin/pgCadClienAdm';
import EstoqueModal from './components/admin/estoqueModal';
import EstoqueTable from './components/admin/admEstoque';
import PgAdmEstoque from './components/admin/pgAdmEstoque';
import CompraTable from './components/admin/admCompras';
import PgAdmCompras from './components/admin/pgAdmCompras';

// teste

import ProductFormer from './components/test/uploadProduto';
import ImageList from './components/test/imglist';
import ProdCardTeste from './components/test/prodCardTeste';
import ProductTeste from './components/test/ProductTeste';
import CatalagoTeste from './components/test/catalogoTeste';
import ProdDescTeste from './components/test/proddesc';
import GraficosTeste from './components/test/graficosTeste';
import GraphComponent from './components/test/GraphComponent';
import Pagina1 from './components/test/pag1';
import Pagina2 from './components/test/pag2';
import ProdAirfMPTeste from './components/test/prodairfTeste';
import ProdDescTeste2 from './components/test/proddescTeste2';
import CartPageTeste from './components/test/CartPageTeste';
import NavbarTeste from './components/test/navbarTeste';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/footer" element={<Footer />} />
          <Route exact path="/banner" element={<Banner />} />
          <Route exact path="/prodfilter" element={<ProdutoFilter />} />
          <Route exact path="/testimonials" element={<Testimonials />} />
          <Route exact path="/offer" element={<Offer />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/navbar" element={<Navbar />} />
          <Route exact path="/cadusuario" element={<CadUsuario />} />
          <Route exact path="/pgOffer" element={<PgOffer />} />
          <Route exact path="/offer" element={<Offer />} />
          <Route exact path="/pglancamento" element={<PgLancamento />} />
          <Route exact path="/dadosusuario" element={<DadosUsuario />} />
          <Route exact path="/prodcard" element={<ProductCard />} />

            // Produtos

          <Route exact path="/prodtadizero" element={<ProdTAdizero />} />
          <Route exact path="/prodtcampus" element={<ProdTCampus />} />
          <Route exact path="/prodforumb" element={<ProdForumB />} />
          <Route exact path="/prodtcampus00s" element={<ProdTCampus00s />} />
          <Route exact path="/prodtcampusf" element={<ProdTCampusF />} />
          <Route exact path="/prodjordan1" element={<ProdJordan1 />} />
          <Route exact path="/prodforum84" element={<ProdForum84 />} />
          <Route exact path="/prodfastfwd" element={<ProdFastFwd />} />
          <Route exact path="/proddiscblaze" element={<ProdDiscBlaze />} />
          <Route exact path="/prodchuspeed" element={<ProdChuSpeed />} />

          <Route exact path="/prodairf" element={<ProdAirf />} />
          <Route exact path="/proddesc" element={<ProdDesc />} />
          <Route exact path="/prodach22" element={<ProdAch22 />} />
          <Route exact path="/aprovado" element={<Aprovado />} />
          <Route exact path="/pendente" element={<Pendente />} />
          <Route exact path="/recusado" element={<Recusado />} />
          <Route exact path="/listpedidos" element={<ListPedidos />} />
          <Route exact path="/sobre" element={<Sobre />} />

            //Carrinho e Catalogo

          <Route exact path="/catalogo" element={<Catalogo />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/cartbutton" element={<CartButton />} />
          <Route exact path="/cartitem" element={<CartItem />} />
          <Route exact path="/loading" element={<Loading />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/provider" element={<Provider />} />
          <Route exact path="/cartbuttonclose" element={<CartButtonClose />} />
          <Route exact path="/cartpage" element={<CartPage />} />

          //Dinamico

          <Route exact path="/catadi" element={<CatalogoDi />} />
          <Route exact path="/procardi" element={<ProductCardDi />} />
          <Route exact path="/prodi" element={<ProductsDi />} />
          <Route exact path="/prodnotfound" element={<ProductNotFound />} />
          <Route exact path="/test" element={<TestForm />} />
          <Route exact path="/upload" element={<ImageUpload />} />
          <Route exact path="/upproduct" element={<ProductForm />} />

          //Admin

          <Route exact path="/admlogin" element={<AdmLogin />} />
          <Route exact path="/baradm" element={<BarAdmin />} />
          <Route exact path="/homeadm" element={<HomeAdm />} />
          <Route exact path="/admproduto" element={<AdmProduto />} />
          <Route exact path="/admmov" element={<AdmMovimentacao />} />
          <Route exact path="/pgadmproduto" element={<PgAdmProduto />} />
          <Route exact path="/pgadmmov" element={<PgAdmMov />} />
          <Route exact path="/barlateral" element={<BarLateral />} />
          <Route exact path="/pglancamento" element={<PgLancamento />} />
          <Route exact path="/pgcadprodadm" element={<PgCadProdAdm />} />
          <Route exact path="/pgcadclienadm" element={<PgCadClienAdm />} />
          <Route exact path="/estoquemodal" element={<EstoqueModal />} />
          <Route exact path="/estoquetb" element={<EstoqueTable />} />
          <Route exact path="/pgadmestoque" element={<PgAdmEstoque />} />
          <Route exact path="/compratb" element={<CompraTable />} />
          <Route exact path="/pgcompratb" element={<PgAdmCompras />} />

          //Teste

          <Route exact path="/imgTeste" element={<ImageList />} />
          <Route exact path="/pfTeste" element={<ProductFormer />} />
          <Route exact path="/pcTeste" element={<ProdCardTeste />} />
          <Route exact path="/pTeste" element={<ProductTeste />} />
          <Route exact path="/caTeste" element={<CatalagoTeste />} />
          <Route exact path="/pdTeste" element={<ProdDescTeste />} />
          <Route exact path="/graficoTeste" element={<GraficosTeste />} />
          <Route exact path="/GraphComponent" element={<GraphComponent />} />
          <Route exact path="/pagina1" element={<Pagina1 />} />
          <Route exact path="/pagina2" element={<Pagina2 />} />
          <Route exact path="/paTeste" element={<ProdAirfMPTeste />} />
          <Route exact path="/pd2Teste" element={<ProdDescTeste2 />} />
          <Route exact path="/cpTeste" element={<CartPageTeste />} />
          <Route exact path="/nvTeste" element={<NavbarTeste />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
