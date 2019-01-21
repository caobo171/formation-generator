import React from 'react'
import PageEditor from './PageEditor'
import Sidebar from './Sidebar'
import TemplateContainer from '../containers/TemplateContainer'


class Main extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar></Sidebar>

                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 className="h2">Dashboard</h1>
                            <div className="btn-toolbar mb-2 mb-md-0">
                                <div className="btn-group mr-2">
                                    <button type="button" className="btn btn-sm btn-outline-secondary">Share</button>
                                    <button type="button" className="btn btn-sm btn-outline-secondary"
                                    onClick={()=>{TemplateContainer.exportTemplate()}}
                                    >Export</button>
                                </div>
                                <button type="button" className="btn btn-sm btn-outline-secondary dropdown-toggle">
                                    <span data-feather="calendar"></span>
                                    This week
                           </button>
                            </div>
                        </div>

                        <PageEditor className="my-4 w-100" id="myChart" width="900" height="380"></PageEditor>


                    </main>
                </div>
            </div>

        )
    }
}

export default Main;