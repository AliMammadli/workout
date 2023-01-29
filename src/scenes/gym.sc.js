import React, { useRef } from 'react'
import { useGLTF, useHelper, Environment, Reflector, MeshReflectorMaterial } from '@react-three/drei'
import { Selection, Select, EffectComposer, SelectiveBloom } from '@react-three/postprocessing'
import { useControl } from 'react-three-gui'
import { DirectionalLightHelper, PointLightHelper, Color } from 'three'
import { RectAreaLightUniformsLib } from 'three-stdlib'


const Light = () => {
    const dLightIntensity = useControl('Intensity', { type: 'number', group: 'DLIGHT', value: 0.4, min: 0.01, max: 1 })

    const dLight1 = useRef()
    const pLight1 = useRef()
    const pLight2 = useRef()
    // const dLight2 = useRef()


    // useHelper(dLight1, DirectionalLightHelper, 0.5, "teal")
    // useHelper(pLight1, PointLightHelper, 0.5, "green")
    // useHelper(pLight2, PointLightHelper, 0.5, "yellow")
    // useHelper(dLight2, DirectionalLightHelper, 0.5, "hotpink")

    return (
        <>
            <directionalLight ref={dLight1} castShadow color={'white'} position={[-1.2, 2.3, 2.2]} intensity={0.1} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            {/* <directionalLight ref={dLight2} color={'white'} position={[posX, posY, posZ]} intensity={1.5} /> */}
            {/* <rectAreaLight color={'red'} position={[posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={5} width={width} height={height} /> */}
            {/* <rectAreaLight color={'blue'} position={[-posX, posY, posZ]} rotation={[-Math.PI / 2, 0, 0]} intensity={6} width={width} height={height} /> */}
            <pointLight ref={pLight1} color={'white'} position={[2, 3, 0]} intensity={dLightIntensity} />
            <pointLight ref={pLight2} color={'white'} position={[-2, 3, 0]} intensity={dLightIntensity} />
        </>
    )
}



const Mirror = () => {
    return (
        <Reflector mirror={1} mixBlur={10} mixStrength={0.8} resolution={2048} args={[20, 5]} position={[0, 2, 5.96]} rotation={[0, Math.PI, 0]} />
    )
}



const Decor = (props) => {
    const { nodes } = useGLTF('/assets/fifi_floor.gltf')

    return (
        <group {...props} dispose={null} position={[0, 0, 1]} >
            <mesh name="Curve" geometry={nodes.Curve.geometry} material={nodes.Curve.material} position={[0.07, -0.013, -0.06]} scale={30} >
                <meshStandardMaterial attach="material" color={'black'} />
            </mesh>
        </group>
    )
}



const Neon = (props) => {
    const { nodes } = useGLTF('/assets/fifi_neon.gltf')

    return (
        <group {...props} dispose={null}>
            <mesh name="Curve" geometry={nodes.Curve.geometry} position={[0.07, 0, -0.06]} scale={20} >
                {/* <meshStandardMaterial attach="material" color={'hotpink'} /> */}
                <meshStandardMaterial emissive="hotpink" emissiveIntensity={3} toneMapped={false} />
            </mesh>
        </group>
    )
}



export const SCGym = (props) => {
    const { nodes, materials } = useGLTF('/scenes/gym.gltf')

    return (
        <>
            <Light />
            <Mirror />
            <Decor />
            <Selection>
                <EffectComposer>
                    <SelectiveBloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.4} intensity={0.6} />
                </EffectComposer>
                <Select enabled>
                    <Neon position={[-9.5, 1.8, 2.1]} rotation={[Math.PI / 2, 0, - Math.PI / 2]} />
                    <Neon position={[18, 1.9, 1.45]} rotation={[Math.PI / 2, 0, Math.PI / 2]} />
                </Select>
            </Selection>
            <group {...props} dispose={null} position={[0, 0, 2]} scale={[0.35, 0.35, 0.35]} rotation={[0, -Math.PI / 2, 0]}>
                <mesh name="Plane" geometry={nodes.Plane.geometry} material={nodes.Plane.material} position={[4.61, 7.9, -17.99]} />
                <group name="wall_glass" position={[4.61, 7.9, -17.99]}>
                    <mesh name="wall_glass_1" geometry={nodes.wall_glass_1.geometry} material={materials.mtl_wall_glass} />
                    <mesh name="wall_glass_2" geometry={nodes.wall_glass_2.geometry} material={materials.mtl_wall_glass} />
                </group>
                <mesh name="wall_metal" geometry={nodes.wall_metal.geometry} material={nodes.wall_intr.material} position={[4.61, 7.9, -17.99]} />
                <mesh name="wall_mirror" geometry={nodes.wall_mirror.geometry} material={nodes.wall_mirror.material} position={[4.61, 7.9, -17.99]} />
                <mesh receiveShadow name="floor" geometry={nodes.floor.geometry} material={nodes.floor.material} position={[4.61, 7.9, -17.99]} />
                <mesh name="wall_intr" geometry={nodes.wall_intr.geometry} material={nodes.wall_intr.material} position={[4.61, 7.9, -17.99]} />
            </group>
        </>
    )
}

useGLTF.preload('/scenes/gym.gltf')