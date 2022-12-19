import { useControl } from 'react-three-gui'


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


const Floor = () => {
    return (
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" transparent opacity={0.4} />
        </mesh>
    )
}



export const SCDemo = () => {
    return (
        <>
            <Light />
            <Floor />
        </>
    )
}