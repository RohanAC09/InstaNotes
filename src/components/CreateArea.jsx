import React, { useState } from "react";

function CreateArea( { note, functions } ) {

  function handleChange(event) {
    const { name, value } = event.target;
    functions.onUpdateInputField({ name, value });
  }

  function submitNote(event) {
    functions.onAdd();
    event.preventDefault();
  }

  function clearNote(event) {
    functions.onClearNote();
    event.preventDefault();
  }

  function deleteAllNotes(event) {
    functions.onDeleteAll();
    event.preventDefault();
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <div>
          <button onClick={submitNote}>Add</button>
          <button onClick={clearNote}>Clear</button>
          <button onClick={deleteAllNotes}>Delete all</button>
        </div>
      </form>
    </div>
  );
}

export default CreateArea;
