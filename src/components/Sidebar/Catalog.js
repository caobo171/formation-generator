import React from 'react'
import Elements from '../elments/Elements'


class Catalog extends React.Component {
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
       Object.keys(Elements).forEach(e => {
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
        this.setState({ EC2, IAM })
    }
    render() {
        return (
            <div className="nav-side-menu" style={{ position: 'fixed', zIndex: '200' }}>
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

export default Catalog