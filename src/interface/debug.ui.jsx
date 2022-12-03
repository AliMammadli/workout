import { useState, useEffect } from "react"
import { useSnapshot } from "valtio"


export const UIDebug = () => {

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
        muscleLabel: {
            margin: '0 0 30px',
            textTransform: 'capitalize'
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
        }
    }

    return (
        <div style={sty.uiBg}>
            <h1 style={sty.header}>Debug</h1>
        </div>
    )
}