import React from 'react'
import { Link } from 'react-router-dom'
import workspaceContainer from '../../containers/WorkspaceContainer'

class Dashboard extends React.Component {
  render() {
    return (
      <React.Fragment>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
          <a class="navbar-brand" href="#">VTI Tool</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
        </nav>
      
        <main role="main" class="container  mt-5">
        <br></br>  <br></br>
          <div class="jumbotron">
            <h1>Design </h1>
            <p class="lead">This example is a quick exercise to illustrate how fixed to top navbar works. As you scroll, it will remain fixed to the top of your browser's viewport.</p>
            <Link class="btn btn-lg btn-primary" to='/design' role="button"
            onClick={()=> workspaceContainer.setState({mode:'design'})}
            >Go To Design Page &raquo;</Link>
          </div>

          <br></br>  <br></br>
          <div class="jumbotron">
            <h1>Manage </h1>
            <p class="lead">This example is a quick exercise to illustrate how fixed to top navbar works. As you scroll, it will remain fixed to the top of your browser's viewport.</p>
            <Link class="btn btn-lg btn-success" to='/manage' role="button"
            onClick={()=> workspaceContainer.setState({mode:'manage'})}
            >Go To Manage Page &raquo;</Link>
          </div>
        </main>
      </React.Fragment>
    )
  }
}


export default Dashboard