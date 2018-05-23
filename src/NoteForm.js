import React from 'react';

const NoteForm = ({note, ...props}) => 
{
    // we will always have a note in the props, be it a blank note
    const handleKeyPress = (ev) => 
    {
        ev.preventDefault();
        if(ev.target.name === "title")
        {
            const noteCopy = note;
            noteCopy.noteTitle += ev.key;
            props.onNoteUpdate(noteCopy);
        }
    }
    return (
        <div className="NoteForm">
            <div className="form-actions">
                <button type="button">
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
                    onKeyPress={(ev) => handleKeyPress(ev)}
                />
                </p>
                
                <textarea name="body" value ={note.noteContent} >
                    
                </textarea>
            </form>
        </div>
    );
}


export default NoteForm;