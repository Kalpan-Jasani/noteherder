import React from 'react';

class NoteForm extends React.Component
{
    constructor(props)
    {
        super(props);

        let note = this.props.note;
        console.log("Kalpan J");

        //if note is not given (which will always be when this app is shipped, then just have it be an object with empty title and content, but not undefined
        if(note == undefined)
        {
            note = {
                noteTitle: "",
                noteContent: "",
            };
        }

        this.state = {
            note: note
        };
    }

    render()
    {
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
                        value={this.props.note.noteTitle}
                    />
                    </p>
                    
                    <textarea name="body" value ={this.props.note.noteContent} >
                        
                    </textarea>
                </form>
            </div>
        )
    }
    
}


export default NoteForm;