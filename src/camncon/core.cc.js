import { useRef, useEffect } from 'react'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { useControl } from 'react-three-gui'


export const CamnCon = () => {
    const camera = useRef()
    const controls = useRef()


    useEffect(() => {
        if (!controls.current || !camera.current) return

        // camera.current.position.set(0, 3, 4)
        controls.current.target.set(0, 1, 0)
    }, [camera, controls])


    return (
        <>
            <PerspectiveCamera ref={camera} position={[0, 1, 4]} fov={50} near={0.01} far={1500} makeDefault />
            <OrbitControls ref={controls} target={[0, 1, 0]} />
        </>
    )
}