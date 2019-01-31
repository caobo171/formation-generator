import React from 'react'
import ElementContainer, { PathContainer } from '../containers/ElementContainer'
import workspaceContainer,{refSVG} from '../containers/WorkspaceContainer'
import templateContainer from '../containers/TemplateContainer'
import { SubscribeOne } from 'unstated-x';
import renderPath from '../helpers/renderPath'


class PathBox extends React.Component {
    state = {
        box: {},
        dataElement: null,
        onMouseDown: false,
        pathStart: null,
        pathEnd: null,
        isPath: false,


        editPathStart: false,
        pathElement: null,
        prevPath: { x: 0, y: 0 }

    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.paths !== nextProps.paths && nextProps.paths !== null) {
            return { paths: nextProps.paths }
        } else {
            return null
        }
    }


    refSVG = React.createRef()

    x = 0; y = 0; prevX = 0; prevY = 0
    timer = null;


    onMouseMoveHandle = async (e) => {
        e.persist()

        const dataElement = e.target.parentNode.getAttribute('data-element')
        const { pathStart, isPath, onMouseDown, editPathStart, pathElement } = this.state

        if (pathStart && onMouseDown && isPath) {

            const rectSvg = refSVG.current.getBoundingClientRect()
            const pathEnd = {
                x: e.clientX + 4 - rectSvg.left,
                y: e.clientY + 4 - rectSvg.top
            }
            this.setState({ pathEnd })
        }

        if (editPathStart) {

            //console.log('chat  ok ok ', this.x, this.y, this.prevX, this.prevY, pathElement)
            const pathContainer = PathContainer.get(pathElement)
            window.path = pathContainer
            const rectSvg = refSVG.current.getBoundingClientRect()

            pathContainer.setState((state, props) => {
                return {
                    peak: {
                        x: e.clientX - rectSvg.left - (state.start.x + state.end.x) / 2,
                        y: e.clientY - rectSvg.top - (state.start.y + state.end.y) / 2
                    }
                }
            })
        } else {
            this.prevX = e.clientX;
            this.prevY = e.clientY;
        }

        if (dataElement) {
            const element = ElementContainer.get(dataElement)
            const rectSvg = refSVG.current.getBoundingClientRect()
            const rectBox = element.box

            this.setState({
                box: {
                    top: rectBox.top - rectSvg.top,
                    left: rectBox.left - rectSvg.left,
                    bottom: rectBox.top - rectSvg.top + rectBox.height,
                    right: rectBox.left - rectSvg.left + rectBox.width,
                    width: rectBox.width,
                    height: rectBox.height
                }, dataElement
            })
        }
    }






    onMouseDownHandle = (e) => {
        const point = e.target.getAttribute('data-el')
        const path = e.target.getAttribute('data-path')

        if (point) {

            const pathStart = {
                x: Number(e.target.getAttribute('cx')),
                y: Number(e.target.getAttribute('cy')),

            }
            this.setState({ pathStart, pathEnd: pathStart, startId: point, isPath: true, onMouseDown: true })
        } else if (path) {

            workspaceContainer.setState({ selected: path })
            this.setState({ editPathStart: true, pathElement: path }, () => {
                this.prevX = e.clientX;
                this.prevY = e.clientY;
                console.log('check', PathContainer.get(path).dom)
                PathContainer.get(path).dom.setAttribute('stroke', 'red')
            })
        }


    }


    convertToBox(svgBox, elementBox) {
        const box = {
            top: elementBox.top - svgBox.top,
            left: elementBox.left - svgBox.left,
            bottom: elementBox.top - svgBox.top + elementBox.height,
            right: elementBox.left - svgBox.left + elementBox.width
        }
        return box
    }


    onMouseUpHandle = (e) => {
        const data = e.target.getAttribute('data-el')
        window.target = e.target
        if (data && data !== this.state.startId) {


            PathContainer.addPath({
                start: this.state.pathStart,
                end: this.state.pathEnd,
                point1: this.state.startId,
                point2: data,
                peak: { x: 0, y: 0 }
            })
            //this.setState({ paths: Array.from(PathContainer.instances) })
            //this.props.onPathsChange(Array.from(PathContainer.instances))
            templateContainer.setState({ paths: Array.from(PathContainer.instances) })
        }

        if (this.state.pathElement) {
            PathContainer.get(this.state.pathElement).dom.setAttribute('stroke', 'blue')
        }
        this.setState({
            onMouseDown: false,
            isPath: false,
            pathEnd: null,
            pathStart: null,
            editPathStart: false, pathElement: null
        })
    }

    render() {
        const { dataElement, box, box2, onMouseDown, isPath, pathEnd, pathStart } = this.state
        const { top, left, right, bottom } = {
            top: { x: (box.left + box.right) / 2, y: box.top },
            left: { x: (box.left), y: (box.top + box.bottom) / 2 },
            right: { x: box.right, y: (box.top + box.bottom) / 2 },
            bottom: { x: (box.left + box.right) / 2, y: box.bottom },
        }
        const add = 8;
        const r = 6;



        return (
            <svg id='edit' ref={refSVG} xmlns="http://www.w3.org/2000/svg"
                onMouseMove={this.onMouseMoveHandle}
                onMouseDown={this.onMouseDownHandle}
                onMouseUp={this.onMouseUpHandle}
                style={{ outline: '#4CAF50 solid 5px' }}
                width={this.props.width} height={this.props.height} preserveAspectRatio="xMidYMid meet">

                <g stroke="black" strokeWidth="3" fill="black" >
                    <circle data-el={dataElement}
                        onClick={this.onCreatePathHandle}
                        style={{ cursor: 'pointer' }}
                        cx={top.x || 0} cy={top.y - add || 0} r={r} />
                    <circle data-el={dataElement} onClick={this.onCreatePathHandle}
                        style={{ cursor: 'pointer' }}
                        cx={left.x - add || 0} cy={left.y || 0} r={r} />
                    <circle data-el={dataElement} onClick={this.onCreatePathHandle}
                        style={{ cursor: 'pointer' }}
                        cx={right.x + add || 0} cy={right.y || 0} r={r} />
                    <circle data-el={dataElement} onClick={this.onCreatePathHandle}
                        style={{ cursor: 'pointer' }}
                        cx={bottom.x || 0} cy={bottom.y + add || 0} r={r} />
                </g>

                <React.Fragment>
                    {isPath && pathStart && pathEnd && (
                        <path d={`M ${pathStart.x} ${pathStart.y} 
                        q 0 0 ${pathEnd.x - pathStart.x} ${pathEnd.y - pathStart.y}`}
                            style={{ pointerEvents: 'none' }}
                            stroke="blue" strokeWidth="5" fill="none" />
                    )}
                </React.Fragment>

                <React.Fragment>
                    {renderPath(this.props.paths)}
                </React.Fragment>

                <SubscribeOne to={workspaceContainer} bind={['selected']} >
                    {
                        ws => {
                            if (ws.state.selected) {
                                let elementContainer = ElementContainer.get(ws.state.selected)
                                if (!elementContainer) {
                                    elementContainer = PathContainer.get(ws.state.selected)
                                }
                                return (
                                    <SubscribeOne to={elementContainer} bind={['x', 'y']}>
                                        {element => {
                                            const { x, y, id } = element.state
                                            const box2 = this.convertToBox(refSVG.current.getBoundingClientRect(), element.box)

                                            return (
                                                <React.Fragment>
                                                    <React.Fragment>
                                                        {box2 && !isPath && (
                                                            <g>
                                                                <line x1={box2.left -3} y1={box2.top - 3} x2={box2.right +3} y2={box2.top - 3}
                                                                    style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} />
                                                                <line x1={box2.left -3} y1={box2.bottom +3} x2={box2.right +3} y2={box2.bottom +3}
                                                                    style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} />
                                                                <line x1={box2.left -3 } y1={box2.bottom +3} x2={box2.left -3} y2={box2.top -3}
                                                                    style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} />
                                                                <line x1={box2.right +3} y1={box2.bottom +3} x2={box2.right +3} y2={box2.top -3}
                                                                    style={{ stroke: 'rgb(255,0,0)', strokeWidth: 2 }} />
                                                            </g>
                                                        )}
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        {this.props.children}
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        {this.props.children}
                                                    </React.Fragment>
                                                </React.Fragment>)
                                        }}
                                    </SubscribeOne>
                                )
                            } else {
                                return <React.Fragment>
                                    {this.props.children}
                                </React.Fragment>
                            }
                        }
                    }
                </SubscribeOne>
            </svg>

        )

    }
}

export default PathBox