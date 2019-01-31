import React from 'react';
<<<<<<< HEAD:src/components/PageEditor.js
import ElementContainer, { PathContainer } from '../containers/ElementContainer'
import Elements from './elments/Elements';
import workspaceContainer,{refSVG} from '../containers/WorkspaceContainer'
import templateContainer from '../containers/TemplateContainer'
=======
import ElementContainer, {PathContainer} from '../../containers/ElementContainer'
import workspaceContainer, { refSVG } from '../../containers/WorkspaceContainer'
import templateContainer from '../../containers/TemplateContainer'
>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js
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
<<<<<<< HEAD:src/components/PageEditor.js
=======
            this.setState({ isMovingElement: selected })
>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js
        } else if (!selected && !point && !path && e.target.tagName === 'svg') {
            workspaceContainer.setState({ selected: null })
        }
    }

    onMouseMoveHandle = (e) => {
<<<<<<< HEAD:src/components/PageEditor.js
        if (this.state.isMovingElement) {
            const id = this.state.isMovingElement
            const { x, y } = { x: e.clientX - refSVG.current.getBoundingClientRect().left, y: e.clientY - refSVG.current.getBoundingClientRect().top }

            console.log('checkkk target ',e.target)
=======
        const id = this.state.isMovingElement
        const { x, y } = { x: e.clientX - refSVG.current.getBoundingClientRect().left, y: e.clientY - refSVG.current.getBoundingClientRect().top }

        if (id) {

>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js
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

<<<<<<< HEAD:src/components/PageEditor.js
    onMouseUpHandle = (e)=>{
=======
    onMouseUpHandle = (e)=> {
>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js
        this.setState({isMovingElement:false})
    }


    onDragOverCaptureHandle = (e) => {
        e.preventDefault()
    }

<<<<<<< HEAD:src/components/PageEditor.js
    onDeleteHandle = (e) => {
        const path = PathContainer.get(workspaceContainer.state.selected)
        if (path) {
            PathContainer.deleteElement(workspaceContainer.state.selected)
            console.log('check DELETED', Array.from(PathContainer.instances))
            workspaceContainer.setState({ selected: null }, () => {
                templateContainer.setState({ paths: Array.from(PathContainer.instances) })
            })
        } else {
            ElementContainer.deleteElement(workspaceContainer.state.selected)
            workspaceContainer.setState({ selected: null }, () => {
                templateContainer.setState({
                    paths: Array.from(PathContainer.instances),
                    resources: Array.from(ElementContainer.instances)
                })
            })
        }


    }
=======

>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js

    onDropHandle = (e) => {

        const type = e.dataTransfer.getData("dataResource");
        const id = e.dataTransfer.getData("id")
<<<<<<< HEAD:src/components/PageEditor.js
        const { x, y } = { x: e.clientX - e.target.getBoundingClientRect().left, y: e.clientY - e.target.getBoundingClientRect().top }
=======
        const { x, y } = { x: e.clientX - refSVG.current.getBoundingClientRect().left, y: e.clientY - refSVG.current.getBoundingClientRect().top }
>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js

        if (type) {

            const data = ElementContainer.addElement({ type, x, y })
            templateContainer.setState({ resources: Array.from(ElementContainer.instances) })
<<<<<<< HEAD:src/components/PageEditor.js
        } 
=======
        }
>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js

        e.preventDefault()
    }


    render() {

        return (
            <div
                onDragOverCapture={this.onDragOverCaptureHandle}
                onDropCapture={this.onDropHandle}
                onMouseDown={this.onMouseDownHandle}
                onMouseMoveCapture={this.onMouseMoveHandle}
<<<<<<< HEAD:src/components/PageEditor.js
                onMouseUp = {this.onMouseUpHandle}
            >
=======
                onMouseUpCapture = { this.onMouseUpHandle}>
>>>>>>> de99e599ccf629fc0f24aac17d2b2f1785fcfaee:src/components/PageEditor/PageEditor.js

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

