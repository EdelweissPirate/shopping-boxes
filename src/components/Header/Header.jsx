import { FaStar, FaUserAlt, FaShoppingCart } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './header.css'

function Header() {
    const navigate = useNavigate()

    const { user } = useSelector(state => state.auth)
    const { totalQuantity } = useSelector(state => state.cart)
    
    const handleNavigate = (e, dest) => {
        e.preventDefault()

        navigate(dest)
    }
    
    return (
        <header>
            <div className='header-holder'>
                <div className='header-icon header-logo flex flex-center'>
                    <button onClick={e => {handleNavigate(e, '/')}}>
                        <FaStar />
                    </button>
                </div>
                <div className='header-icon header-login flex flex-center'>
                    <button onClick={e => {handleNavigate(e, user ? '/account' : '/login')}}>
                        <FaUserAlt />
                    </button>

                    {user ?
                        <div className='badge badge-login'></div>
                        : null
                    }
                </div>
                <div className='header-icon header-cart flex flex-center'>
                    <button onClick={e => {handleNavigate(e, '/cart')}} >
                        <FaShoppingCart />
                        {totalQuantity > 0 ?
                        <div id='cart-badge' className='badge badge-cart blip'>
                            <p>{totalQuantity < 100 ? totalQuantity : 99}</p>
                        </div>
                        : null
                    }
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Header