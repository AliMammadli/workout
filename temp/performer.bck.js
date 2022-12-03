import React, { useRef, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { useGLTF, useAnimations } from '@react-three/drei'
import { STCharacter, STPlaylist, STModel, STUI } from '../stores/utils.store'
import { LoopRepeat } from 'three'


export function MDPerformer(props) {
    const meshRef = useRef()
    const playlistSnap = useSnapshot(STPlaylist)
    const { nodes, materials } = useGLTF(`/models/${STCharacter.model}.gltf`)

    const anims = []

    STPlaylist.track.forEach((a, i) => {
        if (i === STPlaylist.track.length - 1) {
            let rest = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.rest}.gltf`).animations
            let warmUp = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.warmUp}.gltf`).animations
            let finish = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.finish}.gltf`).animations
            anims.push(...rest, ...warmUp, ...finish)
            console.log('from forEach')
        }
        let { animations } = useGLTF(`/anims/${STCharacter.gender}/${a.animName}.gltf`)
        anims.push(...animations)
    })

    const { actions, mixer } = useAnimations([...anims], meshRef)

    const startPlaylist = () => {
        let actIndex = 0
        const trainRep = STPlaylist.reps
        const restRep = parseInt(STPlaylist.rest / 2)

        actions[STCharacter.anims.warmUp].reset().play()
        setTimeout(() => {
            actions[`${STPlaylist.track[actIndex].animName}_loop`].setLoop(LoopRepeat, trainRep).fadeIn(0.5).play()
            actions[STCharacter.anims.warmUp].stop()
        }, (playlistSnap.countdown * 1000))

        mixer.addEventListener('finished', (e) => {
            if (e.action._clip.name === STCharacter.anims.finish) {
                STModel.activeModel = 'MDCharacter'
                STUI.activeUI = 'UIPlaylist'
            } else if (e.action._clip.name !== STCharacter.anims.rest) {
                actions[STCharacter.anims.rest].setLoop(LoopRepeat, restRep).reset().play()
                actions[`${STPlaylist.track[actIndex].animName}_loop`].stop()
            } else if (e.action._clip.name === STCharacter.anims.rest) {
                if (actIndex === STPlaylist.track.length - 1) {
                    actions[STCharacter.anims.finish].setLoop(LoopRepeat, 2).fadeIn(1).play()
                } else {
                    actions[`${STPlaylist.track[++actIndex].animName}_loop`].setLoop(LoopRepeat, trainRep).play()
                }
                actions[STCharacter.anims.rest].stop()
            }
        })
    }

    useEffect(() => startPlaylist(), [])


    return (
        <group ref={meshRef} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.0015}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh castShadow name="Boxers" geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.Boxers.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Body.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Eye.skeleton} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/character.gltf')