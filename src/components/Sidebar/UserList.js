import React from 'react'
import {Users} from '../../fakeData/fakeData'


class UserList extends React.Component {

    onDragStartCaptureHandle = (username ,event)=>{
        console.log('check eee' , username)
        event.dataTransfer.setData("username", username);
    }
    render() {
        return (
            <div className="nav-side-menu" style={{ position: 'fixed', zIndex: '200' }}>
                <div className="brand">Press Curing Control</div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">

                    <ul id="menu-content" className="menu-content collapse out">
                        {
                            Users.map(e => (
                                <li
                                key={e}
                                data-type={e.type}
                                draggable={true} onDragStartCapture={(event) => this.onDragStartCaptureHandle(e , event)}
                            >{e}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserList