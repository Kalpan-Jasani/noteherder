import React, { Component } from 'react';

import './App.css';
import Main from './Main.js';
import SignIn from './SignIn.js';
import rebaseObj from './baseSetup';
import firebase from 'firebase';

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      uid: null,
    }


    //when page reloads, we want to know the state of sign in in firebase. If there was no previous user sign in, the failure  function is called, with a userCredential of null
    firebase.auth().getRedirectResult().then(
      (userCredential) =>
      {
        this.setSignIn(userCredential.user);
      },
      () => 
      {
        this.setSignOut();
      }
    );
  }

  handleAuth = (provider) =>
  {
    firebase.auth().signInWithRedirect(provider);
  }


  setSignIn = (user) =>  
  {
    this.setState(
      {
        uid: user
      }
    );
  }

  setSignOut = () =>
  {
      this.setState(
        {
          uid: null,
        }
      ) 

      //signing out of some account in some popular social app
      firebase.auth().signOut();
  }

  render() {
    return (
      <div className="App">
        {
          this.state.uid === null
            ? <SignIn handleAuth={this.handleAuth}/>
            : <Main handleSignOut={this.setSignOut} />
        }
      </div>
    );
  }
}

export default App;
