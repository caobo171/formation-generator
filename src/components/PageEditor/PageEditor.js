import React from 'react';
import ElementContainer, {PathContainer} from '../../containers/ElementContainer'
import workspaceContainer, { refSVG } from '../../containers/WorkspaceContainer'
import templateContainer from '../../containers/TemplateContainer'
import { SubscribeOne } from 'unstated-x'
import PathBox from './PathBox'
import ToolBox from './ToolBox'
import renderElement from '../../helpers/renderElement'

class PageEditor extends React.Component {


    state = {
        resources: [],
        selectElement: null,
        paths: [],
        isMovingElement: false
    }

    onMouseDownHandle = (e) => {
        const selected = e.target.parentNode.getAttribute('data-element')
        const point = e.target.getAttribute('data-el')
        const path = e.target.getAttribute('data-path')
        if (selected) {
            this.setState({ isMovingElement: selected })
            workspaceContainer.setState({ selected })
            this.setState({ isMovingElement: selected })
        } else if (!selected && !point && !path && e.target.tagName === 'svg') {
            workspaceContainer.setState({ selected: null })
        }
    }

    onMouseMoveHandle = (e) => {
        const id = this.state.isMovingElement
        const { x, y } = { x: e.clientX - refSVG.current.getBoundingClientRect().left, y: e.clientY - refSVG.current.getBoundingClientRect().top }

        if (id) {

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
    }

    onMouseUpHandle = (e)=> {
        this.setState({isMovingElement:false})
    }


    onDragOverCaptureHandle = (e) => {
        e.preventDefault()
    }


    onDropHandle = (e) => {

        const type = e.dataTransfer.getData("dataResource");
        const { x, y } = { x: e.clientX - refSVG.current.getBoundingClientRect().left, y: e.clientY - refSVG.current.getBoundingClientRect().top }

        if (type) {

            ElementContainer.addElement({ type, x, y })
            templateContainer.setState({ resources: Array.from(ElementContainer.instances) })
        }

        e.preventDefault()
    }

    componentDidMount(){
        console.log('check nothing')
    }


    render() {

        return (
            <div
                onDragOverCapture={this.onDragOverCaptureHandle}
                onDropCapture={this.onDropHandle}
                onMouseDown={this.onMouseDownHandle}
                onMouseMoveCapture={this.onMouseMoveHandle}
                onMouseUpCapture = { this.onMouseUpHandle}>

                <SubscribeOne to={templateContainer} bind={['resources', 'paths']}>
                    {
                        tplContainer => (
                            <PathBox {...this.props} paths={tplContainer.state.paths}>
                                {renderElement(tplContainer.state.resources)}
                            </PathBox>
                        )
                    }
                </SubscribeOne>

                <ToolBox></ToolBox>


            </div>
        )
    }
}

export default PageEditor

