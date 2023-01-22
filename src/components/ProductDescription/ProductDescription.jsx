import { FaStar } from 'react-icons/fa'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

import Wrapper from '../Wrapper/Wrapper';

import { switchClass } from '../../utils';

import './productDescription.css'

function ProductDescription({ data }) {
    const [quantity, setQuantity] = useState(1)
    
    const { id, name, category, image, description, price, reviews } = data
    const { currency } = useSelector(state => state.data)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleAdd = (e) => {
        e.preventDefault()

        const itemToAdd = {
            id,
            name,
            category,
            price,
            image,
            quantity
        }

        dispatch(addItem(itemToAdd))

        const cartBadge = document.querySelector('#cart-badge')
        
        if(cartBadge){
            cartBadge.classList.remove('blip')
        
            setTimeout(() => {
                cartBadge.classList.add('blip')
            }, 100)
        }
    }    

    const handleNavigate = (e, dest) => {
        e.preventDefault()

        if(dest === 'Home'){
            navigate('/')
        } else {
            navigate(`/shop/${category}`)
        }
    }
    
    return (
        <div id='product-description' className="container h-fill m-auto">
            <Wrapper>
                <div className="m-auto grid info-grid w-80">
                    
                    <div className="description-title flex row">
                        <h2>{name}</h2>
                        {/* <span className='flex row px-1' style={{fontStyle: 'italic'}}>
                            <button onClick={e => {handleNavigate(e, 'Home')}}>Home/</button>
                            <button onClick={e => {handleNavigate(e, 'Cat')}}>{category}</button>
                        </span> */}
                    </div>
                    
                    <div className="description-image"><img src={image} /></div>

                    <div className="description-info flex flex-center col">
                            <h3 className='active py-1'>Description</h3>
                            {description}
                    </div>

                    <div className="description-price">
                        {currency + price + '.00'}
                    </div>

                    <div className="add-to-cart">
                        <div className='quantity-input flex col'>
                            <label>Quantity</label>
                            <div className="w-fill">
                                <input type="number" name="quantity" min="1" step="1" value={quantity} onChange={e => setQuantity(e.target.value)} ></input>
                            </div>
                        </div>
                        <button className="btn-round hover-button" onClick={handleAdd}>ADD TO CART</button>
                    </div>

                    <div className="description-review flex flex-center col">
                        <h3 className='py-1'>Reviews</h3>
                        {reviews.map((item, i) => {
                            const _stars = new Array(item.rating).fill(0)
                            
                            return (
                                <div key={item + i} className='flex col' >
                                    <h4>{item.author}</h4>
                                    <h5>{item.date}</h5>
                                    <div className='review-stars flex row'>
                                        {_stars.map((star, i) => {
                                            return <FaStar  key={item.author + '_star_' + i} />
                                        })}
                                    </div>
                                    <p>{item.content}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </Wrapper>
        </div>
    )
}

export default ProductDescription