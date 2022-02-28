import React, { useState, useReducer } from "react";
import "./App.scss";

//uuid
import { v4 as uuid } from 'uuid';

const initialState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        lastNoteCreated: new Date().toTimeString().slice(0, 8),
        totalNotes: state.notes.length + 1 ,
        notes: [...state.notes, action.payload],
      };
      console.log(newState)
      return newState;
    }

    default:
      return state;
  }
};

const App = () => {
  const [noteInput, setNoteInput] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNote = (event) => {
    event.preventDefault()

    if( !noteInput ) {
      return
    }

    const newNote = {
      id: uuid(),
      text: noteInput,
      rotate: Math.floor(Math.random() * 20),
    }
    
    dispatch({ type:"ADD_NOTE", payload: newNote })
    setNoteInput("")
  };

  const dropNote = (event) => {
    event.target.style.left = `${event.pageX - 50}px`
    event.target.style.top = `${event.pageY - 50}px`
  }

  const dragOver = (event) => {
    event.stopPropagation()
    event.preventDefault()
  }
  return (
    <div className="app" onDragOver={dragOver}>
      <h1>Sticky Notes</h1>
      <form onSubmit={addNote} className="note-form">
        <textarea
          placeholder="Create a new note..."
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
        ></textarea>
        <button>Add</button>
      </form>

      {state.notes.map(note => (
        <div 
        className="note"
        style={{transform:`rotate(${note.rotate}deg)`}}
         key={note.id}
         draggable="true"
         onDragEnd={dropNote}
         >
          <pre className="text">{note.text}</pre>
        </div>

      ))}
    </div>
  );
};

export default App;
