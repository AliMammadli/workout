import React, { useRef } from 'react'
import { useGLTF, useHelper, Environment } from '@react-three/drei'
import { useControl } from 'react-three-gui'
import { DirectionalLightHelper, PointLightHelper } from 'three'
import { RectAreaLightUniformsLib } from 'three-stdlib'


const Light = () => {
    // const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: -1.2, min: -4, max: 4 })
    // const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 2.3, min: -4, max: 4 })
    // const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: -2.2, min: -4, max: 4 })

    const width = useControl('Width', { type: 'number', group: 'LIGHT', value: 5, min: -4, max: 7 })
    const height = useControl('Height', { type: 'number', group: 'LIGHT', value: 5, min: -4, max: 7 })
    const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: 2, min: -4, max: 4 })
    const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 3, min: -4, max: 7 })
    const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: 0, min: -4, max: 4 })

    const dLightIntensity = useControl('Intensity', { type: 'number', group: 'DLIGHT', value: 1, min: 0, max: 1 })

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
            {/* <rectAreaLight color={'red'} position={[posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={5} width={width} height={height} /> */}
            {/* <rectAreaLight color={'blue'} position={[-posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={6} width={width} height={height} /> */}
            <pointLight ref={pLight1} color={'white'} position={[posX, posY, posZ]} intensity={dLightIntensity} />
            <pointLight ref={pLight2} color={'white'} position={[-posX, posY, posZ]} intensity={dLightIntensity} />
        </>
    )
}



export const SCGym = (props) => {
    const { nodes, materials } = useGLTF('/scenes/gym.gltf')

    return (
        <>
            <Light />
            <Environment files='/env/gamrig_2k.hdr' background />
            <group {...props} dispose={null} position={[0, 0, 2]} scale={[0.35, 0.35, 0.35]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh name="Plane" geometry={nodes.Plane.geometry} material={nodes.Plane.material} position={[4.61, 7.9, -17.99]} />
                <group name="wall_glass" position={[4.61, 7.9, -17.99]}>
                    <mesh name="wall_gass" geometry={nodes.wall_gass.geometry} material={materials.mtl_glass} />
                    <mesh name="wall_gass_1" geometry={nodes.wall_gass_1.geometry} material={materials.mtl_glass} />
                </group>
                <mesh name="wall_metal" geometry={nodes.wall_metal.geometry} material={materials.mtl_wall_metal} position={[4.61, 7.9, -17.99]} />
                <mesh name="wall_mirror" geometry={nodes.wall_mirror.geometry} material={materials.mtl_wall_mirror} position={[4.61, 7.9, -17.99]} />
                <mesh name="floor" geometry={nodes.floor.geometry} material={nodes.floor.material} position={[4.61, 7.9, -17.99]} />
                <mesh name="wall_intr" geometry={nodes.wall_intr.geometry} material={nodes.wall_intr.material} position={[4.61, 7.9, -17.99]} />
            </group>
        </>
    )
}

useGLTF.preload('/scenes/gym.gltf')