import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import Wrapper from "../Wrapper/Wrapper"

import { removeItem } from "../../features/cart/cartSlice"

import './cartContents.css'

function CartItem(props) {
    const item = {...props}
    const [quantity, setQuantity] = useState(item.quantity)

    const { currency } = useSelector(state => state.data)

    const dispatch = useDispatch()

    useEffect(() => {
        console.log('cart item refreshed');
    }, [quantity])
    

    const handleChange = (e) => {
        setQuantity(e.target.value)
    }

    const handleUpdate = (e) => {
        e.preventDefault()

        const data = {
            ...item,
            quantity
        }

        dispatch(removeItem(data))
    }

    return (
        <li className="w-fill grid cart-product">
            <div className="cart-product-image">
                <img src={item.image} alt='product image' />
            </div>
            <div className="cart-product-name">
                <h3>{item.name}</h3>
            </div>
            <div className="cart-product-price">
                <h3>{currency + item.price}</h3>
            </div>
            <div className="cart-product-total-price">
                <h3>{currency + item.totalPrice}</h3>
            </div>
            <div className="cart-product-quantity">
                <input type={'number'} value={quantity} onChange={handleChange} min={0} />
            </div>
            <div className="cart-product-update">
                <button className="btn-long border round-corners hover-button" onClick={handleUpdate}>
                    UPDATE
                </button>
            </div>
        </li>
    )
}

function CartContents(props) {
    const [items, setItems] = useState(null)

    const { cartContents, cartPrice, currency } = props

    const navigate = useNavigate()

    const generateCartItems = (arr) => {
        return arr.map((item, i) => {
            return (
                <CartItem key={item.name} {...item} />
            )
        })
    }

    useEffect(() => {
        console.log('cart list refreshed');
        setItems(
            generateCartItems(cartContents)
        )
    }, [props])

    const handleNavigate = (e, dest) => {
        e.preventDefault()

        navigate(dest)
    }

    return (
        <div className="bg-white container" >
            <Wrapper>
                <div className="w-90 m-auto">
                    <h2 className="w-fill txt-center spacer">CART</h2>

                    {items?.length > 0 ? 
                        <>
                            <div className="grid cart-key txt-center">
                                <div className="cart-product-image">
        
                                </div>
                                <div className="cart-product-name">
                                    <h4>Product name</h4>
                                </div>
                                <div className="cart-product-price">
                                    <h4>Product price</h4>
                                </div>
                                <div className="cart-product-total-price">
                                    <h4>Product total</h4>
                                </div>
                                <div className="cart-product-quantity">
                                    <h4>Quantity</h4>
                                </div>
                                <div className="cart-product-update">
                                    
                                </div>
                            </div>
        
                            <ul className="cart-list px-4">
                                {items}
                            </ul>
                        </>
                        : 
                        <div className=" spacer w-fill txt-center"><h2>Nothing in cart yet!</h2></div>
                    }

                    <div className="flex col">
                        <div className="spacer flex col flex-end">
                            {items?.length > 0 ?
                                <>
                                    <div className="flex flex-center col">
                                        <h3>Subtotal: {currency + cartPrice}</h3>
                                        <aside>Shipping and tax calculated at checkout</aside>
                                    </div>
                                    <button 
                                        className="m-1 btn-long border round-corners hover-button-rev" 
                                        onClick={e => handleNavigate(e, '/checkout')}
                                    >
                                        CHECKOUT
                                    </button>
                                </>
                                : null
                            }
                            <button 
                                className="m-1 btn-long border round-corners hover-button-rev" 
                                onClick={e => handleNavigate(e, '/categories')}
                            >
                                CONTINUE SHOPPING
                            </button>
                        </div>
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default CartContents