import React from 'react'
import { Subscribe } from 'unstated-x'
import { BindingContext } from '../../../containers/ElementContainer'
import enhanceElement from '../../../helpers/enhanceElement'
import { Maps } from '../../../helpers/mapping'

class RDSSecurityGroup extends React.Component {


    static defaultProps = {
        InstanceType: 't2.micro',
        ImageId: Maps.AWSInstanceType2Arch["t2.micro"].Arch,
        Name: '',
        Description: '',
        SecurityGroupIngress: []
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
                                        <label>GroupDescription </label>
                                        <input type="text" className="form-control" placeholder="Enter Description ..."
                                            onChange={(e) => data.setState({ GroupDescription: e.target.value })}
                                            value={data.state.GroupDescription}>
                                        </input>
                                    </div>

                                    <label>SecurityGroupIngress</label>
                                    <React.Fragment>
                                        {data.state.SecurityGroupIngress.map((e, index) => (
                                            <div className="row" key={index} id="form">
                                                <div className="col col-3">
                                                    <label>{e.CIDRIP}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </React.Fragment>

                                    <form className="form-group" ref={RDSSecurityGroup.ref}>
                                        <input type="text" className="form-control" name="CIDRIP" placeholder="CIDRIP" defaultValue="0.0.0.0/0" />

                                        <button className="btn fas fa-plus-circle"
                                            onClick={e => {
                                                //console.log('check', document.getElementById('form').value)
                                                const elements = RDSSecurityGroup.ref.current.elements
                                                let securityGroupIngress = data.state.SecurityGroupIngress
                                                let object = {}
                                                for (let i = 0; i < elements.length - 1; i++) {
                                                    object[elements[i].name] = elements[i].value
                                                }
                                                securityGroupIngress.push(object)
                                                data.setState({ SecurityGroupIngress: securityGroupIngress })
                                                e.preventDefault()
                                            }}
                                            style={{ cursor: 'pointer', float: 'left' }}></button>


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
                        <stop offset="0%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: "1" }} />
                        <stop offset="100%" style={{ stopColor: "rgb(255,0,0)", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <ellipse cx={this.props.x} cy={this.props.y} rx="35" ry="25" fill="url(#grad1)" />
                <text fill="#ffffff" fontSize="10" fontFamily="Verdana" x={this.props.x - 38} y={this.props.y}>RDSSGroup</text>
            </React.Fragment>
        )
    }
}

export default enhanceElement(RDSSecurityGroup) 