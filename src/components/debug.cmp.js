import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'


export function Model(props) {
    const { nodes, materials } = useGLTF('/male_body.gltf')
    

    return (
        <group {...props} dispose={null}>
            <primitive object={nodes.mixamorigHips} />
            <skinnedMesh name="Boxers" geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.Boxers.skeleton} />
            <skinnedMesh name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.CC_Base_Body.skeleton} />
            <skinnedMesh name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.CC_Base_Eye.skeleton} />
        </group>
    )
}

useGLTF.preload('/male_body.gltf')