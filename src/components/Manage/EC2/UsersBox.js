import React from 'react'
// import {Users} from '../../../fakeData/fakeData'
import axios from 'axios'
import { Env } from '../../../env'
import workspaceContainer from '../../../containers/WorkspaceContainer'
import ElementContainer from '../../../containers/ElementContainer'
import ClipLoader from 'react-spinners/ClipLoader';
import { toast } from 'react-toastify'
import { downloadObjectAsJson } from '../../../helpers/utils'


export default class UsersBox extends React.Component {

    state = {
        isResetting: false,
        users: [],
        ec2Instance: null,
        loading: true
    }


    getUsers = async () => {
        const res = await axios.post(`${Env.URL}/manageuserec2`, {
            host: this.state.ec2Instance.Host
        })
        //console.log('host',hos)
        let array = res.data.split('\n')
        console.log('check array', array, this.state.ec2Instance.Host)
        array.pop()
        array.splice(0, array.indexOf('ec2-user') + 2)
        this.setState({ users: array, loading: false })
    }

    async componentDidMount() {

        const nameEC2 = ElementContainer.get(workspaceContainer.state.selected).data.state.Name
        console.log('check ', ElementContainer.get(workspaceContainer.state.selected), nameEC2)
        const res = await axios.post(`${Env.URL1}/manageec2instance`, { nameEC2 })
        console.log('check ', res)
        this.setState({ ec2Instance: res.data[0][0] }, async () => {
            await this.getUsers()
        })


    }

    onDropHandle = async (e) => {
        const username = e.dataTransfer.getData("username");
        this.setState({ loading: true })
        await this.onAddUserWithKeyHandle(username)
    }


    onAddUserWithKeyHandle = async (username) => {
        const res = await axios.post(`${Env.URL}/manageuserec2 `, {
            username: username,
            host: this.state.ec2Instance.Host,
            isPemKey: true
        })
        //const exstring = '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAsP4WYSGhQ3bWiqXr8fV8s0h1LKKl1XiYeelOl8pZH8lLfKsq\n+TCvmWmEv+miKCRsmMNhRiPbwoSXlyfLRFy0NPpk4Imsy9b6es21DYmHXcMPJlB0\nWkL6Lp7NbVawTUKtA1H/DkV3Hn7tTpGz7AEQ3gZGbfloQqHti9pl+8wpiejLTcut\nqwe/SWGWX9c9QMcGRZRmRXb2EhVM2zop0xHFFOqyEzUdLOcJr43UlsKZXmTb20h0\nDL79U0+lkVb64bTKJcZhkUvRoFM71Kz2Bvxix5QflDh8LPNY7nNyG2e7M08B1ef3\nnjFogIPON7OQjpfl0xX6TJjJI20QdAfYXotb3QIDAQABAoIBADg0B1FCx53Pv+L5\nO0pzROz9hk/tOjHmgKy93HoxBEomtrTY+eV1g11493GltBuBLYb5DAuk2WUUi7qx\nJUgJFCR6msv+jAOSuamDZwnscTLh/Q6Sn9AF0sI5JUyiKYvvL1eNkyup/WCOt7aq\nZ/L6h6upXHYRq/z0xKUTbi0eMNacsRcPC73wFtqO19R1BdtW56Xq84T4IKbKHgEX\n46C6byRejl/hNjsqQiXP8OxmerBzmYgTgvIe8pYZho8x58gQOfW0MhRVaGIhZchL\nykNEMEEhD6KV7i9V8iUAHQRIJZ/kNJTYQoVFWZtfrRlyWi1nLNehQrd/1o56SgUu\n66dMQjUCgYEA6o5EqKNZ+Clwb/KGaJLQvq5bBMG1A/gw1NcdDgb6twIBwKtTGJOi\nFgdxZhuHj2fig1RICToC7otzYI44jK6+A2HReV6PxapLGLX0fbWkjsjTaKZ7SdwO\nitllbKqG6iRoXtqrTJ0x5nRXmG3/Fu8CnyEFIbMtVZv8blXcV4MCDvcCgYEAwSyQ\nP3xFg/oYT/O+s3yJ7lK8brCyu9qbDtBQkWBt5yfDn9TNfGU0ZyCGurhNEkRfQ1Yd\nvjeqylxlWIzGloXTHXDDB0O0Rp5pwq62E6HAGU7z4MtAekZQKfK7NZ6saius7QvV\nTxU5Csp7GqZlH/A81wP3QV8XzXJlAKWLk99c8ssCgYBb31nZTBKDd4fI8Y/gChGl\nfpm8JTuH0IEf/RouUmGFqU2ScAjeSYVlZ4jtW78fVquMkUieBJD9arXIjixsPk3C\n+V+ZUIaz/93mUe7wBmPsYZEdHoiQB5fSnxBxHeI2eAhBjxklqzTOdaeR1xPhocC/\nH6no50vMioq3lP33cSMvRQKBgQCspnWuKBXBZS+BleplZPOqS8waalb0yuc3EDxS\nEotnxAR1v66AdbumSE3iaIKJxw4Vksw2jG5bOsVhpUCAm88aSwQkZACl9UO1Oo2F\nclXMyOHzkfVo05smQsnLnKugoLSHkMHvUpqO6HWqVfmf2AmoauT8Sk9t0cYwE8Vy\nPnpGjQKBgBFrb1TAMzgNYQfy4qJ8+Zd6UVQIBd67K03iBwGYIYWm5zbdUpi091tQ\n2ADJx401m0C67A0PB/qGLXodAk0eaQUR70I4rKnOtDxOhl0QgXmC2cpKq0/5pIiE\nEy61xoD8+i/oNJ4md5NFzb+rhasuswqjj7ZVzN0X0jqD3G0isJSe\n-----END RSA PRIVATE KEY-----\n'
        const template = await `${res.data}`
        await this.getUsers()
        window.template = template
        await downloadObjectAsJson('caobo171', template)
    }

    onDeleteUser = async (username) => {
        console.log('check delete', username)
        this.setState({ loading: true })
        const res = await axios.post(`${Env.URL}/manageuserec2 `, {
            username,
            host: this.state.ec2Instance.Host
        })

        let array = res.data.split('\n')
        array.pop()
        array.splice(0, array.indexOf('ec2-user') + 2)
        this.setState({ users: array }, () => {
            this.setState({ loading: false })
        })
    }

    getPemKey = async (username) => {

        const res = await axios.post(`${Env.URL}/manageuserec2 `, {
            username,
            host: this.state.ec2Instance.Host,
            isGetPemKey: true
        })
        console.log('check res', res.data, username, this.state.ec2Instance.Host)
        if (res.data !== "" && res.data !== null) {

            const template = await `${res.data}`
            console.log('check ', res.data)
            window.template = template
            await downloadObjectAsJson('caobo171')
        } else {
            toast.error('account is not using .pem files')
        }
    }


    sendAction = async (action) => {
        const nameEC2 = ElementContainer.get(workspaceContainer.state.selected).data.state.Name
        this.setState({loading:true})
        const res1 = await axios.post(`${Env.URL1}/manageec2instance`,
            {
                nameEC2,
                action
            })
        if(res1.data){
            const res = await axios.post(`${Env.URL1}/manageec2instance`, { nameEC2 })
            this.setState({ ec2Instance: res.data[0][0],loading:false })
        }
    }

    renderActionButtons = (type) => {
        switch (type) {
            case 'running': {
                return (
                    <button type="button"
                        className="btn btn-warning btn-sm btn-block" onClick={() => this.sendAction('STOP')}>Stop</button>

                )
            }
            case 'stopped': {
                return (
                    <button type="button"
                        className="btn btn-success btn-sm btn-block" onClick={() => this.sendAction('START')}>Start</button>
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

                                            <td>******</td>
                                            <td>
                                                <i onClick={() => this.onDeleteUser(e)} className="far fa-trash-alt mr-3"></i>
                                                <i className="fas fa-download" onClick={() => this.getPemKey(e)}></i>
                                            </td>
                                        </tr>
                                    )
                                }))
                    }
                    <tr>
                        <th>

                            {this.state.ec2Instance ? this.state.ec2Instance.State : 'loading...'}
                        </th>
                        <td>
                            {this.state.ec2Instance ? (
                                this.renderActionButtons(this.state.ec2Instance.State)
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


