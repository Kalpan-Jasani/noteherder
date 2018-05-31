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

    if(this.checkIsLocalStorageAvailable())
    {
        const localUid = localStorage.getItem("uid");
        if(localUid !== null)
        {
          this.state = {
            uid: localUid,
          };
        }

        else
        {
          this.state = {
            uid: null,
          };
        }
        
    }
    else
    {
      this.state = {
        uid: null,
      };
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

  handleAuth = (provider) =>
  {
       auth.signInWithRedirect(provider)    
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
      );

      //signing out of some account in some popular social app
      auth.signOut();

      if(this.checkIsLocalStorageAvailable())
        localStorage.clear();
      //proceeding to the homepage
      //TODO: check if this results in the apps home page, or the server's homepage
      this.props.history.push("/");
  }

  setState = (state) =>
  {
    if(state.uid && this.checkIsLocalStorageAvailable())
      super.setState(state, () => {localStorage.setItem("uid", state.uid)});
    else
      super.setState(state);
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
                render=
                {() => 
                  {
                    return(
                      this.state.uid ? 
                      <Main uid={this.state.uid} handleSignOut={this.setSignOut} />
                      : <Redirect to="/sign-in" />
                    )
                  }
                }
                  
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

  checkIsLocalStorageAvailable()
    {
        try {
            var storage = window['localStorage'],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }

    }
}

export default App;
