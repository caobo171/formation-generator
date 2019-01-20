import { SubscribeOne } from 'unstated-x'
import React from 'react'
import Elements from '../components/elments/Elements'
import ElementContainer from '../containers/ElementContainer'
export default function renderPath(arrayOfPath) {

    return (
        <React.Fragment>
            {
                arrayOfPath.map(e => {
                   
                    return (
                        <SubscribeOne to={e[1]} key={e[0]} bind={['start', 'end','peak']}>
                            {path => {
                                const { start, end, peak } = path.state
                                return (
                                    <path ref={path.domNodeRef} d={`M ${start.x} ${start.y} q ${peak.x} ${peak.y} ${end.x - start.x} ${end.y - start.y}`}
                                        draggable = {false}
                                        data-path={e[0]}
                                        stroke="blue" stroke-width="5" fill="none" />
                                )
                            }}
                        </SubscribeOne>

                    )
                })
            }
        </React.Fragment>
    )
}