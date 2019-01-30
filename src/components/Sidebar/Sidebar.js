import React from 'react'

import Catalog from '../Sidebar/Catalog'
import UserList  from '../Sidebar/UserList'

class Sidebar extends React.Component {

    state={
        type:null
    }

    renderSidebar(){
        switch(this.state.type){
            case 'catalog':
                return(
                    <Catalog></Catalog>
                )
            case 'userlist':
                return(
                     <UserList></UserList>
                )
            default:
                return
        }
    }

    componentDidMount(){
        window.addEventListener(('mousedown'),(e)=>{
            if(e.target && ( e.target.tagName==='svg')){

                this.setState({type:null})
            }
            console.log('check',e.target)
            window.target = e.target
        })
    }
    render() { 

        return (
            <React.Fragment>
                <div class=" sidebar1" style={{
                    width:"2%",
                    background: '#68a0f9',
                }}>
                    <div class="left-navigation mt-4 ml-2">
                        <i onClick= {()=> this.setState({type:'catalog'})} class="fas  fa-2x fa-database"></i>
                    </div>

                    <div class="left-navigation mt-4 ml-1">
                        <i onClick= {()=> this.setState({type:'userlist'})}class="fas  fa-2x fa-users"></i>
                    </div>
                </div>

                <React.Fragment>
                    {this.renderSidebar()}
                </React.Fragment>

                

            </React.Fragment>

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