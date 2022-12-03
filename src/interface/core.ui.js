import { useSnapshot } from 'valtio'
import { STUI, STApp } from '../stores/utils.store'

import { UIPlaylist } from './playlist.ui'
import { UITimer } from './timer.ui'
import { UIAnimlist } from './animlist.ui'
import { UIMuscle } from './muscle.ui'
import { UIDebug } from './debug.ui'


const UISwap = (props) => {
    const uiSnap = useSnapshot(STUI)
    const appSnap = useSnapshot(STApp)
    const activeUI = appSnap.debugMode ? appSnap.debugUI : uiSnap.activeUI

    return props.children.filter(c => c.props.uiName === activeUI)
}


export const UI = () => {
    return (
        <UISwap>
            <UIPlaylist uiName={'UIPlaylist'} />
            <UITimer uiName={'UITimer'} />
            <UIAnimlist uiName={'UIAnimlist'} />
            <UIMuscle uiName={'UIMuscle'} />
            <UIDebug uiName={'UIDebug'} />
        </UISwap>
    )
}