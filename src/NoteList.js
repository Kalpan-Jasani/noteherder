import React from "react";

class NoteList extends React.Component
{
    render()
    {
        return(
            <div className="NoteList">
                <h3>Notes</h3>
                <ul id="notes">
                    {
                        this.props.notes.map(
                            (value) => 
                            {
                                return (
                                    <NoteBox
                                        callback={this.props.onClickCallback}
                                        note={value} 
                                        key={value.id}
                                    />
                                );
                            }
                        )
                    
                    }
                </ul>
            </div>
        );
    }
}

class NoteBox extends React.Component
{
    handleClick()
    {
        this.props.callback(this.props.note);
    }

    milliSecondsToString(milliSeconds)
    {
        const date = new Date();
        date.setTime(milliSeconds);
        let displayString = "";
        displayString = `${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
        return displayString;
    }
    render()
    {
        const anchorElement = (
            <a
                onClick={
                    () => {
                        this.handleClick()
                    }
                }
                className="active"
            >
                <li>
                    <div className="note">
                        <div className="note-title">
                            {this.props.note.noteTitle || "(Empty)"}
                        </div>
                        <div className="note-body">
                            <p>
                                {this.props.note.noteContent || "(Empty body)"}
                            </p>
                            <p>
                                Updated: {this.milliSecondsToString(this.props.note.timestamp)}
                            </p>
                        </div>
                    </div>
                </li>
            </a>
        );
        
        return anchorElement;
        
    }
}

export default NoteList