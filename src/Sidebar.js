import React from "react";
import quill from "./quill.svg";
import newIcon from "./new.png";
import newHover from "./new-hover.png";
import { StyleSheet, css } from "aphrodite";

const Sidebar = ({handleSignOut, ...props}) =>
{
    return(
        <nav className={css(styles.Sidebar)}>
            <div className={css(styles.logo)}>
                <img className={css(styles.logoImg)} src={quill} alt="Noteherder" />
            </div>
            <a  
                className={css(styles.newNote)} 
                href="/notes"
                onClick=
                { 
                    (ev) =>
                    {
                        ev.preventDefault();
                        props.onAddCallback();
                    }
                }
            >
                <img 
                    src={newHover} 
                    alt="New note" 
                    className={css(styles.img)}
                />
                <img 
                    className={css(styles.img, styles.imgOutline)} src={newIcon} alt="New note" 
                />
            </a>
            <div className={css(styles.SignOut)} >
                <button
                    className={css(styles.SignOutButton, styles.button)}
                    onClick={handleSignOut}
                >
                    <i 
                        className={`fa fa-sign-out ${css(styles.SignOutFont)}` }
                    >
                    </i>
                </button>
            </div>
        </nav>
    );
}


const styles = StyleSheet.create(
{
    Sidebar : 
    {
        width: '6rem',
        backgroundColor: '#f3f3f3',
        padding: '0.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    logo:
    {
        fontFamily: '"Fauna One"',
        color: '#666',
        fontSize: "3rem",
    },

    logoImg:
    {
        width: '30px',
        paddingLeft: '4px',
    },

    newNote:
    {
        marginTop: '2rem',
        position: 'relative',
        width: '40px',
    },

    button:
    {
        backgroundColor: 'transparent',
        border: '0',
        color: '#008BF8',
        cursor: 'pointer',
    },

    img:
    {
        position: 'absolute',
        left: '0',
        width: '100%',
        transition: 'opacity 0.25s ease-in-out',
    },

    imgOutline:
    {
        ':hover':
        {
            opacity: '0',
        }
        
    },

    SignOut:
    {
        position: 'absolute',
        bottom: '1rem',
    },

    SignOutButton:
    {
        outline: 'none',
    },

    SignOutFont:
    {
        fontSize: '2rem',
    }

}
);
export default Sidebar;