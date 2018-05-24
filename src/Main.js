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
            currentNote: {...this.blankNote},
            notes: [],
        }     
    }

    //this will update a note if it exists, or will add it into the notelist
    updateNote = (note) =>
    {
        let index = this.state.notes.findIndex(
            (currNote) =>
            {
                if(currNote.id === note.id)
                    return true;
                return false;
            }
        );

        const notes = [...this.state.notes];

        if(index === -1)
        {

            //generate an ID for this note (that got filled from a blank note passed during the first time, to noteform)
            note.id = Date.now();
            notes.push(note);
            index = notes.length - 1;
            console.log("flag1");   
        }

        else
        {
            //update the copy of the array
            notes[index] = note;
        }

        
        //update the real array
        this.setState(
            {
                //update the notes variable with the notes variable we have
                currentNote: note,
                notes
            }
            
        );
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
                notes
            }
        )
        
    }

    onDeleteNote = (note) =>
    {
        let index = this.state.notes.findIndex(
            (currNote) =>
            {
                if(currNote.id === note.id)
                    return true;
                return false;
            }
        );

        const notes = [...this.state.notes];

        //remove this note from the copy of the notes array
        notes.splice(index, 1);

        //set the state to match the new array, and set the current note to the first or a blank one
        this.setState(
            {
                currentNote: (notes.length === 0 ? {...this.blankNote} : notes[0]),
                notes
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
                <NoteForm 
                    note={this.state.currentNote} 
                    onNoteUpdate={this.updateNote} 
                    onDeleteNote={this.onDeleteNote}
                />
            </div>
        );
    }

    blankNote = 
    {
        id: null,
        noteTitle: '',
        noteContent: '',
    };
}

const style = 
{
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}
export default Main;