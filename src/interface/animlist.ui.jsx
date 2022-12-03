import { useSnapshot } from "valtio"
import { STUI, STPlaylist } from "../stores/utils.store"


export const UIAnimlist = () => {
    const playlistSnap = useSnapshot(STPlaylist)

    const choose = (animIndex) => {
        const index = playlistSnap.chosen.indexOf(animIndex)
        index > -1 ? STPlaylist.chosen.splice(index, 1) : STPlaylist.chosen.push(animIndex)
    }

    const navUI = () => {
        playlistSnap.chosen.forEach((animIndex) => {
            STPlaylist.list.push(playlistSnap.animlist[animIndex])
        })
        STUI.activeUI = 'UIPlaylist'
    }

    const sty = {
        uiBg: {
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 20
        },
        header: {
            color: 'var(--primary-tint)',
            margin: '0 0 30px'
        },
        list: {
            display: 'flex',
            flexWrap: 'wrap',
            width: '45%',
            marginBottom: 30,
            overflowY: 'scroll'
        },
        listItemBg: {
            display: 'flex',
            flex: '0 1 10%',
            justifyContent: 'center',
            margin: 10,
            cursor: 'pointer',
            borderRadius: 14
        },
        listItem: {
            display: 'flex',
            padding: 10,
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 10,
            overflow: 'hidden',
            background: 'white',
            transition: 'all .2s ease-in-out'
        },
        listItemImage: {
            height: 140,
        },
        listItemLabel: {
            fontSize: 17,
            margin: '10px 0 15px'
        },
        button: {
            width: 200,
            height: 40,
            borderRadius: 10,
            borderWidth: 0,
            fontSize: 17,
            fontWeight: '600',
            color: 'var(--white)',
            background: 'var(--primary-tint)'
        },
    }

    return (
        <div style={sty.uiBg}>
            <h1 style={sty.header}>Animation list</h1>
            <div style={sty.list}>
                {playlistSnap.animlist.map((anim, i) => {
                    return (
                        <div style={{ ...sty.listItemBg, boxShadow: playlistSnap.chosen.indexOf(i) > -1 ? '0 0 0 5px var(--primary-tint) inset' : 'none' }} key={i}>
                            <div style={{ ...sty.listItem, transform: playlistSnap.chosen.indexOf(i) > -1 ? 'scale(0.85)' : 'scale(1)' }} onClick={() => choose(i)}>
                                <img style={sty.listItemImage} src={anim.url.img} />
                                <h3 style={sty.listItemLabel}>{anim.label}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button style={sty.button} onClick={navUI}>Continue</button>
        </div>
    )
}