import React, { useRef, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { useGLTF, useAnimations } from '@react-three/drei'
import { STPlaylist, STModel, STUI } from '../stores/utils.store'
import { LoopRepeat, AnimationUtils } from 'three'


export function MDPerformer(props) {
    const meshRef = useRef()
    const playlistSnap = useSnapshot(STPlaylist)
    const { nodes, materials } = useGLTF('/models/character.gltf')
    // const { nodes, materials } = useGLTF('/models/male_body.gltf')

    let anims = []

    STPlaylist.track.forEach((a) => {
        let { animations } = useGLTF(a.url.gltf)
        anims.push(...animations)
    })

    const { actions, clips, mixer } = useAnimations([...anims], meshRef)

    const startPlaylist = () => {
        let actIndex = 0
        const trainRep = parseInt(STPlaylist.train / 2)
        const restRep = parseInt(STPlaylist.rest / 2)

        // console.log(AnimationUtils.subclip(clips[1], 'anim_1_trim', 0, 61))

        actions['anim_rest'].reset().play()
        setTimeout(() => {
            actions[STPlaylist.track[actIndex].animName].setLoop(LoopRepeat, trainRep).fadeIn(0.5).play()
            actions['anim_rest'].stop()
        }, (playlistSnap.countdown * 1000))

        mixer.addEventListener('finished', (e) => {
            if (e.action._clip.name === 'anim_finish') {
                STModel.activeModel = 'MDCharacter'
                STUI.activeUI = 'UIPlaylist'
            } else if (e.action._clip.name !== 'anim_rest') {
                actions['anim_rest'].setLoop(LoopRepeat, restRep).reset().play()
                actions[STPlaylist.track[actIndex].animName].stop()
            } else if (e.action._clip.name === 'anim_rest') {
                if (actIndex === STPlaylist.track.length - 3) {
                    actions['anim_finish'].setLoop(LoopRepeat, 2).fadeIn(1).play()
                } else {
                    actions[STPlaylist.track[++actIndex].animName].setLoop(LoopRepeat, trainRep).play()
                }
                actions['anim_rest'].stop()
            }
        })
    }

    useEffect(() => startPlaylist(), [])


    return (
        <group ref={meshRef} {...props} dispose={null}>
            <group rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh castShadow geometry={nodes.Alpha_Joints.geometry} material={materials.Alpha_Joints_MAT} skeleton={nodes.Alpha_Joints.skeleton} />
                <skinnedMesh castShadow geometry={nodes.Alpha_Surface.geometry} material={materials.Alpha_Body_MAT} skeleton={nodes.Alpha_Surface.skeleton} />
                {/* <skinnedMesh name="Boxers" geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.Boxers.skeleton} />
                <skinnedMesh name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.CC_Base_Body.skeleton} />
                <skinnedMesh name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge.001']} skeleton={nodes.CC_Base_Eye.skeleton} /> */}
            </group>
        </group>
    )
}

useGLTF.preload('/models/character.gltf')
// useGLTF.preload('/models/male_body.gltf')