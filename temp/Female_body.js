import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
    const { nodes, materials } = useGLTF('/female_body.gltf')
    return (
        <group {...props} dispose={null}>
            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh castShadow name="Bra" geometry={nodes.Bra.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.Bra.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.CC_Base_Body.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.CC_Base_Eye.skeleton} />
                <skinnedMesh castShadow name="Underwear_Bottoms" geometry={nodes.Underwear_Bottoms.geometry} material={materials['5_meshes_Merge']} skeleton={nodes.Underwear_Bottoms.skeleton} />
            </group>
        </group>
    )
}

useGLTF.preload('/female_body.gltf')