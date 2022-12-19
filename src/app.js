import { Canvas } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import { Controls } from 'react-three-gui'
import { CamnCon } from './camncon/core.cc'
import { Model } from './models/core.md'
import { UI } from './interface/core.ui'
import { Scene } from './scenes/core.sc'




const App = () => {
    return (
        <>
            <Controls.Provider>
                <Controls.Canvas shadows>
                    <CamnCon />
                    <Model />
                    <Scene />
                </Controls.Canvas>
                <Stats />
                <Controls title='Settings' />
                <UI />
            </Controls.Provider>
        </>
    )
}

export default App