import React from 'react'

class EC2 extends React.Component {


    static defaultProps = {
        instanceType:'t2.micro'
    }
    static generateInspector = () => {
        return (
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span data-feather="file-text"></span>
                    Current month
            </a>
            </li>

        )
    }

    render() {
        return (
            <h1>Nothing</h1>
        )
    }
}

export default EC2