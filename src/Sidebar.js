import React from 'react';
import quill from './quill.svg';
import newIcon from './new.png';
import newHover from './new-hover.png';

class Sidebar extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            aHover: false,
        }
    }
    render()
    {
        return(
            <nav style={styles.Sidebar} className="Sidebar">
                <div style={styles.logo} className="logo">
                    <img style={styles.logoImg} src={quill} alt="Noteherder" />
                </div>
                <a  
                    className="new-note" 
                    href="/notes"
                    onMouseEnter= {() =>
                        {
                            this.setState(
                                {aHover: true}
                            )
                        }
                    }
                >
                    <img 
                        src={newHover} 
                        alt="New note" 
                    />
                    <img className="outline" src={newIcon} alt="New note" />
                </a>
                <div className="SignOut">
                    <button >
                        <i className="fa fa-sign-out"></i>
                    </button>
                </div>
            </nav>
        );
    }
}


const styles =
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

    imgHover:
    {
        position: 'absolute',
        left: '0',
        width: '100%',
        transition: 'opacity 0.25s ease-in-out',
        opacity: '0',
    },
    
}
export default Sidebar;