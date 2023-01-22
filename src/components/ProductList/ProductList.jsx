import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import ProductCard from '../ProductCard/ProductCard'
import Wrapper from '../Wrapper/Wrapper'

import './productList.css'

function ProductList({ products }) {
    const [productData, setProductData] = useState(null)

    const { categories, activeFilters } = useSelector(state => state.data)

    useEffect(() => {
        setProductData(
            products.map((item, i) => {
                return <ProductCard {...item} key={item.name + i} />
            })
        )
    }, [])

    const generateFilter = (filterData) => {
        const _options = []

        filterData.forEach((item, i) => {
            _options.push(
                <option key={'categories-'+ item + i} value={item}>{item}</option>
            )
        });

        return (
            <select>
                {[..._options]}
            </select>
        )
    }

    return (
        <div id='product-list' className='bg-white container'>
            <Wrapper>
                <div className='product-filter'>
                    <div className="filter-widget">
                        <h5>category</h5>
                        {generateFilter(categories)}
                    </div>
                    <div className="filter-widget">
                        <h5>price</h5>
                        {generateFilter(categories)}
                    </div>
                    <div className="filter-widget">
                        <h5>category</h5>
                        {generateFilter(categories)}
                    </div>
                    <div className="filter-widget">
                        <h5>results</h5>
                        {generateFilter(categories)}
                    </div>
                </div>
                <div className='product-grid'>
                    {productData?.length > 0 ? 
                        productData
                        : <h2>Coming Soon!</h2>
                    }
                </div>
            </Wrapper>
        </div>
    )
}

export default ProductList