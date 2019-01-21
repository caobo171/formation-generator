import React from 'react'
import { Subscribe } from 'unstated-x'
import { BindingContext } from '../../../containers/ElementContainer'
import enhanceElement from '../../../helpers/enhanceElement'
import { Maps } from '../../../helpers/mapping'
import uuid from 'uuid'

class EC2Instance extends React.Component {


    static defaultProps = {
        InstanceType: 't2.micro',
        ImageId: Maps.AWSInstanceType2Arch["t2.micro"].Arch,
        Name: '',
        Description: '',
        Tags: []
    }

    static ref = React.createRef()
    static generateInspector = () => {
        return (
            <BindingContext.Consumer>
                {dataContainer => (
                    <Subscribe to={[dataContainer]}>
                        {
                            data => (
                                <div>
                                    <div className="form-group">
                                        <label>Name </label>
                                        <input type="text" className="form-control" placeholder="Enter Name ..."
                                            onChange={(e) => data.setState({ Name: e.target.value })}
                                            value={data.state.Name}>
                                        </input>
                                    </div>
                                    <div className="form-group">
                                        <label >InstanceType</label>
                                        <select className="form-control" value={data.state.InstanceType}
                                            onChange={(e) => data.setState({
                                                InstanceType: e.target.value,
                                                ImageId: Maps.AWSInstanceType2Arch[e.target.value].Arch
                                            })} >
                                            {
                                                Object.keys(Maps.AWSInstanceType2Arch).map(e => (
                                                    <option key={e} value={e}>{e}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>ImageId</label>
                                        <input type="text" className="form-control" readOnly={true} value={data.state.ImageId}>
                                        </input>
                                    </div>
                                    <label>Tags</label>
                                    <React.Fragment>
                                        {
                                            data.state.Tags.map(e => (
                                                <div className="row" key={e.Key} id="form">
                                                    <div className="col col-4">
                                                        <label><strong>{e.Key}</strong></label>
                                                    </div>
                                                    <div className="col col-4">
                                                        <label>{e.Value}</label>
                                                    </div>
                                                </div>
                                            ))

                                        }
                                    </React.Fragment>

                                    <form className="row" ref={EC2Instance.ref}>

                                        <div className="col col-5">
                                            <input type="text" className="form-control" placeholder="Key" />
                                        </div>
                                        <div className="col col-5">
                                            <input type="text" className="form-control" placeholder="Value" />
                                        </div>
                                        <div className="col col-2">
                                            <button className="btn fas fa-plus-circle"
                                                onClick={e => {
                                                    //console.log('check', document.getElementById('form').value)
                                                    const key = EC2Instance.ref.current.elements[0].value
                                                    const value = EC2Instance.ref.current.elements[1].value
                                                    let tags = data.state.Tags
                                                    tags.push({ Key: key, Value: value })
                                                    console.log('checkkkk tags',tags)
                                                    data.setState({ Tags: tags })
                                                    e.preventDefault()
                                                }}
                                                style={{ cursor: 'pointer', float: 'left' }}></button>
                                        </div>

                                    </form>




                                </div>
                            )
                        }
                    </Subscribe>
                )}
            </BindingContext.Consumer>)
    }

    render() {
        return (
            <React.Fragment>
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "rgb(0,255,255)", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "rgb(100,100,50)", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <ellipse cx={this.props.x} cy={this.props.y} rx="20" ry="20" fill="url(#grad1)" />
                <text fill="#ffffff" fontSize="15" fontFamily="Verdana" x={this.props.x - 18} y={this.props.y + 6}>EC2</text>
            </React.Fragment>
        )
    }
}

export default enhanceElement(EC2Instance) 