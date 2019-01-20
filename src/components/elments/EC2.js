import React from 'react'
import { Subscribe } from 'unstated-x'
import { BindingContext } from '../../containers/ElementContainer'
import enhanceElement from '../../helpers/enhanceElement'
import {Maps} from '../../helpers/mapping'

class EC2 extends React.Component {


    static defaultProps = {
        InstanceType: 't2.micro',
        ImageId: 'daylaimageid'
    }

    static generateInspector = () => {
        return (
            <BindingContext.Consumer>
                {dataContainer => (
                    <Subscribe to={[dataContainer]}>
                        {
                            data => (
                                <form>
                                    <div class="form-group">
                                        <label >InstanceType</label>
                                        <select class="form-control" value={data.state.InstanceType}
                                        onChange={(e)=> data.setState({InstanceType: e.target.value})} >
                                            {
                                                Object.keys(Maps.AWSInstanceType2Arch).map(e=>(
                                                    <option key={e} value={e}>{e}</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label>imageId</label>
                                        <select class="form-control" value={data.state.ImageId}
                                        onChange={(e)=> data.setState({ImageId: e.target.value})} >
                                            {
                                                Array.from(Maps.AWSInstanceType2Arch[data.state.InstanceType].Arch).map(e=>(
                                                    <option key={e} value={e}>{e}</option>
                                                ))
                                            }
                                        </select>
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
                        <stop offset="0%" style={{ stopColor: "rgb(255,255,0)", stopOpacity: "1" }} />
                        <stop offset="100%" style={{ stopColor: "rgb(255,0,0)", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <ellipse cx={this.props.x} cy={this.props.y} rx="60" ry="30" fill="url(#grad1)" />
                <text fill="#ffffff" fontSize="30" fontFamily="Verdana" x={this.props.x - 30} y={this.props.y + 12}>EC2</text>
            </React.Fragment>
        )
    }
}

export default enhanceElement(EC2) 