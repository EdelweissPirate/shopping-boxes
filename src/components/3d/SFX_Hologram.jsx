import {
    EffectComposer,
    DepthOfField,
    Bloom,
    Noise,
    Vignette,
    Scanline
} from "@react-three/postprocessing";

import { BlendFunction } from 'postprocessing'


function SFX() {
    return (
        <EffectComposer multisampling={0} disableNormalPass={true}>
            <DepthOfField
                focusDistance={0}
                focalLength={0.5}
                bokehScale={2}
                height={480}
            />
            <Bloom
                luminanceThreshold={0}
                luminanceSmoothing={0.9}
                height={300}
                opacity={0}
            />
            <Noise premultiply blendFunction={BlendFunction.ADD} opacity={0.6}  />
            <Scanline
                blendFunction={BlendFunction.OVERLAY} // blend mode
                density={2} // scanline density
            />
            <Vignette eskil={true} offset={0.4} darkness={1} />
        </EffectComposer>
    )
}

export default SFX