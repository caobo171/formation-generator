import React from 'react'
import { Users } from '../../../fakeData/fakeData'
import axios from 'axios'
import { Env } from '../../../env'
import workspaceContainer from '../../../containers/WorkspaceContainer'
import ElementContainer from '../../../containers/ElementContainer'
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify'
import { downloadObjectAsJson } from '../../../helpers/utils'


export default class RDSUserBox extends React.Component {

    state = {
        isResetting: false,
        users: [],
        rdsInstance: null,
        loading: true,
        username: '',
        password: '',
        resetPassword: '********',
        status: ''

    }


    getUsers = async () => {
        const res = await axios.post(`${Env.URL}/manageuserrds`, {
            host: this.state.rdsInstance.Endpoint.Address,
            engine: this.state.rdsInstance.Engine
        })

        console.log('check host', this.state.rdsInstance.Endpoint.Address, res)
        if (res.data && !res.data.errorMessage) {
            if(this.state.rdsInstance.Engine === 'postgres' ){
                window.users = res.data
               this.setState({users:res.data.rows.map(e=>e.usename),loading:false})
            }else{
                this.setState({ users: res.data.map(e => e.user), loading: false })
            }
           
        } else {
            this.setState({ users: [], loading: false })
        }

    }

    async componentDidMount() {
        const nameRDS = ElementContainer.get(workspaceContainer.state.selected).data.state.Name
        const res = await axios.post(`${Env.URL}/listdbinstance`,
            {
                DBInstanceIdentifier: nameRDS,
                action: 'list'
                
            })
        console.log('check RDSs', res)
        this.setState({ rdsInstance: JSON.parse(res.data).DBInstances[0] }, async () => {
            await this.getUsers()
        })
        window.res = res


    }

    onDropHandle = async (e) => {
        const username = e.dataTransfer.getData("username");
        this.setState({ username }, () => console.log('check username', username))

    }




    onAddUser = async (username) => {
        this.setState({ loading: true })
        const res = await axios.post(`${Env.URL}/manageuserrds `, {
            username: this.state.username,
            host: this.state.rdsInstance.Endpoint.Address,
            password: this.state.password,
            engine: this.state.rdsInstance.Engine

        })
        if(this.state.rdsInstance.Engine === 'postgres' ){
            this.setState({users:res.data.rows.map(e=>e.usename),loading:false})
         }else{
             this.setState({ users: res.data.map(e => e.user), loading: false })
         }
        console.log('checkkkkk vaof on add user')


    }

    onDeleteUser = async (username) => {
        console.log('check delete', username)
        this.setState({ loading: true })
        const res = await axios.post(`${Env.URL}/manageuserrds `, {
            username,
            host: this.state.rdsInstance.Endpoint.Address,
            engine: this.state.rdsInstance.Engine
        })

        window.delete1 = res
        console.log('check res',res,username, this.state.rdsInstance.Endpoint.Address , this.state.rdsInstance.Engine)

        if(this.state.rdsInstance.Engine === 'postgres' ){
            this.setState({users:res.data.rows.map(e=>e.usename),loading:false})
         }else{
             this.setState({ users: res.data.map(e => e.user), loading: false })
         }

        console.log('checkkkkk vaof on add user')



    }

    onResetHandle = async (e) => {
        this.setState({ loading: true })
        const res = await axios.post(`${Env.URL}/manageuserrds `, {
            username: this.state.isResetting,
            password: this.state.resetPassword,
            host: this.state.rdsInstance.Endpoint.Address,
            resetPassword: true,
            engine: this.state.rdsInstance.Engine
        })
        this.setState({ loading: false, isResetting: false })

    }

    onChangeHandle = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    sendAction = async (action) => {
        this.setState({loading:true})
        const nameRDS = ElementContainer.get(workspaceContainer.state.selected).data.state.Name
        const res = await axios.post(`${Env.URL}/listdbinstance`,
            {
                DBInstanceIdentifier: nameRDS,
                action
            })

        console.log('check ',res,nameRDS,action)
        this.setState({ rdsInstance: JSON.parse(res.data).DBInstance ,loading:false })
    }

    renderActionButtons = (type) => {
        switch (type) {
            case 'available': {
                return (
                    <button type="button"
                        className="btn btn-warning btn-sm btn-block" onClick={()=>this.sendAction('stop')}>Stop</button>

                )
            }
            case 'stopped': {
                return (
                    <button type="button"
                        className="btn btn-success btn-sm btn-block" onClick={()=>this.sendAction('start')}>Start</button>
                )
            }
        }
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
                        this.state.loading ? <ClipLoader></ClipLoader>
                            : (
                                this.state.users.map((e, index) => {
                                    return (
                                        <tr key={e}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{e}</td>

                                            <td >
                                                {this.state.isResetting === e ? (
                                                    <input className="form-control" placeholder="...reset pass"
                                                        value={this.state.resetPassword}
                                                        name="resetPassword" onChange={this.onChangeHandle}
                                                    ></input>
                                                ) : ('********')}
                                            </td>
                                            <td>
                                                <i onClick={() => this.onDeleteUser(e)} className="far fa-trash-alt mr-3"></i>
                                                <React.Fragment>
                                                    {this.state.isResetting === e ? (
                                                        <i className="fas fa-share-square" onClick={this.onResetHandle}></i>
                                                    ) : (
                                                            <i onClick={() => this.setState({ isResetting: e })}
                                                                className="fas fa-redo-alt"></i>
                                                        )}
                                                </React.Fragment>
                                            </td>
                                        </tr>
                                    )
                                }))
                    }
                    {
                        this.state.username && (
                            <tr>
                                <th scope="row"><button
                                    onClick={this.onAddUser}
                                    className="btn btn-success">Add User</button></th>
                                <td><input className="form-control" placeholder="...username"
                                    name="username" readOnly value={this.state.username}
                                ></input></td>
                                <td><input className="form-control" placeholder="...password"
                                    name="password" onChange={this.onChangeHandle} value={this.state.password}
                                ></input></td>
                            </tr>
                        )
                    }

                    <tr>
                        <th>

                            {this.state.rdsInstance ? this.state.rdsInstance.DBInstanceStatus : 'loading...'}
                        </th>
                        <td>
                            {this.state.rdsInstance ? (
                                 this.renderActionButtons(this.state.rdsInstance.DBInstanceStatus) 
                            ) : ('')}

                        </td>
                        <td>
                            <button type="button" className="btn btn-danger btn-sm btn-block" onClick={() => this.props.close()}>Close</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}


