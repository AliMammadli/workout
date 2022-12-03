import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


export function MDCharacter(props) {
    const meshRef = useRef()
    const { nodes, materials } = useGLTF('/models/male_body.gltf')
    const { animations } = useGLTF('/anims/male/idle_04.gltf')

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
        actions['idle_04'].reset().fadeIn(0.5).play()
        return () => actions['idle_04']?.fadeOut(0.5)
    }, [])

    return (
        <group ref={meshRef} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.0015}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh castShadow name="Boxers" geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.Boxers.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Body.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Eye.skeleton} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/male_body.gltf')