import {FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCheckSquare} from 'react-icons/fa'

export default function BarLateral() {
    return (
        <>
                <li className='nav-item '>                    
                    <a href={"homeadm"} className='nav-link text-white'>
                        <FaSafari/> <span className='ms-1'>Pagina Inicial</span>
                    </a>
                </li>

                <li className='nav-item '>                    
                    <a href={"pgcadprodadm"} className='nav-link text-white'>
                        <FaCartArrowDown/> <span className='ms-1'>Add Produtos</span>
                    </a>
                </li>

                <li className='nav-item '>                    
                    <a href={"pgcompratb"} className='nav-link text-white'>
                        <FaTasks/> <span className='ms-1'>Ver Compras</span>
                    </a>
                </li>

                <li className='nav-item '>                    
                    <a href={"pgadmproduto"} className='nav-link text-white'>
                        <FaTasks/> <span className='ms-1'>Ver Produto</span>
                    </a>
                </li>

                <li className='nav-item '>                    
                    <a href={"pgadmestoque"} className='nav-link text-white'>
                        <FaTasks/> <span className='ms-1'>Ver Estoque</span>
                    </a>
                </li>

                <li className='nav-item '>                    
                    <a href={"pgadmmov"} className='nav-link text-white'>
                        <FaTasks/> <span className='ms-1'>Ver Movimentação</span>
                    </a>
                </li>

        </>
    )
}