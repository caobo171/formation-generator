import React from 'react'
import Elements from './elments/Elements'
import ElementContainer, { BindingContext } from '../containers/ElementContainer'
import workspaceContainer from '../containers/WorkspaceContainer'
import { SubscribeOne } from 'unstated-x'
import CustomField from '../UIElements/CustomField'

class Inspector extends React.Component {



    generateInspector = (selected) => {
        if (selected) {
            const element = ElementContainer.get(selected)
            window.selected = element

            if (element) {
                const Content = Elements[element.state.type].generateInspector
                return (
                    <BindingContext.Provider value={element.state.data}>
                       
                        <Content></Content>
                   
                    </BindingContext.Provider>

                )
            } else {
                return null
            }

        }
    }
    render() {

        return (
            <div className="col-md-3">
                <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    Inspector
                    <a className="d-flex align-items-center text-muted" href="#">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h4>
                <SubscribeOne to={workspaceContainer} bind={['selected']}>
                    {ws => (
                        <ul className="nav flex-column mb-2">
                            {this.generateInspector(ws.state.selected)}
                        </ul>
                    )}
                </SubscribeOne>
                <CustomField></CustomField>
                
            </div>
        )

    }
}

export default Inspector