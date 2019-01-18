import React from 'react';
import ElementContainer from '../containers/ElementContainer'

class Logo extends React.Component {


    state = {
        resources: []
    }
    onDragOverCaptureHandle = (e) => {
        e.preventDefault()
    }

    onDropHandle = (e) => {

        const type = e.dataTransfer.getData("dataResource");
        console.log('check', e.clientX - e.target.getBoundingClientRect().left, e.clientY - e.target.getBoundingClientRect().top)

        const data = ElementContainer.addElement(type)
        let resources = this.state.resources
        resources.push({
            text: type,
            id: data.id,
            x: e.clientX - e.target.getBoundingClientRect().left,
            y: e.clientY - e.target.getBoundingClientRect().top,
        })
        console.log('check', data)
        this.setState({ resources })
        e.preventDefault()
    }
    generateImages = () => {
        return (
            <React.Fragment>
                {this.state.resources.map((e, index) => (
                    <React.Fragment key={index}>
                        <g data-element={e.id}>
                            <defs>
                                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" style={{ stopColor: 'rgb(255,255,0)', stopOpacity: '1' }} />
                                    <stop offset="100%" style={{ stopColor: 'rgb(255,0,0)', stopOpacity: '1' }} />
                                </linearGradient>
                            </defs>
                            <ellipse cx={e.x} cy={e.y} rx="55" ry="40" fill="url(#grad1)" />
                            <text fill="#ffffff" fontSize="30" fontFamily="Verdana" x={e.x - 25} y={e.y + 12}>{e.text}</text>
                        </g>

                    </React.Fragment>

                ))}
            </React.Fragment>
        )
    }
    render() {
        return (
            <React.Fragment>
                <svg xmlns="http://www.w3.org/2000/svg" style={{
                    outline: '#4CAF50 solid 10px'
                }} version="1.1" id="v-2"
                    onDragOverCapture={this.onDragOverCaptureHandle}
                    onDropCapture={this.onDropHandle}
                    width={this.props.width} height={this.props.height} preserveAspectRatio="xMidYMid meet">
                    {this.generateImages()}
                </svg>
            </React.Fragment>
        )
    }
}

export default Logo

