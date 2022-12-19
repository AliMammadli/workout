import React, { useRef } from 'react'
import { useGLTF, useHelper } from '@react-three/drei'
import { useControl } from 'react-three-gui'
import { DirectionalLightHelper } from 'three'


const Light = () => {
    // const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: -1.2, min: -4, max: 4 })
    // const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 2.3, min: -4, max: 4 })
    // const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: -2.2, min: -4, max: 4 })

    const width = useControl('Width', { type: 'number', group: 'LIGHT', value: 3, min: -4, max: 4 })
    const height = useControl('Height', { type: 'number', group: 'LIGHT', value: 3, min: -4, max: 4 })
    const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: 1.8, min: -4, max: 4 })
    const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 3.4, min: -4, max: 7 })
    const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: 0, min: -4, max: 4 })

    const dLightIntensity = useControl('Intensity', { type: 'number', group: 'DLIGHT', value: 0.1, min: 0, max: 1 })

    const dLight1 = useRef()
    // const dLight2 = useRef()


    useHelper(dLight1, DirectionalLightHelper, 0.5, "teal")
    // useHelper(dLight2, DirectionalLightHelper, 0.5, "hotpink")

    return (
        <>
            {/* <ambientLight intensity={0.5} /> */}
            <directionalLight castShadow ref={dLight1} color={'white'} position={[-1.2, 2.3, 2.2]} intensity={dLightIntensity} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            {/* <directionalLight ref={dLight2} color={'white'} position={[posX, posY, posZ]} intensity={1.5} /> */}
            <rectAreaLight color={'red'} position={[posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={2} width={width} height={height} />
            <rectAreaLight color={'blue'} position={[-posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={2} width={width} height={height} />
        </>
    )
}



export const SCRoom = (props) => {
    const { nodes, materials } = useGLTF('/scenes/room_v3.gltf')

    return (
        <>
            <Light />
            <group {...props} dispose={null} scale={0.2} rotation={[0, Math.PI, 0]}>
                <mesh name="facade" geometry={nodes.facade.geometry} material={materials.mtl_walls} />
                <mesh receiveShadow name="floor" geometry={nodes.floor.geometry} material={materials.mtl_floor} />
                <mesh name="ceiling" geometry={nodes.ceiling.geometry} material={materials.mtl_ceiling} />
                <mesh name="walls" geometry={nodes.walls.geometry} material={materials.mtl_walls} />
                <mesh name="pillars" geometry={nodes.pillars.geometry} material={materials.mtl_pillars} />
            </group>
        </>
    )
}

useGLTF.preload('/scenes/room_v3.gltf')