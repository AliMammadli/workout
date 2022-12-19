import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useGesture } from '@use-gesture/react'
import { STModel, STUI, STFind } from '../stores/utils.store'

export function MDMuscle(props) {
    const meshRef = useRef()

    const { nodes, materials } = useGLTF('/models/muscle_map.gltf')

    const bind = useGesture({
        onClick: ({ event }) => { event.stopPropagation(); navUI(event.object.name) },
        onPointerOut: ({ event }) => { event.object.material = materials.body; STFind.muscleMap = '' },
        onPointerEnter: ({ event }) => { if (event.object.name !== 'body') { event.object.material = materials.active; STFind.muscleMap = event.object.name } }
    })

    const navUI = () => {
        STModel.activeModel = 'MDCharacter'
        STUI.activeUI = 'UIAnimlist'
    }


    return (
        <group ref={meshRef} {...props} {...bind()} dispose={null}>
            <mesh castShadow name="adductor" geometry={nodes.adductor.geometry} material={materials.body} />
            <mesh castShadow name="biceps" geometry={nodes.biceps.geometry} material={materials.body} />
            <mesh castShadow name="body" geometry={nodes.body.geometry} material={materials.active} />
            <mesh castShadow name="brachioradialis" geometry={nodes.brachioradialis.geometry} material={materials.body} />
            <mesh castShadow name="calves" geometry={nodes.calves.geometry} material={materials.body} />
            <mesh castShadow name="deltoids" geometry={nodes.deltoids.geometry} material={materials.body} />
            <mesh castShadow name="erector_spinae" geometry={nodes.erector_spinae.geometry} material={materials.body} />
            <mesh castShadow name="flexor" geometry={nodes.flexor.geometry} material={materials.body} />
            <mesh castShadow name="glutes" geometry={nodes.glutes.geometry} material={materials.body} />
            <mesh castShadow name="hamstrings" geometry={nodes.hamstrings.geometry} material={materials.body} />
            <mesh castShadow name="hip_abductor" geometry={nodes.hip_abductor.geometry} material={materials.body} />
            <mesh castShadow name="lats" geometry={nodes.lats.geometry} material={materials.body} />
            <mesh castShadow name="lower_ab" geometry={nodes.lower_ab.geometry} material={materials.body} />
            <mesh castShadow name="lower_obliques" geometry={nodes.lower_obliques.geometry} material={materials.body} />
            <mesh castShadow name="obliques" geometry={nodes.obliques.geometry} material={materials.body} />
            <mesh castShadow name="pecs" geometry={nodes.pecs.geometry} material={materials.body} />
            <mesh castShadow name="quads" geometry={nodes.quads.geometry} material={materials.body} />
            <mesh castShadow name="sartorius" geometry={nodes.sartorius.geometry} material={materials.body} />
            <mesh castShadow name="serratus_anterior" geometry={nodes.serratus_anterior.geometry} material={materials.body} />
            <mesh castShadow name="teres_major" geometry={nodes.teres_major.geometry} material={materials.body} />
            <mesh castShadow name="traps" geometry={nodes.traps.geometry} material={materials.body} />
            <mesh castShadow name="triceps" geometry={nodes.triceps.geometry} material={materials.body} />
            <mesh castShadow name="upper_ab" geometry={nodes.upper_ab.geometry} material={materials.body} />
            <mesh castShadow name="vastus_medialis" geometry={nodes.vastus_medialis.geometry} material={materials.body} />
        </group>
    )
}

useGLTF.preload('/models/muscle_map.gltf')