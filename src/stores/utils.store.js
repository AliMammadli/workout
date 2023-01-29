import { proxy } from "valtio"


export const STApp = proxy({
    debugMode: false,
    debugModel: 'MDMuscle',
    debugUI: 'UIDebug',
    sceneName: 'SCGym'
})


export const STCharacter = proxy({
    model: 'female_body',
    gender: 'female',
    anims: {
        idle: 'idle_04',
        rest: 'idle_01',
        setIdle: 'idle_03',
        warmUp: 'warm_up_01',
        finish: 'victory_03'
    }
})


export const STUI = proxy({
    prevUI: '',
    activeUI: 'UIMuscle'
})


export const STModel = proxy({
    prevModel: '',
    activeModel: 'MDMuscle'
})


export const STFind = proxy({
    muscleMap: ''
})


export const STPlaylist = proxy({
    toggleAnim: false,
    isRepBased: true,
    reps: 5,
    sets: 1,
    train: 10,
    rest: 4,
    setRest: 15,
    countdown: 10,
    crossFadeDuration: 0.5,
    track: [],
    list: [],
    chosen: [],
    animlist: [
        {
            animName: 'back_squat',
            label: 'Back squat',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'burpee',
            label: 'Burpee',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'jumping_jacks',
            label: 'Jumping jacks',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'kettlebell',
            label: 'Kettlebell',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'overhead_squat',
            label: 'Overhead squat',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'pistol',
            label: 'Pistol',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'plank',
            label: 'Plank',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'push_up',
            label: 'Push up',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'sit_up',
            label: 'Sit up',
            url: {
                img: '/images/anim_preview_2.png'
            }
        },
        {
            animName: 'snatch',
            label: 'Snatch',
            url: {
                img: '/images/anim_preview_2.png'
            }
        }
    ]
})