import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Box } from "@react-three/drei"
import * as THREE from 'three'

import { useState } from "react"
import { useEffect } from "react"

function Category(props) {
    const mesh = useRef()

    const { inView, position, material, focused, count, index, scale } = props

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 1000 ))

    useFrame(() => {
        const _focused = focused === index

        if(!inView){
            mesh.current.position.lerp(
                new THREE.Vector3(position[0] + x, position[1] + y + 1000, position[2] + z)
                , .01
            )

            return null
        }

        const new_x = () => {
            const spacing = (
                index === 0 
                || index === 3 
                || index === 6 
                || index === 9 ? 0 
                : ((index % 3))
            )
            
            const _x = (
                index < 3 ? index
                : index < 6 ? index - 3 
                : index < 9 ? index - 6
                : index < 12 ? index - 9
                : 0
            )

            return _x + spacing
        }

        const new_y = () => {
            const spacing = 
                index > 2 ? index > 5 ? index > 8 ? 
                3 : 2 : 1 : 0
            
            const _y = (
                index < 3 ? 0
                : index < 6 ? 1 
                : index < 9 ? 2
                : 3
            )

            return _y + (spacing * 2)
        }

        mesh.current.rotation.x = 0
        mesh.current.rotation.z = 0
        mesh.current.rotation.y = -90

        if(!_focused){            
            mesh.current.position.lerp(
                new THREE.Vector3(
                    (position[0] + 4) - (new_x() * 1.5),
                    (position[1] + 2) - new_y(), 
                    position[2] + (new_x() / 2)
                )
            , .025)

            mesh.current.renderOrder = -index
        } else {     
            mesh.current.position.lerp(
                new THREE.Vector3(
                    (position[0] + 2) - ((new_x() * 1.5) + .5),
                    (position[1] + 2) - new_y(), 
                    position[2] + (new_x() / 2) - 1
                )
            , .05)
        }

        return null
    })

    return (
        <Box 
            ref={mesh} 
            position={position} 
            material={material ? material : null}
            scale={scale}
        >
            <meshNormalMaterial />
        </Box>
    )
}

function Categories(props) {
    const [categoryObjects, setCategoryObjects] = useState([])
    
    const calcPos = () => {
        let x = 13.5
        let z = 28
        let diff = 1536 - window.innerWidth

        let xDiff = diff / 2200
        let zDiff = diff / 120
        
        return [x - xDiff, 22, z + zDiff]
    }

    const [centerPos] = useState([...calcPos()])
    
    useEffect(() => {
        setCategoryObjects(
            props.categories.map((item, i) => {
                return <Category 
                    inView={props.inView} 
                    key={item+i} 
                    position={[...centerPos]} //12.75 
                    index={i} 
                    focused={props.focused} 
                    count={props.categories.length}
                    scale={2}
                />
            })
        )
    }, [props])
    
    
    return(
        <>
            {categoryObjects}
        </>
    )
}

export default Categories