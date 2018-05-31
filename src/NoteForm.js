import React from "react";

const NoteForm = ({note, ...props}) => 
{
    // we will always have a note in the props, be it a blank note
    const handleChange = (ev) => 
    {
        ev.preventDefault();
        if(ev.target.name === "title")
        {
            note.noteTitle = ev.target.value;
            props.onNoteUpdate(note);
        }

        else if(ev.target.name === "body")
        {
            note.noteContent = ev.target.value;
            props.onNoteUpdate(note);
        }
    };

    const onDeleteNote = (ev) =>
    {
        ev.preventDefault();
        props.onDeleteNote(note);

    };
    return (
        <div className="NoteForm">
            <div className="form-actions">
                <button onClick={onDeleteNote} type="button">
                    <i className="fa fa-trash-o"></i>
                </button>
            </div>
            <form>
                <p>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title your note"
                        value={note.noteTitle}
                        onChange={(ev) => handleChange(ev)}
                    />
                </p>
                
                <textarea 
                    name="body" 
                    value ={note.noteContent}
                    onChange={(ev) => handleChange(ev)}
                >
                    
                </textarea>
            </form>
        </div>
    );
};


export default NoteForm;