import React from 'react';
import Sidebar from "./Sidebar.js";
import NoteList from "./NoteList.js";
import NoteForm from "./NoteForm.js"

const Main = () => {
    return(
        <div 
            className="Main"
            style={style}
        >
            <Sidebar />
            <NoteList />
            <NoteForm />
        </div>
    )
}

const style = 
{
  display: 'flex',
  height: '100vh',
  alignItems: 'stretch',
}
export default Main;