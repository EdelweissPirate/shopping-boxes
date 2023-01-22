import { Canvas } from "@react-three/fiber"
import { Suspense } from 'react'
import { useSelector } from "react-redux"

import Boxes from "./Boxes"
import CameraTarget from "./CameraTarget"
import Categories from "./Categories"

function Scene() {
    const { isHome, focusedCat } = useSelector(state => state.anim)
    const { categories } = useSelector(state => state.data)

    const glConfig = {
        alpha: true,
        powerPreference: "high-performance",
        antialias: false,
        stencil: false,
        depth: false,
        near: 8,
        far: 10
    }

    return (
        <section>
            <Canvas id="canvas" gl={glConfig} camera={{position: [0, 0, 8]}} background={'#80ded0 '} >
                <CameraTarget atHome={isHome} />
                <ambientLight intensity={0.2} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-5, -10, -10]} />
                
                <Suspense fallback={'Loading Three.js...'}>
                    <Boxes />
                    {window.innerWidth > 900 ? 
                        <Categories inView={isHome} categories={categories} focused={focusedCat} />
                    : null}
                </Suspense>
            </Canvas>
        </section>
    )
}

export default Scene