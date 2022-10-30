import React, { useRef, useLayoutEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export function Model(props) {
    const group = useRef()
    const { scene, nodes, materials } = useGLTF('/models/mesh_1.gltf')

    useEffect(() => {
        // const unsubscribe = subscribe(STPlaylist, () => {})
        // return () => unsubscribe()
    }, [])

    useLayoutEffect(() => {
        scene.traverse((obj) => obj.isMesh && console.log(obj))
    })

    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
                <skinnedMesh geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/mesh_1.gltf')