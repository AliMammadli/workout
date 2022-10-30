import React from 'react'
import { useAnimations, useGLTF, useMatcapTexture } from '../../src'


function AnimationController({ animations, ybotRef }) {
    const { actions } = useAnimations(animations, ybotRef)
    const selectedAction = Object.keys(actions)[2]

    React.useEffect(() => {
        actions[selectedAction]?.reset().fadeIn(0.5).play()
        return () => void actions[selectedAction]?.fadeOut(0.5)

    }, [actions, selectedAction])

    return null
}

function YBotModel(props) {
    const ybotRef = React.useRef <THREE.Group> (null)
    const { nodes, animations } = useGLTF('ybot.glb')
    const [matcapBody] = useMatcapTexture('293534_B2BFC5_738289_8A9AA7', 1024)
    const [matcapJoints] = useMatcapTexture('3A2412_A78B5F_705434_836C47', 1024)

    return (
        <>
            <group ref={ybotRef} {...props} dispose={null}>
                <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
                    <primitive object={nodes.mixamorigHips} />
                    <skinnedMesh geometry={nodes.YB_Body.geometry} skeleton={nodes.YB_Body.skeleton}>
                        <meshMatcapMaterial matcap={matcapBody} skinning />
                    </skinnedMesh>
                    <skinnedMesh geometry={nodes.YB_Joints.geometry} skeleton={nodes.YB_Joints.skeleton}>
                        <meshMatcapMaterial matcap={matcapJoints} skinning />
                    </skinnedMesh>
                </group>
            </group>

            <AnimationController ybotRef={ybotRef} animations={animations} />
        </>
    )

}

useGLTF.preload('ybot.glb')

function UseAnimationsScene() {
    return (
        <React.Suspense fallback={null}>
            <YBotModel position={[0, -1, 0]} />
        </React.Suspense>
    )

}

export const UseAnimationsSt = () => <UseAnimationsScene />
UseAnimationsSt.storyName = 'Default'