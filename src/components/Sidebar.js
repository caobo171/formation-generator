import React from 'react'
import Inspector from './Inspector'
import Elements from './elments/Elements'

class Sidebar extends React.Component {

    onDragStartCaptureHandle = (e) => {

        const data = e.target.getAttribute('data-type')
        e.dataTransfer.setData("dataResource", data);
    }

    

    state = {
        EC2: [],
        IAM: []
    }

    componentDidMount() {
   
        let EC2 = []
        let IAM = []
        const array = Object.keys(Elements).forEach(e => {
            console.log('check', e)
            const els = e.split('::');
            if (els[1] === 'EC2') {
                EC2.push({
                    type: e,
                    name: els[2]
                })
            } else if (els[1] === 'IAM') {
                IAM.push({
                    type: e,
                    name: els[2]
                })
            }
        })
        this.setState({ EC2, IAM }, () => console.log('check', this.state))
    }
    render() {

        return (
 
                <div className="nav-side-menu" style={{position:'fixed',zIndex:'200'}}>
                    <div className="brand">Press Curing Control</div>
                    <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                    <div className="menu-list">

                        <ul id="menu-content" className="menu-content collapse out">
                            <li>
                                <a href="#">
                                    <i className="fa fa-dashboard fa-lg"></i> Dashboard
                  </a>
                            </li>

                            <li data-toggle="collapse" data-target="#EC2" className="collapsed active">
                                <a href="#"><i className="fa fa-gift fa-lg"></i> EC2 <span className="arrow"></span></a>
                            </li>
                            <ul className="sub-menu collapse" id="EC2">
                                {this.state.EC2.map(e => (
                                    <li 
                                    key={e.name}
                                    draggable={true} onDragStartCapture={this.onDragStartCaptureHandle}
                                    data-type={e.type}>{e.name}</li>
                                ))}
                            </ul>


                            <li data-toggle="collapse" data-target="#IAM" className="collapsed">
                                <a href="#"><i className="fa fa-globe fa-lg"></i> IAM <span className="arrow"></span></a>
                            </li>
                            <ul className="sub-menu collapse" id="IAM">
                                {this.state.IAM.map(e => (
                                    <li
                                    key={e.name} 
                                    data-type={e.type}
                                    draggable={true} onDragStartCapture={this.onDragStartCaptureHandle}
                                    >{e.name}</li>
                                ))}
                            </ul>
                        </ul>
                    </div>
                </div>

        )
    }
}


export default Sidebar









{/* <nav className="col-md-4 d-none d-md-block bg-light sidebar">
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
  

</div>
</nav> */}