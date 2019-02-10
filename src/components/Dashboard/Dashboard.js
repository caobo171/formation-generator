import React from 'react'
import { Link } from 'react-router-dom'
import workspaceContainer from '../../containers/WorkspaceContainer'
import axios from 'axios'
import { Env } from '../../env'
import { SubscribeOne } from 'unstated-x'

class Dashboard extends React.Component {

  async componentDidMount() {
    const res = await axios.get(`${Env.URL}/listexiststacks`)
    workspaceContainer.setState({ stacks: res.data })
    console.log('check res', res)


  }
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
          <a className="navbar-brand" href="#">VTI Tool</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
        </nav>

        <main role="main" className="container  mt-5">
          <br></br>  <br></br>
          <div className="jumbotron">
            <h1>Design </h1>
            <Link className="btn btn-lg btn-primary" to='/design' role="button"
              onClick={() => workspaceContainer.setState({ mode: 'design' })}
            >Go To Design Page &raquo;</Link>
          </div>

          <br></br>  <br></br>
          <div className="jumbotron">
            <h1>Manage </h1>
            <div className="dropdown">
              <button className="btn btn-lg btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Go To Manage Page &raquo;
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <SubscribeOne to={workspaceContainer} bind={['stacks']}>
                  {
                    ws => {
                      return (
                        <React.Fragment>
                          {
                            ws.state.stacks.map(e => (
                              <Link key={e.StackName} to={`/manage/${e.StackName}`} className="dropdown-item" href="#">{e.StackName}</Link>
                            ))
                          }
                        </React.Fragment>
                      )
                    }
                  }
                </SubscribeOne>

              </div>
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}


export default Dashboard