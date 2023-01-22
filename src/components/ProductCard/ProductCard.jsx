import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaPlusCircle } from 'react-icons/fa'

import { addItem } from '../../features/cart/cartSlice'

import { switchClass } from '../../utils'

import './productCard.css'

function ProductCard(props) {
    const { currency, activeFilters } = useSelector(state => state.data)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAdd = (e) => {
        e.preventDefault()

        dispatch(addItem({
            ...props,
            quantity: 1
        }))

        const cartBadge = document.querySelector('#cart-badge')
        
        if(cartBadge){
            cartBadge.classList.remove('blip')
        
            setTimeout(() => {
                cartBadge.classList.add('blip')
            }, 100)
        }
    }

    const handleSelect = (e) => {
        e.preventDefault()

        switchClass(document.querySelector('#shop'), 'slide-out', navigate, `/shop/${activeFilters.category}/${props.id}`)
    }

    return (
        <div className='product-grid-item'>
            
            <button onClick={handleSelect} className='product-link col'>
                <h3>{props.name}</h3>
                <div className='product-center grid'>
                    <div className='product-image'><img src={props.image}  alt='productimage' /></div>
                </div>
                <h3>{currency + props.price}</h3>
            </button>

            <div className='product-add w-fill flex flex-center'>
                <h4>ADD TO CART</h4>
                <button onClick={handleAdd} className='hover-scale'>
                    <FaPlusCircle className='product-add-icon' />
                </button>
            </div>
        </div>
    )
}

export default ProductCard