import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import Dashboard from './components/Dashboard/Dashboard'
import { Provider } from 'unstated-x'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <Provider>
          <React.Fragment>
            {/* <Main></Main> */}
            <Route path="/" exact component={Dashboard}></Route>
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
            {/* <Logo className="App-logo"></Logo> */}
            <Route path="/design" exact component={Main}></Route>
            <Route path="/manage/:stackname" exact component= {Main}></Route>
          </React.Fragment>
          <ToastContainer />
        </Provider>
      </Router>

    );
  }
}

export default App;
