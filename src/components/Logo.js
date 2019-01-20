import React from 'react';
import ElementContainer, { PathContainer } from '../containers/ElementContainer'
import Elements from './elments/Elements';
import workspaceContainer from '../containers/WorkspaceContainer'
import { SubscribeOne } from 'unstated-x'
import PathBox from '../helpers/PathBox'
import renderElement from '../helpers/renderElement'

class Logo extends React.Component {


    state = {
        resources: [],
        selectElement: null,
        paths: []
    }

    onMouseDownHandle = (e) => {
        const selected = e.target.parentNode.getAttribute('data-element')
        if (selected) {
            workspaceContainer.setState({ selected })
        }
    }


    onDragOverCaptureHandle = (e) => {
        e.preventDefault()
    }

    onDeleteHandle = (e) => {
        const path = PathContainer.get(workspaceContainer.state.selected)
        if(path){
            PathContainer.deleteElement(workspaceContainer.state.selected)
            console.log('check DELETED', Array.from(PathContainer.instances))
            workspaceContainer.setState({ selected: null }, () => {
                this.setState({
                    paths: Array.from(PathContainer.instances)
                })
            })
        }else{
            ElementContainer.deleteElement(workspaceContainer.state.selected)
            workspaceContainer.setState({ selected: null }, () => {
                this.setState({
                    paths: Array.from(PathContainer.instances),
                    resources: Array.from(ElementContainer.instances)
                })
            })
        }


    }

    onDropHandle = (e) => {

        const type = e.dataTransfer.getData("dataResource");
        const id = e.dataTransfer.getData("id")
        const { x, y } = { x: e.clientX - e.target.getBoundingClientRect().left, y: e.clientY - e.target.getBoundingClientRect().top }

        if (type) {

            const data = ElementContainer.addElement({ type, x, y })
            this.setState({ resources: Array.from(ElementContainer.instances) })
        } else if (id) {

            const elContainer = ElementContainer.get(id)
            const { addX, addY } = { addX: x - elContainer.state.x, addY: y - elContainer.state.y }

            elContainer.setState({ x, y })
            const arrayPaths = Array.from(PathContainer.instances)

            const pathInstances = arrayPaths.map(e => {
                if (e[1].state.point1 === id) {
                    return { container: e[1], start: true }
                } else if (e[1].state.point2 === id) {
                    return { container: e[1], start: false }
                } else {
                    return null
                }
            }).filter(e => e !== null)

            pathInstances.forEach(e => {

                if (e.start) {
                    const { x, y } = e.container.state.start

                    e.container.setState({
                        start: {
                            x: x + addX,
                            y: y + addY
                        }
                    })
                } else if (!e.start) {
                    const { x, y } = e.container.state.end
                    e.container.setState({
                        end: {
                            x: x + addX,
                            y: y + addY
                        }
                    })
                }
            })
        }

        e.preventDefault()
    }


    render() {

        return (
            <div
                onDragOverCapture={this.onDragOverCaptureHandle}
                onDropCapture={this.onDropHandle}
                onMouseDown={this.onMouseDownHandle}
                onMouseMoveCapture={this.onMouseMoveHandle}
                onDragCapture={this.onDragOverCaptureHandle}>
                <PathBox {...this.props} paths={this.state.paths} onPathsChange={(paths) => {
                    this.setState({ paths })
                }}>
                    {renderElement(this.state.resources)}
                </PathBox>
                <SubscribeOne to={workspaceContainer} bind={['selected']} >
                    {ws => {
                        if (ws.state.selected) {
                            let element = ElementContainer.get(ws.state.selected)
                            if(!element){
                                element = PathContainer.get(ws.state.selected)
                            }
                            const {top,left} = element.box
                      
         
                            return (
                                <div style={{ top: `${top - 20}px`, left: `${left - 20}px`, position: 'fixed' }}>
                                    <button onClick={this.onDeleteHandle}><i class="far fa-trash-alt"></i></button>
                                </div>
                            )
                        } else {
                            return
                        }

                    }}
                </SubscribeOne>
            </div>
        )
    }
}

export default Logo

