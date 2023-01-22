import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import * as THREE from 'three'

function CameraTarget({ atHome }) {
    const targetRef = useRef()

    const camPos = {
        welcome: [0, 0, 8],
        home: [5, 20, 17]
    }

    const targetPos = {
        welcome: [0, 0, 0],
        home: [5, 20, 25]
    }

    const camVec = new THREE.Vector3(...camPos.welcome)
    const targetVec = new THREE.Vector3(...camPos.welcome)

    useFrame((state) => {
        if(atHome){
            targetVec.set(...targetPos.home)
            targetRef.current.position.lerp(targetVec, .01)
            state.camera.position.lerp(camVec.set(...camPos.home), .05)
            state.camera.updateProjectionMatrix()
        } else {
            targetVec.set(...targetPos.welcome)
            targetRef.current.position.lerp(targetVec, .01)
            state.camera.position.lerp(camVec.set(...camPos.welcome), .05)
            state.camera.updateProjectionMatrix()
        }

        state.camera.lookAt(targetRef.current.position)

        return null
    })

    return (
        <mesh ref={targetRef}>
            {/* <coneBufferGeometry attach='geometry' args={[1, 5, 5]} />
            <meshLambertMaterial attach='material' color='pink' /> */}
        </mesh>
    )
}

export default CameraTarget