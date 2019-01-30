import React from 'react'


class UserList extends React.Component {
    render() {
        return (
            <div className="nav-side-menu" style={{ position: 'fixed', zIndex: '200' }}>
                <div className="brand">Press Curing Control</div>
                <i className="fa fa-bars fa-2x toggle-btn" data-toggle="collapse" data-target="#menu-content"></i>

                <div className="menu-list">

                    <ul id="menu-content" className="menu-content collapse out">
                        <li>

                        </li>

                        <li data-toggle="collapse" data-target="#EC2" className="collapsed active">
                            <a href="#"><i className="fa fa-gift fa-lg"></i> EC2 <span className="arrow"></span></a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default UserList