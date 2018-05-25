import React from 'react';
import quill from './quill.svg';

const SignInBox = ({handleAuth}) => 
{
    const onSignInClick = (ev) =>
    {
        ev.preventDefault();
        handleAuth();
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
                onClick={onSignInClick}
            >
                <i className="fa fa-github"></i>
                Sign in with GitHub
            </button>
            <button 
                className="google"
                onClick={onSignInClick}
            >
                <img src="media/google.svg" alt="" />
                Sign in with Google
            </button>
            </main>
        </div>
    )
}

export default SignInBox