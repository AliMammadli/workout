import React, { useRef, useEffect } from 'react'
import { useSnapshot } from 'valtio'
import { useGLTF, useAnimations } from '@react-three/drei'
import { STCharacter, STPlaylist, STModel, STUI } from '../stores/utils.store'


export function MDPerformer(props) {
    const meshRef = useRef()
    const playlistSnap = useSnapshot(STPlaylist)
    const { nodes, materials } = useGLTF(`/models/${STCharacter.model}.gltf`)

    const anims = []
    const track = []
    let iteration = -1
    let remainSets = STPlaylist.sets

    STPlaylist.list.forEach((a, i) => {
        if (i === STPlaylist.list.length - 1) {
            let rest = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.rest}.gltf`).animations
            let warmUp = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.warmUp}.gltf`).animations
            let finish = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.finish}.gltf`).animations
            let setIdle = useGLTF(`/anims/${STCharacter.gender}/${STCharacter.anims.setIdle}.gltf`).animations
            anims.push(...rest, ...warmUp, ...finish, ...setIdle)
        }
        let { animations } = useGLTF(`/anims/${STCharacter.gender}/${a.animName}.gltf`)
        anims.push(...animations)
    })

    const { actions } = useAnimations([...anims], meshRef)

    const generateTrack = () => {
        STPlaylist.list.forEach((a, i) => {
            if (i === 0) track.push(`${STCharacter.anims.warmUp}`)
            track.push(`${a.animName}_start`, `${a.animName}_loop`, `${a.animName}_finish`, `${STCharacter.anims.rest}`)
            if (i === STPlaylist.list.length - 1) track.push(`${STCharacter.anims.setIdle}`)
        })

        startAnim()
    }

    const startAnim = () => {
        if (iteration < STPlaylist.list.length * 4 + 2) {
            setTimeout(() => fadeAnim(), getTimeout())
        } else {
            --remainSets
            console.log('set finished, sets:', remainSets)
            if (remainSets > 0) {
                iteration = -1
                setTimeout(() => fadeAnim(), getTimeout())
            } else {
                setTimeout(() => finishTrack(), (actions[`${STCharacter.anims.warmUp}`]?._clip.duration - STPlaylist.crossFadeDuration) * 1000)
            }
        }
    }

    const fadeAnim = () => {
        ++iteration
        // console.log(iteration, track.at(iteration - 1), track[iteration], track.length, STPlaylist.list.length * 4 + 2)
        if (track[iteration]) actions[track[iteration]].reset().play()
        if (track[iteration]) actions[track.at(iteration - 1)].crossFadeTo(actions[track[iteration]], STPlaylist.crossFadeDuration)
        startAnim()
    }

    const finishTrack = () => {
        // console.log(iteration, `${STCharacter.anims.setIdle}`, `${STCharacter.anims.finish}`)
        actions[`${STCharacter.anims.finish}`].reset().play()
        actions[`${STCharacter.anims.setIdle}`].crossFadeTo(actions[`${STCharacter.anims.finish}`], STPlaylist.crossFadeDuration)
        setTimeout(() => { STModel.activeModel = 'MDCharacter'; STUI.activeUI = 'UIPlaylist' }, (actions[`${STCharacter.anims.finish}`]?._clip.duration - STPlaylist.crossFadeDuration) * 1000)
    }

    const getTimeout = () => {
        let timeout = 0
        if (iteration === -1) {
            timeout = 0
        } else if (iteration === 0) {
            timeout = STPlaylist.countdown * 1000
        } else if (iteration === track.length - 1) {
            timeout = STPlaylist.setRest * 1000
        } else {
            if (track[iteration].split('_')[0] === 'idle') {
                timeout = STPlaylist.rest * 1000
            } else if (track[iteration].split('_').at(-1) !== 'loop') {
                timeout = (actions[track[iteration]]?._clip.duration - STPlaylist.crossFadeDuration) * 1000
            } else {
                if (STPlaylist.isRepBased) {
                    timeout = (actions[track[iteration]]?._clip.duration * STPlaylist.reps - STPlaylist.crossFadeDuration) * 1000
                } else {
                    timeout = (STPlaylist.train - actions[track[iteration - 1]]?._clip.duration + actions[track[iteration + 1]]?._clip.duration - (STPlaylist.crossFadeDuration * 2)) * 1000
                }
            }
        }

        return timeout
    }

    useEffect(() => generateTrack(), [])


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