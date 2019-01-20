import React from 'react'
import {Subscribe} from 'unstated-x'
import {BindingContext} from '../../containers/ElementContainer'
import enhanceElement from '../../helpers/enhanceElement'

class EC2 extends React.Component {


    static defaultProps = {
        instanceType: 't2.micro'
    }
    static generateInspector = () => {
        return (
            <BindingContext.Consumer>
                {dataContainer=>(
                    <Subscribe to={[dataContainer]}>
                    {
                        data => (
                            <form>
                            <div className="form-group">
                              <label>Email address</label>
                              <input type="email" value={data.state.instanceType}
                               onChange = {(e)=> data.setState({instanceType:e.target.value})}
                              className="form-control" placeholder="Enter email"/>
                            </div>
                          </form>  
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
                            <stop offset="0%" style={{stopColor:"rgb(255,255,0)",stopOpacity:"1"}} />
                            <stop offset="100%" style={{stopColor:"rgb(255,0,0)",stopOpacity:1}} />
                        </linearGradient>
                    </defs>
                    <ellipse cx={this.props.x} cy={this.props.y} rx="60" ry="30" fill="url(#grad1)" />
                    <text fill="#ffffff" fontSize="30" fontFamily="Verdana" x={this.props.x-30} y={this.props.y+12}>EC2</text>
            </React.Fragment>
        )
    }
}

export default enhanceElement(EC2) 