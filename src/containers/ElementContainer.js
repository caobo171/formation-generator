import {Container } from 'unstated-x'
import uuid from 'uuid'
import Elements from '../components/elments/Elements'


class ElementContainer extends Container {

    constructor(type,id){
        super()
        console.log('checkkkk ',type)
        let newElement = {
            id,
            type,
            data: new ElementContainerData(Elements[type].defaultProps)
        }

        ElementContainer.instances[id] = newElement
        return ElementContainer.instances[id]

    }
    static instances = new Map()

    static addElement(type){
        const id = uuid()
        return new ElementContainer(type,id)
        
    }
}

class ElementContainerData extends Container {
    constructor(state){
        
        super()
        console.log('check data',state)
        this.state=state
    }
}


export default ElementContainer