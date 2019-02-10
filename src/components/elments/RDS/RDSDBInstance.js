import React from 'react'
import { Subscribe } from 'unstated-x'
import { BindingContext } from '../../../containers/ElementContainer'
import enhanceElement from '../../../helpers/enhanceElement'
import { Maps } from '../../../helpers/mapping'

class RDSDBInstance extends React.Component {


    static defaultProps = {
        Engine: "MySQL",
        EngineVersion: "5.6.13",
        Name: '',
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
                                        <label>DBName </label>
                                        <input type="text" className="form-control" placeholder="Enter Name ..."
                                            onChange={(e) => data.setState({ Name: e.target.value })}
                                            value={data.state.Name}>
                                        </input>
                                    </div>

                                    <div className="form-group">
                                        <label>Engine</label>
                                        <input type="text" className="form-control" readOnly={true}
                                            value={data.state.Engine}>
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

                                    <form className="row" ref={RDSDBInstance.ref}>

                                        <div className="col col-5">
                                            <input type="text" className="form-control" placeholder="Key" />
                                        </div>
                                        <div className="col col-5">
                                            <input type="text" className="form-control" placeholder="Value" />
                                        </div>
                                        <div className="col col-2">
                                            <button className="btn fas fa-plus-circle fa-x2"
                                                onClick={e => {
                                                    //console.log('check', document.getElementById('form').value)
                                                    const key = RDSDBInstance.ref.current.elements[0].value
                                                    const value = RDSDBInstance.ref.current.elements[1].value
                                                    let tags = data.state.Tags
                                                    tags.push({ Key: key, Value: value })
                                                    console.log('checkkkk tags', tags)
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
                        <stop offset="0%" style={{ stopColor: "rgb(0,0,0)", stopOpacity: "1" }} />
                        <stop offset="100%" style={{ stopColor: "rgb(255,0,0)", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
                <ellipse cx={this.props.x} cy={this.props.y} rx="20" ry="20" fill="url(#grad1)" />
                <text fill="#ffffff" fontSize="12" fontFamily="Verdana" x={this.props.x - 18} y={this.props.y + 6}>MySQL</text>
            </React.Fragment>
        )
    }
}

export default enhanceElement(RDSDBInstance) 