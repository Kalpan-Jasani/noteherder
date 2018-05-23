import React from 'react';
import Sidebar from "./Sidebar.js";
import NoteList from "./NoteList.js";
import NoteForm from "./NoteForm.js"

class Main extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = 
        {
            note: {
                noteTitle: '',
                noteContent: '',
            }
        }     
    }

    callBack = (note) =>
    {

        this.setState(
            {
                note: note,
            }
        )
    };

    render()
    {
        return(
            <div 
                className="Main"
                style={style}
            >
                <Sidebar />
                <NoteList callBack={this.callBack} />
                <NoteForm note={this.state.note} />
            </div>
        );
    }
}

const style = 
{
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}
export default Main;