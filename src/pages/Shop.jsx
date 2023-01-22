import { Suspense, useEffect, useState } from "react"
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { Canvas } from "@react-three/fiber"

import Helmet from '../components/Helmet/Helmet'
import ProductList from "../components/3d/ProductList"

function Shop() {
    const [data, setData] = useState(null)
    
    const { products, activeFilters } = useSelector(state => state.data)

    const navigate = useNavigate()

    useEffect(() => {
        if(!activeFilters.category){
            navigate('/categories')
        } else {
            const filteredProducts = products.filter(item => item.category.toLowerCase() === activeFilters.category)
            setData(filteredProducts)
        }

    }, [])

    return (
        <>
            <Helmet title='Shop' />
            <section id="shop" className="slide-up">
                <Canvas>
                    <ambientLight intensity={0.1} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-5, -10, -10]} />
                    
                    <Suspense fallback={null}>                    
                        <ProductList products={data} />
                    </Suspense>
                </Canvas>
            </section>
        </>
    )
}

export default Shop