import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import Helmet from "../components/Helmet/Helmet"
import ProductDescription from "../components/ProductDescription/ProductDescription"

function ShopItem() {
    const [data, setData] = useState(null)  

    const { id } = useParams()
    const { products } = useSelector(state => state.data)  

    useEffect(() => {
        const filteredProduct = products.filter(item => Number(item.id) === Number(id))
        setData(filteredProduct)
    }, [])

    return (
        <>
            <Helmet title='shop' />
            <section id="ShopItem" className="fade-in">
                {data ? <ProductDescription data={data[0]} /> : 'Missing item description!'}
            </section>
        </>
    )
}

export default ShopItem