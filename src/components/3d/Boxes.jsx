import { useFrame } from "@react-three/fiber"
import { useMemo, useRef } from "react"
import { Box } from "@react-three/drei"
import * as THREE from 'three'

function BoxCustom(props) {
    const mesh = useRef()

    const { position, material, speed, flipped, offset } = props

    useFrame(({ clock }) => {
        mesh.current.rotation.x += 0.005
        mesh.current.rotation.z += 0.005
        mesh.current.rotation.y += 0.005

        if(!flipped){
            mesh.current.position.x = (position[0] + (offset * Math.sin(clock.getElapsedTime() - offset)))
        } else {
            mesh.current.position.x = (position[0] + (offset * Math.cos(clock.getElapsedTime() - offset)))
        }

        mesh.current.position.y += (speed/100)//.01

        if(mesh.current.position.y > 15){
            mesh.current.position.y = -15
        }
    })
    
    return (
        <Box 
            ref={mesh} 
            position={position} 
            material={material ? material : null}
        >
            <meshPhysicalMaterial 
                color="lightblue" 
                metalness={0} 
                roughness={0.7} 
                transmission={0.6} 
                thickness={.8}
            />
        </Box>
    )
}

function Boxes() {
    const addBoxes = (count) => {
        const objects = []
        
        for (let i = 0; i < count; i++) {
            const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 50 ))

            objects.push(<BoxCustom key={`bgBox-${i}`} position={[x, y, z]} speed={.3 + (Math.random())} flipped={Math.random() > .5} offset={Math.random()} />)
        }

        return [...objects]
    }

    const _boxes = useMemo(() => addBoxes(100), [100])

    return (
        <>
            {_boxes}
        </>
    )
}

export default Boxes