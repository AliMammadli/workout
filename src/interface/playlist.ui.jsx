import { useSnapshot } from 'valtio'
import { STPlaylist, STModel, STUI } from '../stores/utils.store'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export const UIPlaylist = () => {
    const playlistSnap = useSnapshot(STPlaylist)

    const startAnim = () => {
        STPlaylist.track = [...playlistSnap.list, { animName: 'anim_finish', url: { gltf: '/anims/anim_finish.gltf' } }, { animName: 'anim_rest', url: { gltf: '/anims/anim_rest.gltf' } }]
        STModel.activeModel = 'MDPerformer'
        STUI.activeUI = 'UITimer'
        STPlaylist.toggleAnim = !playlistSnap.toggleAnim
    }

    const updateList = (result) => {
        if (!result.destination) return

        const items = Array.from(playlistSnap.list)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        STPlaylist.list = items
    }

    const updateTiming = (type, action) => {
        STPlaylist[type] = +playlistSnap[type] + action
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
            marginBottom: 30
        },
        listItem: {
            display: 'flex',
            alignItems: 'center',
            height: 70,
            padding: 10,
            margin: '8px 0',
            borderRadius: 10,
            background: 'white'
        },
        listItemImage: {
            width: 50,
            height: 50,
            borderRadius: 8,
            border: '1px solid #ccc'
        },
        listItemLabel: {
            marginLeft: 15,
            fontWeight: '400'
        },
        options: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            height: 70,
            padding: 10,
            marginBottom: 30,
            borderRadius: 10,
            background: 'white'
        },
        option: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            margin: 10
        },
        optionLabel: {
            margin: '0 0 10px 0',
            color: 'slategray'
        },
        optionDetail: {
            display: 'flex',
            alignItems: 'center'
        },
        optionButton: {
            display: 'flex',
            justifyContent: 'center',
            height: 24,
            width: 24,
            borderRadius: 12,
            border: 'none',
            background: 'rgba(0, 0, 0, 0.25)',// 'var(--tertiary-fill)',
            fontSize: 26,
            lineHeight: '20px',
            color: 'var(--primary-tint)',
            cursor: 'pointer'
        },
        optionInput: {
            height: 22,
            width: 26,
            borderRadius: 4,
            border: '1px solid gray',
            textAlign: 'center',
            fontWeight: '700'
        },
        optionInputLabel: {
            margin: '0 8px 0',
            fontSize: 16
        },
        button: {
            width: '100%',
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
            <h1 style={sty.header}>Workout Builder</h1>
            <DragDropContext onDragEnd={updateList}>
                <Droppable droppableId='playlist'>
                    {(provided) => (
                        <div style={sty.list} {...provided.droppableProps} ref={provided.innerRef}>
                            {playlistSnap.list.map((move, i) => {
                                return (
                                    <Draggable key={i} draggableId={i.toString()} index={i}>
                                        {(provided) => (
                                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                <div style={sty.listItem}>
                                                    <img style={sty.listItemImage} src={move.url.gif} />
                                                    <h3 style={sty.listItemLabel}>{move.label}</h3>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <div style={sty.options}>
                <div style={sty.option}>
                    <h4 style={sty.optionLabel}>Train</h4>
                    <div style={sty.optionDetail}>
                        <div style={sty.optionButton} onClick={() => updateTiming('train', -5)}>-</div>
                        <h5 style={sty.optionInputLabel}>{playlistSnap.train}s</h5>
                        <div style={sty.optionButton} onClick={() => updateTiming('train', 5)}>+</div>
                    </div>
                </div>
                <div style={sty.option}>
                    <h4 style={sty.optionLabel}>Rest</h4>
                    <div style={sty.optionDetail}>
                        <div style={sty.optionButton} onClick={() => updateTiming('rest', -1)}>-</div>
                        <h5 style={sty.optionInputLabel}>{playlistSnap.rest}s</h5>
                        <div style={sty.optionButton} onClick={() => updateTiming('rest', 1)}>+</div>
                    </div>
                </div>
                <div style={sty.option}>
                    <h4 style={sty.optionLabel}>Timer</h4>
                    <div style={sty.optionDetail}>
                        <div style={sty.optionButton} onClick={() => updateTiming('countdown', -1)}>-</div>
                        <h5 style={sty.optionInputLabel}>{playlistSnap.countdown}s</h5>
                        <div style={sty.optionButton} onClick={() => updateTiming('countdown', 1)}>+</div>
                    </div>
                </div>
            </div>
            <button style={sty.button} onClick={startAnim}>Start</button>
        </div>
    )
}