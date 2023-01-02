import { useControl } from 'react-three-gui'


const Light = () => {
    // const posX = useControl('Pos X', { type: 'number', group: 'LIGHT', value: -1.2, min: -4, max: 4 })
    // const posY = useControl('Pos Y', { type: 'number', group: 'LIGHT', value: 2.3, min: -4, max: 4 })
    // const posZ = useControl('Pos Z', { type: 'number', group: 'LIGHT', value: -2.2, min: -4, max: 4 })

    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight castShadow color={'white'} position={[-1.2, 2.3, 2.2]} intensity={1.5} shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
            <directionalLight color={'white'} position={[-1.2, 2.3, -2.2]} intensity={1.5} />
        </>
    )
}


const Floor = () => {
    // const blx = useControl('Box LX', { type: 'number', group: 'BOX', value: 20, min: 0, max: 40 })
    // const bly = useControl('Box LY', { type: 'number', group: 'BOX', value: 4, min: 0, max: 20 })
    // const blz = useControl('Box LZ', { type: 'number', group: 'BOX', value: 10, min: 0, max: 40 })

    const blx = 20, bly = 4, blz = 10 

    return (
        <group>
            <mesh receiveShadow name={'floor'} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
                <planeBufferGeometry attach="geometry" args={[blx, blz]} />
                <meshStandardMaterial attach="material" color={'#333'} />
            </mesh>
            <mesh receiveShadow name={'ceiling'} rotation={[Math.PI / 2, 0, 0]} position={[0, bly, 0]}>
                <planeBufferGeometry attach="geometry" args={[blx, blz]} />
                <meshStandardMaterial attach="material" color={'lightgray'} />
            </mesh>
            <mesh receiveShadow name={'wall_nz'} rotation={[0, 0, 0]} position={[0, bly / 2, -blz / 2]}>
                <planeBufferGeometry attach="geometry" args={[blx, bly]} />
                <meshStandardMaterial attach="material" color={'green'} />
            </mesh>
            <mesh receiveShadow name={'wall_pz'} rotation={[0, Math.PI, 0]} position={[0, bly / 2, blz / 2]}>
                <planeBufferGeometry attach="geometry" args={[blx, bly]} />
                <meshStandardMaterial attach="material" color={'lightgreen'} />
            </mesh>
            <mesh receiveShadow name={'wall_nx'} rotation={[0, Math.PI / 2, 0]} position={[-blx / 2, bly / 2, 0]}>
                <planeBufferGeometry attach="geometry" args={[blz, bly]} />
                <meshStandardMaterial attach="material" color={'blue'} />
            </mesh>
            <mesh receiveShadow name={'wall_px'} rotation={[0, -Math.PI / 2, 0]} position={[blx / 2, bly / 2, 0]}>
                <planeBufferGeometry attach="geometry" args={[blz, bly]} />
                <meshStandardMaterial attach="material" color={'teal'} />
            </mesh>
        </group>
    )
}



export const SCBox = () => {
    return (
        <>
            <Light />
            <Floor />
        </>
    )
}