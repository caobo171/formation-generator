import React from 'react'
import PageEditor from './PageEditor/PageEditor'
import Sidebar from './Sidebar/Sidebar'
import templateContainer, { TemplateContainer } from '../containers/TemplateContainer'
import Inspector from './Inspector'
import workspaceContainer , {REGIONS} from '../containers/WorkspaceContainer'


class Main extends React.Component {

    state = {
        isToggled: false
    }


    render() {
        return (
            <div className="container-fluid" onMouseDown={(e)=>{
                window.e=e
                if(e.target.tagName==='svg' ||e.target.parentElement.parentElement.tagName==='svg'){

                    this.setState({isToggled:false})
                }
            }}>
                <div className="row">
                    
                    <Sidebar></Sidebar>
                    <main role="main" className="col-md-8">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Manage Resources</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                              
                                <div className="btn-group mr-2">
                                    <select onChange={(e)=> workspaceContainer.setState({region:e.target.value})}
                                     value = {workspaceContainer.state.region}>
                                        {
                                            REGIONS.map(e=>(
                                                <option key={e} value={e}>{e}</option>

                                            ))
                                        }
                                    </select>
                                    <input type="text" className="mr-4" placeholder=". . . Stack Name"
                                    value = { templateContainer.state.stackName }
                                 onChange = {(e)=>{
                                     templateContainer.setState({stackName:e.target.value})
                                 }}></input>
                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => { TemplateContainer.exportAndRun() }}
                                    >Export && Run</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => { TemplateContainer.exportTemplate() }}
                                    >Export</button>
                                </div>
                            </div>
                        </div>

                        <PageEditor className="my-4 w-100" id="myChart" width="100%" height="500"></PageEditor>
                      

                    </main>
                    <Inspector/>
                </div>
            </div>

        )
    }
}

export default Main;