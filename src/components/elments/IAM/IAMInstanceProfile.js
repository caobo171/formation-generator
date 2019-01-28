import React from 'react'
import { Subscribe } from 'unstated-x'
import { BindingContext } from '../../../containers/ElementContainer'
import enhanceElement from '../../../helpers/enhanceElement'


class IAMInstanceProfile extends React.Component {


    static defaultProps = {
        Name:'',
        Roles: []
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
                                        <label>Roles </label>
                                        <input type="text" className="form-control" placeholder="Enter Role ..."
                                            onChange={(e) => data.setState({ Roles: [e.target.value] })}
                                            value={data.state.Roles[0]}>
                                        </input>
                                    </div>
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
                <text fill="#ffffff" fontSize="15" fontFamily="Verdana" x={this.props.x - 18} y={this.props.y + 6}>IAM</text>
            </React.Fragment>
        )
    }
}

export default enhanceElement(IAMInstanceProfile) 