import React from 'react'
import { Users } from '../../../fakeData'

export default class UsersBox extends React.Component {

    state = {
        isResetting : false,
        users : []
    }

    componentDidMount(){
        console.log('check didmount')
        this.setState({users:Users})
    }

    onDropHandle = (e)=>{
        const username = e.dataTransfer.getData("username");
        let users = this.state.users
        users.push(username)
        this.setState({users})
        console.log('checkk username',username)

    }
    render() {

        return (
            <table className="table container"
            onDragOverCapture={e => e.preventDefault()}
            onDropCapture={this.onDropHandle}
            >
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Users</th>
                        <th scope="col">Password</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.users.map((e, index) => {
                            return (
                                <tr key={e}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{e}</td>

                                    <td >
                                        {this.state.isResetting === e ? (
                                            <input className="form-control" placeholder="...reset pass"
                                                name="resetPassword" onChange={this.onChangeHandle}
                                            ></input>
                                        ) : ('********')}
                                    </td>
                                    <td>


                                        <i onClick={() => this.onDelete(e)} className="far fa-trash-alt mr-3"></i>
                                        <React.Fragment>
                                            {this.state.isResetting === e ? (
                                                <i className="fas fa-share-square" onClick={this.onResetHandle}></i>
                                            ) : (
                                                    <i onClick={() => this.setState({ isResetting: e })}
                                                        className="fas fa-redo-alt"></i>
                                                )}

                                        </React.Fragment>
                                        <i className="fas fa-download" onClick={() => this.getPemKey(e)}></i>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    <tr><button type="button" className="btn btn-danger btn-sm btn-block" onClick={()=> this.props.close()}>Close</button></tr>
                </tbody>
            </table>
        )
    }
}


