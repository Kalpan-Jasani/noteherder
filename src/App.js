import React, { Component } from 'react';

import './App.css';
import Main from './Main.js';
import SignIn from './SignIn.js';
import {auth} from './baseSetup';
import {Switch, Route, Redirect} from 'react-router-dom';

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      uid: null,
    }


    //to handle changes of sign in state
    auth.onAuthStateChanged(
        (user) =>
        {
          user != null ?
            this.setSignIn(user)
            : this.setSignOut();

        }
      );
  }

  componentDidMount = () =>
  {
    this.setState(
      {
      uid: localStorage.getItem("uid"),
      }
    )
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

      //proceeding to the homepage
      //TODO: check if this results in the apps home page, or the server's homepage
      this.props.history.push("/");
  }

  setState = (state) =>
  {
    super.setState(state, localStorage.setItem("uid", this.state.uid || null));
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
