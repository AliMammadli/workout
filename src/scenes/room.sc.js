import React, { useRef } from 'react'
import { useGLTF, useHelper } from '@react-three/drei'
import { useControl } from 'react-three-gui'
import { DirectionalLightHelper, PointLightHelper } from 'three'
import { RectAreaLightUniformsLib } from 'three-stdlib'


const Light = () => {
    // const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: -1.2, min: -4, max: 4 })
    // const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 2.3, min: -4, max: 4 })
    // const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: -2.2, min: -4, max: 4 })

    const width = useControl('Width', { type: 'number', group: 'LIGHT', value: 5, min: -4, max: 7 })
    const height = useControl('Height', { type: 'number', group: 'LIGHT', value: 5, min: -4, max: 7 })
    const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: 3.3, min: -4, max: 4 })
    const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 4.3, min: -4, max: 7 })
    const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: 0, min: -4, max: 4 })

    const dLightIntensity = useControl('Intensity', { type: 'number', group: 'DLIGHT', value: 0.1, min: 0, max: 1 })

    const dLight1 = useRef()
    const pLight1 = useRef()
    const pLight2 = useRef()
    // const dLight2 = useRef()


    useHelper(dLight1, DirectionalLightHelper, 0.5, "teal")
    useHelper(pLight1, PointLightHelper, 0.5, "green")
    useHelper(pLight2, PointLightHelper, 0.5, "yellow")
    // useHelper(dLight2, DirectionalLightHelper, 0.5, "hotpink")

    RectAreaLightUniformsLib.init()

    return (
        <>
            {/* <ambientLight intensity={0.5} /> */}
            <directionalLight castShadow color={'white'} position={[-1.2, 2.3, 2.2]} intensity={0.1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            {/* <directionalLight ref={dLight2} color={'white'} position={[posX, posY, posZ]} intensity={1.5} /> */}
            <rectAreaLight color={'red'} position={[posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={5} width={width} height={height} />
            <rectAreaLight color={'blue'} position={[-posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={6} width={width} height={height} />
            {/* <pointLight ref={pLight1} color={'red'} position={[posX, posY, posZ]} intensity={dLightIntensity} /> */}
            {/* <pointLight ref={pLight2} color={'blue'} position={[-posX, posY, posZ]} intensity={dLightIntensity} /> */}
        </>
    )
}



export const SCRoom = (props) => {
    const { nodes, materials } = useGLTF('/scenes/room_v4.gltf')

    return (
        <>
            <Light />
            <group {...props} dispose={null} scale={[0.4, 0.25, 0.4]} rotation={[0, Math.PI, 0]}>
                <mesh name="facade" geometry={nodes.facade.geometry} material={materials.mtl_walls} />
                <mesh receiveShadow name="floor" geometry={nodes.floor.geometry} material={materials.mtl_floor} />
                <mesh name="ceiling" geometry={nodes.ceiling.geometry} material={materials.mtl_ceiling} />
                <mesh name="walls" geometry={nodes.walls.geometry} material={materials.mtl_walls} />
                <mesh name="pillars" geometry={nodes.pillars.geometry} material={materials.mtl_pillars} />
            </group>
        </>
    )
}

useGLTF.preload('/scenes/room_v4.gltf')