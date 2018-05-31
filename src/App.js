import React, { Component } from 'react';

import './App.css';
import Main from './Main.js';
import SignIn from './SignIn.js';
import rebaseObj from './baseSetup';
import {auth} from './baseSetup';
import {Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      uid: null,
    }


    //when page reloads, we want to know the state of sign in in firebase. If there was no previous user sign in, the failure  function is called, with a userCredential of null
    auth.onAuthStateChanged(
        (user) =>
        {
          user != null ?
            this.setSignIn(user)
            : this.setSignOut();

        }
      );
  }

  handleAuth = (provider) =>
  {
    auth.signInWithRedirect(provider);
  }


  setSignIn = (user) =>  
  {
    this.setState(
      {
        uid: user.uid
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
      auth.signOut();
  }

  render() {
    return (
      <div className="App">
        {
          <Switch>
              <Route 
                path={"/sign-in"}
                render=
                {
                  () => 
                  this.state.uid ? <Redirect to="/notes" /> : <SignIn handleAuth={this.handleAuth}/>
                }
              />
              <Route
                path={"/notes"}
                render={() => <Main uid={this.state.uid} handleSignOut={this.setSignOut} />}
              />
              <Route render=
              {
                  () =>
                  {
                      console.log(this.state.uid);
                      return(
                        this.state.uid ? <Redirect to="/notes" /> : <Redirect to="/sign-in" />
                      )
                  }
                  
              }
              />
          </Switch>
        }
      </div>
    );
  }
}

export default App;
