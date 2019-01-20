import { SubscribeOne } from 'unstated-x'
import React from 'react'
import Elements from '../components/elments/Elements'
import ElementContainer from '../containers/ElementContainer'
export default function renderElement(arrayOfElement) {

    const onDragStartHandle = (e) => {
        const select = e.target.parentNode.getAttribute('data-element')
        if (select) {
            e.dataTransfer.setData('id', select)
        }
    }

    return (
        <React.Fragment>
            {arrayOfElement.map((e) => {
                const ElementComponent = Elements[e[1].state.type]
                const element = ElementContainer.get(e[0])
                return (<SubscribeOne key={e[0]} to={e[1]} bind={['x', 'y']}>
                    {
                        elementContainer => (
                            <g data-element={elementContainer.state.id}
                                ref={element.domNodeRef}
                                onDragStartCapture={onDragStartHandle}
                                draggable={true}
                                style={{ cursor: 'all-scroll' }}>
                                <ElementComponent x={elementContainer.state.x} y={elementContainer.state.y}></ElementComponent>
                            </g>)
                    }
                </SubscribeOne>)
            })}
        </React.Fragment>
    )
}