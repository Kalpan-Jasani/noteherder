import React, { Component } from 'react';

import './App.css';
import Main from './Main.js';
import SignIn from './SignIn.js';

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      uid: null,
    }
  }

  handleAuth = () =>
  {
    this.setState(
      {
        uid: "kalpan"
      }
    )
  }


  signIn = (provider) =>  
  {
      
  }

  signOut = () =>
  {
    
  }

  render() {
    return (
      <div className="App">
        {
          this.state.uid === null
            ? <SignIn handleAuth={this.handleAuth}/>
            : <Main />
        }
      </div>
    );
  }
}

export default App;
