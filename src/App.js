import React, { Component } from 'react';
import './App.css';
import Main from './components/Main'
import { Provider } from 'unstated-x'

class App extends Component {
  render() {
    return (
      <Provider>
        <React.Fragment>
          <Main></Main>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          {/* <Logo className="App-logo"></Logo> */}
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
