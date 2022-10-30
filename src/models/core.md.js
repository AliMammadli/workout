import { useSnapshot } from 'valtio'
import { STModel } from '../stores/utils.store'

import { MDCharacter } from './character.md'
import { MDPerformer } from './performer.md'
import { MDMuscle } from './muscle.md'


const ModelSwap = (props) => {
    const modelSnap = useSnapshot(STModel)

    return (
        props.children.filter(c => c.props.mdName === modelSnap.activeModel)
    )
}


export const Model = () => {
    return (
        <ModelSwap>
            <MDCharacter mdName={'MDCharacter'} position={[0, 0, 0]} />
            <MDPerformer mdName={'MDPerformer'} position={[0, 0, 0]} />
            <MDMuscle mdName={'MDMuscle'} position={[0, 0.015, 0]} />
        </ModelSwap>
    )
}