import { Suspense } from 'react'
import { useSnapshot } from 'valtio'
import { STApp } from '../stores/utils.store'

import { SCDemo } from './demo.sc'
import { SCRoom } from './room.sc'


const SceneSwap = (props) => {
    const appSnap = useSnapshot(STApp)

    return (
        <Suspense fallback={null}>
            {props.children.filter(c => c.props.scName === appSnap.sceneName)}
        </Suspense>
    )
}


export const Scene = () => {
    return (
        <SceneSwap>
            <SCDemo scName={'SCDemo'} />
            <SCRoom scName={'SCRoom'} />
        </SceneSwap>
    )
}