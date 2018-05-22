import React from 'react';
import Sidebar from "./Sidebar.js";
import NoteList from "./NoteList.js";
import NoteForm from "./NoteForm.js"

const Main = () => {
    return(
        <div className="Main">
            <Sidebar />
            <NoteList />
            <NoteForm />
        </div>
    )
}

export default Main;