import React from 'react';
import quill from './quill.svg';
import * as firebaseStuff from './baseSetup'
const SignInBox = ({handleAuth}) => 
{
    const onSignInClick = (provider, ev) =>
    {
        ev.preventDefault();
        handleAuth(provider);
        //TODO: handle authorization
    }
    return(
        <div className="SignIn">
            <header className="Header">
            <img src={quill} alt="" />
            <span className="title">Noteherder</span>
            </header>
            <main>
            <h3>Hey, Nerd! You Like Notes?</h3>
            <p>You never know when you'll need to write crap down. In fact, you should probably be taking notes right now.</p>
            <button 
                className="github"
                onClick={(ev) => 
                {
                    const provider = firebaseStuff.gitHubAuthProvider;
                    onSignInClick(provider, ev);   
                }}
            >
                <i className="fa fa-github"></i>
                Sign in with GitHub
            </button>
            <button 
                className="google"
                onClick={ (ev) =>
                    {
                        const provider = firebaseStuff.googleAuthProvider;
                        onSignInClick(provider, ev);

                    }   
                }
            >
                <img src="media/google.svg" alt="" />
                Sign in with Google
            </button>
            </main>
        </div>
    )
}

export default SignInBox