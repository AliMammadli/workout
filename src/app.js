import { useRef, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Stats } from '@react-three/drei'
import { Controls, useControl } from 'react-three-gui'
import { Model } from './models/core.md'
import { UI } from './interface/core.ui'



const Light = () => {
    const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: -1.2, min: -4, max: 4 })
    const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 2.3, min: -4, max: 4 })
    const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: -2.2, min: -4, max: 4 })

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight castShadow color={'white'} position={[-1.2, 2.3, 2.2]} intensity={1.5} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            <directionalLight color={'white'} position={[posX, posY, posZ]} intensity={1.5} />
        </>
    )
}


const Camera = () => {
    const camera = useRef()
    const controls = useRef()

    useEffect(() => {
        if (!controls.current || !camera.current) return

        // camera.current.position.set(0, 3, 4)
        controls.current.target.set(0, 1, 0)
    }, [camera, controls])

    return (
        <>
            <PerspectiveCamera ref={camera} position={[0, 1, 4]} fov={50} near={0.0001} far={1500} makeDefault />
            <OrbitControls ref={controls} target={[0, 1, 0]} />
        </>
    )
}


const Floor = () => {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" transparent opacity={0.4} />
        </mesh>
    )
}



export default function App() {
    return (
        <>
            <Controls.Provider>
                <Controls.Canvas shadows>
                    <Camera />
                    <Light />
                    <Suspense fallback={null}>
                        <Model />
                    </Suspense>
                    <Floor />
                </Controls.Canvas>
                {/* <Stats /> */}
                {/* <Controls /> */}
                <UI />
            </Controls.Provider>
        </>
    )
}