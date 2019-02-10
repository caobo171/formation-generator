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
            window.target = e.target
        })
    }
    render() { 

        return (
            <React.Fragment>
                <div className=" sidebar1" style={{
                    width:"2%",
                    background: '#68a0f9',
                }}>
                    <div className="left-navigation mt-4 ml-2">
                        <i onClick= {()=> this.setState({type:'catalog'})} className="fas  fa-2x fa-database"></i>
                    </div>

                    <div className="left-navigation mt-4 ml-1">
                        <i onClick= {()=> this.setState({type:'userlist'})}className="fas  fa-2x fa-users"></i>
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








