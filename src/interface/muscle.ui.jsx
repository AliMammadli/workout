import { useSnapshot } from "valtio"
import { STFind } from "../stores/utils.store"


export const UIMuscle = () => {
    const findSnap = useSnapshot(STFind)

    const sty = {
        uiBg: {
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 20
        },
        header: {
            color: 'var(--primary-tint)',
            margin: '0 0 30px'
        },
        muscleLabel: {
            margin: '0 0 30px',
            textTransform: 'capitalize'
        },
        button: {
            width: 200,
            height: 40,
            borderRadius: 10,
            borderWidth: 0,
            fontSize: 17,
            fontWeight: '600',
            color: 'var(--white)',
            background: 'var(--primary-tint)'
        },
    }

    return (
        <div style={sty.uiBg}>
            <h1 style={sty.header}>Muscle map</h1>
            <h2 style={sty.muscleLabel}>{findSnap.muscleMap.split('_').join(' ')}</h2>
        </div>
    )
}