import React from 'react'
import workspaceContainer from '../../containers/WorkspaceContainer'
import { SubscribeOne } from 'unstated-x'
//import Users from '../Manage/EC2/Users'
import ElementContainer, { PathContainer } from '../../containers/ElementContainer'
import templateContainer from '../../containers/TemplateContainer'
import UserBox from '../Manage/EC2/UsersBox'
import RDSUserBox from '../Manage/RDS/RDSUserBox'



class ToolBox extends React.Component {


    state = {
        onManageResource: false
    }
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

    renderManageBox = (type) => {
        switch (type) {
            case 'AWS::EC2::Instance':
                return (
                    <UserBox close={() => this.setState({ onManageResource: false })}></UserBox>
                )
            case 'AWS::RDS::DBInstance':
                return (
                    <RDSUserBox close={() => this.setState({onManageResource:false})}></RDSUserBox>
                )
            default:
                return
        }
    }

    render() {
        return (
            <SubscribeOne to={workspaceContainer} bind={['selected']} >
                {ws => {
                    if (ws.state.selected) {
                        let element = ElementContainer.get(ws.state.selected)
                        if (!element) {
                            element = PathContainer.get(ws.state.selected)
                        }
                        const { top, left } = element.box


                        return (
                            <React.Fragment>
                                {
                                    this.state.onManageResource ? (
                                        <React.Fragment>
                                            <div style={{ top: `${top - 20}px`, left: `${left}px` ,width:'450px', position: 'fixed',zIndex:"200" }}>
                                                <dialog open  >
                                                    {this.renderManageBox(element.state.type)}
                                                </dialog>
                                            </div>

                                        </React.Fragment>

                                    ) : (
                                            <div style={{ top: `${top - 20}px`, left: `${left - 20}px`, position: 'fixed' }}>
                                                <button onClick={this.onDeleteHandle}><i className="far fa-trash-alt"></i></button>
                                                <button onClick={() => this.setState({ onManageResource: true })}><i className="fas fa-user"></i></button>
                                            </div>
                                        )
                                }
                            </React.Fragment>
                        )
                    } else {
                        return
                    }

                }}
            </SubscribeOne>
        )

    }
}

export default ToolBox