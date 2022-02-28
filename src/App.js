import React, { useState, useReducer } from "react";
import "./App.scss";

const initialState = {
  lastNoteCreated: null,
  totalNotes: 0,
  notes: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_NOTE": {
      const newState = {
        lastNoteCreated: new Date.toTimeString().slice(0, 8),
        totalNotes: state.notes.length + 1,
        notes: [...state.notes, action.payload],
      };
      return newState;
    }

    default:
      return state;
  }
};

const App = () => {
  const [inputNotes, setInputNotes] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);

  const addNote = () => {};

  return (
    <div className="app">
      <h1>Sticky Notes</h1>
      <form onSubmit={addNote} className="note-form">
        <textarea
          placeholder="Create a new note..."
          value={inputNotes}
          onChange={(e) => setInputNotes(e.target.value)}
        ></textarea>
        <button>Add</button>

        {inputNotes}
      </form>
    </div>
  );
};

export default App;
