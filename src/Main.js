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
            //setting current note to an empty note initially, not null or undefined
            currentNote: this.blankNote,
            notes: [],
        }     
    }

    updateNote = (note) =>
    {
        const index = this.state.notes.findIndex(
            (currNote) =>
            {
                if(currNote.id === note.id)
                    return true;
                return false;
            }
        )

        const notes = [...this.state.notes];

        //update the copy of the array
        notes[index] = note;

        //update the real array
        this.setState(
            {
                //update the notes variable with the notes variable we have
                notes
            }
            
        )
    }
    loadNote = (note) =>
    {
        this.setState(
            {
                currentNote: note,
            }
        )
    };

    addNewNote = () => 
    {
        const newBlankNote = {...this.blankNote};
        const notes = [...this.state.notes];
        newBlankNote.id = Date.now();
        notes.push(newBlankNote);
        this.setState(
            {
                currentNote: newBlankNote,
                notes: notes
            }
        )
        
    }


    render()
    {
        return(
            <div 
                className="Main"
                style={style}
            >
                <Sidebar onAddCallback={this.addNewNote} />
                <NoteList onClickCallback={this.loadNote} notes={this.state.notes} />
                <NoteForm note={this.state.currentNote} onNoteUpdate={this.updateNote}/>
            </div>
        );
    }

    blankNote = 
    {
        id: null,
        noteTitle: '',
        noteContent: '',
    }
}

const style = 
{
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}
export default Main;