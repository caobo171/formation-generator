import React from 'react'
import PageEditor from './PageEditor'
import Sidebar from './Sidebar'
import { TemplateContainer } from '../containers/TemplateContainer'
import Inspector from './Inspector'


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

                    <React.Fragment>
                        {
                            this.state.isToggled && (
                                <Sidebar></Sidebar>
                            )
                        }
                    </React.Fragment>

                    <main role="main" className="col-md-8">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group mr-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => { TemplateContainer.exportAndRun() }}
                                    >Export && Run</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                        onClick={() => { TemplateContainer.exportTemplate() }}
                                    >Export</button>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => { this.setState({ isToggled: !this.state.isToggled }) }}>
                                    <span data-feather="calendar"></span>
                                    Catalog
                                </button>
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