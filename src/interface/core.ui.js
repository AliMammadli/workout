import { useSnapshot } from 'valtio'
import { STUI } from '../stores/utils.store'

import { UIPlaylist } from './playlist.ui'
import { UITimer } from './timer.ui'
import { UIAnimlist } from './animlist.ui'
import { UIMuscle } from './muscle.md.jsx'


const UISwap = (props) => {
    const uiSnap = useSnapshot(STUI)
    return props.children.filter(c => c.props.uiName === uiSnap.activeUI)
}


export const UI = () => {
    return (
        <UISwap>
            <UIPlaylist uiName={'UIPlaylist'} />
            <UITimer uiName={'UITimer'} />
            <UIAnimlist uiName={'UIAnimlist'} />
            <UIMuscle uiName={'UIMuscle'} />
        </UISwap>
    )
}