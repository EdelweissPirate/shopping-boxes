import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home'
import Categories from '../pages/Categories'
import Shop from '../pages/Shop'
import ShopItem from '../pages/ShopItem'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import Login from '../pages/Login'
import Account from '../pages/Account'
import Register from '../pages/Register'

function Routers({ children }) {
    return (
        <Router>
            {children}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/shop/:category' element={<Shop />} />
                <Route path='/shop/:category/:id' element={<ShopItem />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path='/login' element={<Login />} />
                <Route path='/account/:username' element={<Account />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    )
}

export default Routers