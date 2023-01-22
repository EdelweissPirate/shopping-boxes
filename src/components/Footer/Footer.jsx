import { Text } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Suspense } from 'react'

import HeadAvatar from '../3d/HeadAvatar'
import SFX from "../3d/SFX_Hologram"

import './footer.css'

function Footer() {
    const glConfig = {
        alpha: true,
        powerPreference: "high-performance",
        antialias: true,
        stencil: false,
        depth: false
    }

    return (
        <footer>
            <div className="footer-inner fadeIn-delay">
                <Canvas id="canvas" gl={glConfig} camera={{position: [0, 0, 8]}} background={'#80ded0 '} >
                    <ambientLight intensity={0.2} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                    <pointLight position={[-5, -10, -10]} />
                    
                    {/* {window.innerWidth > 800 ? 
                    <Text color="#111" anchorX="center" anchorY="middle" scale={[12, 12, 12]} >
                        Copyright © EdelweissPirate
                    </Text>
                    : null} */}

                    <Suspense fallback={null}>
                        <HeadAvatar position={[0, 0, -5]} scale={1} />
                        <SFX />
                    </Suspense>
                </Canvas>
            </div>
        </footer>
    )
}

export default Footer