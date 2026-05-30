import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const defaultNote = {
    title: "",
    content: ""
  };
  const [note, setNote] = useState(defaultNote);
  const [notes, setNotes] = useState([]);

  function updateInputField({ name, value }) {
    setNote( (currentNote) => ({ ...currentNote, [name]: value }));
  }

  function addNote() {
    setNotes(prevNotes => {
      return [...prevNotes, note];
    });
    setNote(defaultNote);
  }

  function clearNote() {
    setNote(defaultNote);
  }

  function deleteAllNotes() {
    setNotes([]);
    setNote(defaultNote);
  }

  function editNote(id) {
    const currentNote = notes.find((noteItem, index) => index === id);
    setNote(currentNote);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  const inputFunctions = {
    onUpdateInputField: updateInputField,
    onAdd: addNote,
    onClearNote: clearNote,
    onDeleteAll: deleteAllNotes
  }

  return (
    <div>
      <Header />
      <CreateArea note={note} functions={inputFunctions} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onEdit={editNote}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
