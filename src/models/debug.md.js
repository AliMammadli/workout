import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'


export function MDDebug(props) {
    const meshRef = useRef()
    const { nodes, materials } = useGLTF('/models/male_body.gltf')

    const pushUpAnim = useGLTF('/anims/male/push_up.gltf').animations
    const backSquatAnim = useGLTF('/anims/male/back_squat.gltf').animations
    
    const warmUpAnim = useGLTF('/anims/male/warm_up_01.gltf').animations
    const idleAnim = useGLTF('/anims/male/idle_04.gltf').animations
    const victoryAnim = useGLTF('/anims/male/victory_03.gltf').animations

    const { actions } = useAnimations([...pushUpAnim, ...backSquatAnim, ...warmUpAnim, ...idleAnim, ...victoryAnim], meshRef)
    
    
    const playlist = [
        {
            animName: 'push_up',
            label: 'Push up',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'back_squat',
            label: 'Back squat',
            url: {
                img: '/images/anim_preview_2.png'
            }
        }
    ]
    const track = []
    const train = 10
    const rest = 4
    const countdown = 5
    
    const crossFadeDuration = 0.5
    
    let iteration = -1

    
    const generateTrack = () => {
        playlist.forEach((a, i) => {
            if (i === 0) track.push('warm_up_01')
            track.push(`${a.animName}_start`, `${a.animName}_loop`, `${a.animName}_finish`, 'idle_04')
            if (i === playlist.length - 1) track.push('victory_03', 'idle_04')
        })

        startAnim()
    }

    const startAnim = () => {
        iteration < 11 && setTimeout(() => fadeAnim(), getTimeout())
    }
    
    const fadeAnim = () => {
        ++iteration
        if (track[iteration]) actions[track[iteration]].reset().play()
        if (track[iteration - 1] && track[iteration]) actions[track[iteration - 1]].crossFadeTo(actions[track[iteration]], crossFadeDuration)
        startAnim()
    }

    const getTimeout = () => {
        let timeout = 0
        if (iteration === -1) {
            timeout = 0
        } else if (iteration === 0) {
            timeout = countdown * 1000
        } else {
            if (track[iteration].split('_')[0] === 'idle') {
                timeout = rest * 1000
            } else if (track[iteration].split('_').at(-1) !== 'loop') {
                timeout = (actions[track[iteration]]?._clip.duration - crossFadeDuration) * 1000
            } else {
                timeout = (train - actions[track[iteration - 1]]?._clip.duration + actions[track[iteration + 1]]?._clip.duration - (crossFadeDuration * 2)) * 1000

                // if (playlistSnap.isRepBased) {
                //     timeout = (actions[track[iteration]]?._clip.duration * playlistSnap.reps - crossFadeDuration) * 1000
                // } else {
                //     timeout = (train - actions[track[iteration - 1]]?._clip.duration + actions[track[iteration + 1]]?._clip.duration - (crossFadeDuration * 2)) * 1000
                // }
            }
        }

        return timeout
    }

    useEffect(() => generateTrack(), [])


    return (
        <group ref={meshRef} {...props} dispose={null}>
            <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.0015}>
                <primitive object={nodes.mixamorigHips} />
                <skinnedMesh castShadow name="Boxers" geometry={nodes.Boxers.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.Boxers.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Body" geometry={nodes.CC_Base_Body.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Body.skeleton} />
                <skinnedMesh castShadow name="CC_Base_Eye" geometry={nodes.CC_Base_Eye.geometry} material={materials['4_meshes_Merge']} skeleton={nodes.CC_Base_Eye.skeleton} />
            </group>
        </group>
    )
}

useGLTF.preload('/models/male_body_unscaled.gltf')