import React from 'react'
import  Elements from './elments/Elements'

class Inspector extends React.Component {



    generateInspector = () => {
        return (
            <h1>Inspector</h1>
        )
    }
    render() {

        const Element = Elements['EC2'].generateInspector

        return (
            <React.Fragment>
                <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    Inspector
                    <a className="d-flex align-items-center text-muted" href="#">
                        <span data-feather="plus-circle"></span>
                    </a>
                </h4>
                <ul className="nav flex-column mb-2">
                    {this.generateInspector()}
                </ul>
                <Element></Element>
                
            </React.Fragment>
        )

    }
}

export default Inspector