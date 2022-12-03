import { useRef, useLayoutEffect, useEffect, useState } from 'react'
import { useSnapshot } from 'valtio'
import { STUI, STPlaylist } from '../stores/utils.store'
import { gsap } from 'gsap'

export const UITimer = () => {
    const countdownRef = useRef()
    const timerRef = useRef()
    const barRef = useRef()
    const playlistSnap = useSnapshot(STPlaylist)
    const [countdown, setCountdown] = useState(playlistSnap.countdown)
    const [iteration, setIteration] = useState(-1)
    const [reminder, setReminder] = useState(-1)
    const [animLabels, setAnimLabels] = useState([])

    STPlaylist.track.forEach((anim, index) => {
        animLabels.push(anim.label, `Next: ${playlistSnap.track[index + 1]?.label}`)
    })

    const navUI = () => STUI.activeUI = 'UIPlaylist'

    useEffect(() => {
        if (countdown === 0) {
            gsap.to(timerRef.current, { opacity: 1, duration: 0.3 })
            setReminder(playlistSnap.train)
            return setIteration(iteration + 1)
        }

        gsap.fromTo(countdownRef.current, {
            opacity: 1,
        }, {
            opacity: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.in",
            onComplete: () => setCountdown(countdown - 1)
        })
    }, [countdown])

    const hideTimer = () => { gsap.to(timerRef.current, { opacity: 0, duration: 0.3 }) }

    useEffect(() => {
        if (iteration === -1) {
            let temp = []
            playlistSnap.list.forEach((anim, index) => {
                playlistSnap.list[index + 1] !== undefined ? temp.push(anim.label, `Next: ${playlistSnap.list[index + 1].label}`) : temp.push(anim.label)
            })
            return setAnimLabels(temp)
        }
        
        if (iteration === STPlaylist.track.length * 2 - 3) return hideTimer()

        gsap.fromTo(barRef.current, {
            width: '0%',
            backgroundColor: 'var(--system-yellow)',
            boxShadow: 'none'
        }, {
            width: '100%',
            backgroundColor: 'red',
            boxShadow: '0 0 15px 5px #FF3B30',
            duration: iteration % 2 === 0 ? +STPlaylist.train : +STPlaylist.rest,
            ease: 'linear',
            onComplete: () => { setIteration(iteration + 1); setReminder(iteration % 2 !== 0 ? +STPlaylist.train : +STPlaylist.rest)}
        })
    }, [iteration])

    useEffect(() => {
        if (iteration === -1) return

        reminder > 1 && setTimeout(() => setReminder(reminder - 1), 1000)
    }, [reminder])


    const sty = {
        uiBg: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            color: 'var(--primary-tint)',
            margin: '20px 20px 30px'
        },
        button: {
            width: 200,
            height: 40,
            borderRadius: 10,
            borderWidth: 0,
            fontSize: 17,
            fontWeight: '600',
            color: 'var(--white)',
            background: 'var(--primary-tint)',
            marginLeft: 20
        },
        countdown: {
            position: 'absolute',
            height: 140,
            width: 140,
            top: 'calc(50% - 70px)',
            display: 'flex',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center'
        },
        countdownLabel: {
            margin: 0,
            fontSize: 120,
            color: 'var(--system-red)'
        },
        timer: {
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            position: 'absolute',
            bottom: 70,
            opacity: 0
        },
        timerInfo: {
            display: 'flex',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '80vw',
        },
        timerLabel: {
            fontSize: 30,
            margin: '0 0 10px 10px'
        },
        timerReminder: {
            fontSize: 30,
            margin: '0 0 10px 10px'
        },
        timerBar: {
            display: 'flex',
            alignSelf: 'center',
            alignItems: 'center',
            height: 30,
            padding: 3,
            width: '80vw',
            backgroundColor: 'white',
            borderRadius: 15
        },
        bar: {
            height: 24,
            width: '0%',
            backgroundColor: 'var(--system-yellow)',
            borderRadius: 12
        }
    }


    return (
        <div style={sty.uiBg}>
            <h1 style={sty.header}>Timer Component</h1>
            <button style={sty.button} onClick={navUI}>Finish</button>
            <div style={sty.countdown}>
                <h1 ref={countdownRef} style={sty.countdownLabel}>{countdown}</h1>
            </div>
            <div ref={timerRef} style={sty.timer}>
                {animLabels[iteration] !== undefined && <div style={sty.timerInfo}>
                    <h1 style={sty.timerLabel}>{animLabels[iteration]}</h1>
                    <h1 style={sty.timerReminder}>{reminder}</h1>
                </div>}
                <div style={sty.timerBar}>
                    <div ref={barRef} style={sty.bar}></div>
                </div>
            </div>
        </div>
    )
}