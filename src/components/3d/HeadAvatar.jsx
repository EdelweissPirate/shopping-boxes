import { useRef } from "react";
import { useLoader, useFrame } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useGLTF } from "@react-three/drei";

const HeadAvatar = ({ scale, position }) => {
    const ref = useRef();
    const gltf = useLoader(GLTFLoader, '/3d/myHead1.glb');
    
    // Subscribe this component to the render-loop
    useFrame(({ clock }) => {
        // ref.current.rotation.y += 0.05
        ref.current.rotation.y = .5 * Math.sin(clock.getElapsedTime() * 2)
    });

    const handleHover = (bool) => {
        if(bool){
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }
    }

    const handleClick = () => {
        console.log('yoo');
        window.open('https://www.github.com/EdelweissPirate', '_blank')
    }

    return (
        <>
            <primitive
                ref={ref}
                object={gltf.scene}
                position={position}
                scale={scale}
                onClick={handleClick}
                onPointerEnter={() => handleHover(true)}
                onPointerLeave={() => handleHover(false)}
            />
        </>
    );
};

useGLTF.preload('/3d/myHead1.glb')

export default HeadAvatar;