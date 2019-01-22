import React from 'react'
import Inspector from './Inspector'
import Elements from './elments/Elements'

class Sidebar extends React.Component {

    onDragStartCaptureHandle = (e)=>{
     
        const data= e.target.childNodes[0].innerText
        e.dataTransfer.setData("dataResource", data);
    }
    render() {
    
        return (
            <nav className="col-md-4 d-none d-md-block bg-light sidebar">
                <div className="sidebar-sticky">
                    <ul className="nav flex-column">
                        <li className="nav-item" >
                            <a className="nav-link active" href="#">
                                <h3>Catalogs</h3>
                            </a>
                        </li>
                        <React.Fragment>
                            {
                                Object.keys(Elements).map(e => (
                                    <li className="nav-item" key={e} >
                                        <a className="nav-link active" 
                                        draggable={true} onDragStartCapture={this.onDragStartCaptureHandle} href="#">
                                            <span>{e}</span>
                                        </a>
                                    </li>

                                ))
                            }
                        </React.Fragment>
                    </ul>
                    <Inspector/>

                </div>
            </nav>
        )
    }
}


export default Sidebar