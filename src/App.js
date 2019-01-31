import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import { Provider } from 'unstated-x'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <React.Fragment>
          <Main></Main>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <Logo className="App-logo"></Logo> */}
        </React.Fragment>
        <ToastContainer />
      </Provider>
    );
  }
}

export default App;
