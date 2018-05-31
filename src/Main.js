import React from 'react';
import Sidebar from "./Sidebar.js";
import NoteList from "./NoteList.js";
import NoteForm from "./NoteForm.js";
import rebaseObj from "./baseSetup.js";

class Main extends React.Component {
    constructor(props)
    {
        super(props);


        if(this.checkIsLocalStorageAvailable())
            this.localStorage = window.localStorage;
        else
            this.localStorage = null;

        //if there is previous state stored in storage
        if(this.localStorage.getItem("state"))
        {  
            this.state = JSON.parse(this.localStorage.getItem("state"));
        }
        else
        {
            this.state = 
            {
                //setting current note to an empty note initially, not null or undefined
                currentNote: {...this.blankNote},
                notes: [],
            }  
        }

        //set up a two way syncing with firebase. TODO: check whether this needs to be called everytime
        rebaseObj.syncState(`${this.props.uid}/`
            ,
            {
                context: this,
                state: `${this.state.notes}`,
                asArray: true,
            }
        );
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
                notes: notes,
            }
        );
    }

    setState = (state) => 
    {
        super.setState(state, 
            () => 
            {
                //this is called after state has actually been updated
                this.localStorage.setItem("state", JSON.stringify(this.state));
                console.log(this.state);
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
        );


    }

    render()
    {
        return(
            <div 
                className="Main"
                style={style}
            >
                <Sidebar 
                    handleSignOut={this.props.handleSignOut} 
                    onAddCallback={this.addNewNote} 
                />
                <NoteList 
                    onClickCallback={this.loadNote} 
                    notes={this.state.notes} 
                />
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

const style = 
{
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}
export default Main;