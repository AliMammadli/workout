import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
    const { nodes, materials } = useGLTF('/male_body.gltf')
    return (
        <group {...props} dispose={null}>
            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh castShadow name="Boxers" geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.Boxers.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Body.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Eye.skeleton} />
            </group>
        </group>
    )
}

useGLTF.preload('/male_body.gltf')