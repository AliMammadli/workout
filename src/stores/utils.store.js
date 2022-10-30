import { proxy } from "valtio"


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
    train: 10,
    rest: 4,
    countdown: 5,
    track: [],
    list: [],
    chosen: [],
    animlist: [
        {
            animName: 'anim_1',
            label: 'Side streching',
            url: {
                gif: '/images/anim_1.gif',
                gltf: '/anims/anim_1.gltf'
            }
        },
        {
            animName: 'anim_2',
            label: 'Arm rising',
            url: {
                gif: '/images/anim_2.gif',
                gltf: '/anims/anim_2.gltf'
            }
        },
        {
            animName: 'anim_3',
            label: 'Body rotation',
            url: {
                gif: '/images/anim_3.gif',
                gltf: '/anims/anim_3.gltf'
            }
        },
        {
            animName: 'anim_4',
            label: 'Overhead clap',
            url: {
                gif: '/images/anim_4.gif',
                gltf: '/anims/anim_4.gltf'
            }
        },
        {
            animName: 'anim_5',
            label: 'Arm cross',
            url: {
                gif: '/images/anim_5.gif',
                gltf: '/anims/anim_5.gltf'
            }
        }
    ]
})