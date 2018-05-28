import React, { Component } from 'react';

import './App.css';
import Main from './Main.js';
import SignIn from './SignIn.js';
import './baseSetup';
import firebase from 'firebase'

//TODO: check what this line is implementing
require('./baseSetup');

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      uid: null,
    }
  }

  handleAuth = (provider) =>
  {
    //TODO: change to redirect later on
    firebase.auth().signInWithPopup(provider).then((result) => this.setSignIn(result.user), (result) => this.setSignOut());
  }


  setSignIn = (result) =>  
  {
    this.setState(
      {
        uid: result.user
      }
    );
  }

  setSignOut = () =>
  {
      console.log("flag2");
      this.setState(
        {
          uid: null,
        }
      ) 
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
