import { Suspense, useRef, useEffect, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { ScrollControls, Scroll, useScroll, Text, useTexture } from '@react-three/drei'
import { useSelector } from 'react-redux'
import * as THREE from 'three'

import { switchClass } from '../../utils'
import { useNavigate } from 'react-router-dom'

function ProductCard({ index, position, products, item, scale, c = new THREE.Color(), ...props }) {
    const ref = useRef()
    const scroll = useScroll()
    
    const [hovered, hover] = useState(false)

    const navigate = useNavigate()

    const { currency, activeFilters } = useSelector(state => state.data)

    const texture = useTexture(props.image)

    const click = () => {
        switchClass(document.querySelector('#shop'), 'slide-out', navigate, `/shop/${activeFilters.category}/${item.id}`)
    }
    const over = () => hover(true)
    const out = () => hover(false)

    useEffect(() => {
        if(hovered) {
            document.body.style.cursor = 'pointer'
        } else {
            document.body.style.cursor = 'default'
        }

    }, [hovered])

    const damp = THREE.MathUtils.damp

    useFrame((state, delta) => {
        // const mesh = ref.current.children[0]
        // console.log(mesh);
        // mesh.scale.y = damp(mesh.scale.y, hovered ? 1 : 4, 8, delta)
        // mesh.scale.x = damp(mesh.scale.x, hovered ? 1 : scale[0], 6, delta)
    })

    const w = 3

    return (
        <group ref={ref} position={position} onClick={click} onPointerOver={over} onPointerOut={out} >
            <mesh scale={[w, w * 1.5, 1]}>
                <planeGeometry args={[1, 1, 32, 32]} />
                <meshBasicMaterial map={texture} attach="material" />
            </mesh>
            
            <Text anchorX="left" position={[-w / 2, -w * 1.5 / 2 - 0.25, 0]} scale={2} color="#111">
                {currency + item.price}
            </Text>
            <Text anchorX="right" position={[w / 2, -w * 1.5 / 2 - 0.25, 0]} scale={2} color="#111">
                {item.name}
            </Text>
        </group>
    )
}

function ProductList({ products, w = 3, gap = 1 }) {
    const [productData, setProductData] = useState(null)
    const [resultCount, setResultCount] = useState(24)

    const { activeFilters } = useSelector(state => state.data)

    const { width } = useThree((state) => state.viewport)

    const xW = w + gap

    useEffect(() => {
        const images = products.map(item => {
            return item.image
        })

        setProductData(
            products.map((item, i) => {
                if(i <=  resultCount){
                    return (
                        <Suspense fallback={'Loading product...'}>
                            <ProductCard
                                key={item.name + i} 
                                index={i} 
                                position={[i * xW, 0, 0]} 
                                scale={[w, w, 1]}
                                products={products}
                                item={item}
                                image={images[i]}
                            />
                        </Suspense>
                    )
                }
            })
        )

    }, [])

    return (
        <ScrollControls horizontal damping={2} pages={(width - xW + resultCount * xW) / width}>
            <Scroll>
                <Text scale={10} color="#111" rotation={[0,0, 90 * Math.PI/180]} position={[-4, 0, 0]}>
                    {activeFilters.category}
                </Text>
                <Suspense fallback={'Loading products...'}>
                    {productData ? 
                        productData : null
                    }
                </Suspense>
            </Scroll>
        </ScrollControls>
    )
}

export default ProductList