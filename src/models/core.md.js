import { useSnapshot } from 'valtio'
import { STModel, STApp } from '../stores/utils.store'

import { MDCharacter } from './character.md'
import { MDPerformer } from './performer.md'
import { MDMuscle } from './muscle.md'
import { MDDebug } from './debug.md'


const ModelSwap = (props) => {
    const modelSnap = useSnapshot(STModel)
    const appSnap = useSnapshot(STApp)
    const activeModel = appSnap.debugMode ? appSnap.debugModel : modelSnap.activeModel

    return props.children.filter(c => c.props.mdName === activeModel)
}


export const Model = () => {
    return (
        <ModelSwap>
            <MDCharacter mdName={'MDCharacter'} position={[0, 0, 0]} />
            <MDPerformer mdName={'MDPerformer'} position={[0, 0, 0]} />
            <MDMuscle mdName={'MDMuscle'} position={[0, 0.015, 0]} />
            <MDDebug mdName={'MDDebug'} position={[0, 0, 0]} />
        </ModelSwap>
    )
}