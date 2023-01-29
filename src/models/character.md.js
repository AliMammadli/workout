import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { STCharacter } from '../stores/utils.store'


export function MDCharacter(props) {
    const meshRef = useRef()
    const { nodes, materials } = useGLTF(`/models/${STCharacter.model}.gltf`)
    const { animations } = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.idle}.gltf`)

    animations[0].tracks.splice(3, 3)
    animations[0].tracks.splice(9, 3)

    const { actions } = useAnimations([...animations], meshRef)

    const moveJoint = (mouse, joint, degreeLimit) => {
        joint.rotation.y = (mouse.x * degreeLimit) * (Math.PI / 180)
        joint.rotation.x = (-mouse.y * degreeLimit) * (Math.PI / 180)
    }

    useFrame(({ mouse }) => {
        moveJoint(mouse, nodes.mixamorigNeck, 40)
        moveJoint(mouse, nodes.mixamorigSpine, 20)
    })

    useEffect(() => {
        actions[`${STCharacter.anims.idle}`].reset().fadeIn(0.5).play()
        return () => actions[`${STCharacter.anims.idle}`]?.fadeOut(0.5)
    }, [])

    return (
        <group ref={meshRef} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.0015}>
                <primitive object={nodes.mixamorigHips} />

                {STCharacter.gender === 'male' && <>
                    <skinnedMesh castShadow name="Boxers" geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.Boxers.skeleton} />
                    <skinnedMesh castShadow name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Body.skeleton} />
                    <skinnedMesh castShadow name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Eye.skeleton} />
                </>}

                {STCharacter.gender === 'female' && <>
                    <skinnedMesh castShadow name="Bra" geometry={nodes.Bra.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.Bra.skeleton} />
                    <skinnedMesh castShadow name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.CC_Base_Body.skeleton} />
                    <skinnedMesh castShadow name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.CC_Base_Eye.skeleton} />
                    <skinnedMesh castShadow name="Underwear_Bottoms" geometry={nodes.Underwear_Bottoms.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.Underwear_Bottoms.skeleton} />
                </>}
            </group>
        </group>
    )
}

useGLTF.preload(`/models/${STCharacter.model}.gltf`)