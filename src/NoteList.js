import React from 'react';

class NoteList extends React.Component
{
    constructor(props)
    {
        super(props);
        let noteArray = props.notes;

        //temporary hardcoding
        //todo: delete this and set noteArray to constant
        noteArray = 
        [
            {
                noteTitle: "Kohlrabi welsh",
                noteContent: "Veggies es bonus vobis, proinde vos postulo essum magis kohlrabi welsh onion daikon amaranth tatsoi tomatillo melon azuki bean garlic."
            },
            {
                noteTitle: "Dandelion cucumber",
                noteContent: "Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini."
            },
            {
                noteTitle: "Prairie turnip",
                noteContent: "Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery. Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip."
            },

        ];

        if(noteArray == undefined)
        {
            //we set the state to an empty array of notes, not an undefined array!
            this.state =
            {
                noteArray: [],
            }
        }
        else
        {
            this.state = 
            {
                noteArray: noteArray,
            }
        }

    }
    render()
    {
        return(
            <div className="NoteList">
                <h3>Notes</h3>
                <ul id="notes">
                {
                    this.state.noteArray.map(
                        (value) => 
                        {
                            return (
                                <NoteBox 
                                    callBack={this.props.callBack}
                                    note={value} 
                                />
                            );
                        }
                    )
                
                }
                </ul>
            </div>
        )
    }
    
    

}

class NoteBox extends React.Component
{
    constructor(props)
    {
        super(props);
        //read the note from the props
        const note = this.props.note;

        //set the state to be the note
        this.state = 
        {
            note: note,
        };
    }

    handleClick()
    {
        this.props.callBack(this.state.note);
    }
    render()
    {
        const anchorElement = (
            <a
                onClick={
                    () => {
                        console.log("Kalpan");
                        this.handleClick()
                    }
                }
                className="active"
            >
              <li>
                <div className="note">
                  <div className="note-title">
                    {this.state.note.noteTitle}
                  </div>
                  <div className="note-body">
                    <p>
                        {this.state.note.noteContent}
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