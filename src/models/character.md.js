import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'


export function MDCharacter(props) {
    const meshRef = useRef()
    const { nodes, materials } = useGLTF('/models/character.gltf')
    const { animations } = useGLTF('/anims/anim_idle.gltf')
    // const { nodes, materials } = useGLTF('/models/male_body.gltf')
    // const { animations } = useGLTF('/anims/male_body_idle.gltf')

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
        actions['anim_idle'].reset().fadeIn(0.5).play()
        return () => actions['anim_idle']?.fadeOut(0.5)
    }, [])

    return (
        <group ref={meshRef} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh castShadow geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
                <skinnedMesh castShadow geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
                {/* <skinnedMesh castShadow geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.Boxers.skeleton} />
                <skinnedMesh castShadow geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.CC_Base_Body.skeleton} />
                <skinnedMesh castShadow geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.CC_Base_Eye.skeleton} /> */}
            </group>
        </group>
    )
}

useGLTF.preload('/models/male_body.gltf')