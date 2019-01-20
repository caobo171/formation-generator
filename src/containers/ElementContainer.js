import { Container } from 'unstated-x'
import uuid from 'uuid'
import Elements from '../components/elments/Elements'
import React from 'react'
import $ from 'jquery'


class ElementContainer extends Container {
    domNodeRef = React.createRef()


    constructor(state) {
        super(state)
        const { id, type, x, y } = this.state

        this.state = {
            x,
            y,
            id,
            type,

            data: new ElementContainerData(Elements[type].defaultProps)
        }

        ElementContainer.instances.set(id, this);

    }
    static instances = new Map()


    static get = (id) => {
        return ElementContainer.instances.get(id)
    }
    static addElement = (state) => {
        const id = uuid()
        return new ElementContainer({ ...state, id })

    }


    get dom() {
        return this.domNodeRef.current
    }

    get box() {
        return this.dom.getBoundingClientRect()
    }


    static deleteElement = (id) => {
        ElementContainer.instances.delete(id)
        const arrayPaths = Array.from(PathContainer.instances).filter(e =>{
            console.log('check instances',e[1].state.point1,e[1].state.point2,id)
            return e[1].state.point1 === id || e[1].state.point2===id
        })
       
        console.log('check',arrayPaths)
        arrayPaths.forEach(e=>{
            PathContainer.instances.delete(e[0])
        })
    }


}

class ElementContainerData extends Container {
    constructor(state) {

        super()
        this.state = state
    }
}

export class PathContainer extends Container {
    constructor(state) {
        super(state)
        const { point1, point2, start, end, id, peak } = state
        this.state = {
            point1,
            point2,
            start,
            end,
            peak
        }

        PathContainer.instances.set(id, this)

    }
    domNodeRef = React.createRef()

    static addPath = (state) => {
        const id = uuid()
        console.log('check add path', id)
        return new PathContainer({ ...state, id })
    }

    static instances = new Map()
    static get = (id) => {
        return PathContainer.instances.get(id)
    }


    get dom() {
        return this.domNodeRef.current
    }

    get box() {
        return this.dom.getBoundingClientRect()
    }





    static deleteElement = (id) => {
        PathContainer.instances.delete(id)
    }
}

export const BindingContext = React.createContext({})

export default ElementContainer
window.ElementContainer = ElementContainer