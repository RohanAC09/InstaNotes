import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import jsPDF from 'jspdf';

function App() {
  const defaultNote = {
    title: "",
    content: ""
  };
  const [note, setNote] = useState(defaultNote);
  const [notes, setNotes] = useState([{
    title: "Fun Fact 1",
    content: "Your brain consumes about 20% of your body's energy"
  },{
    title: "Fun Fact 2",
    content: "Sea otters hold hands while sleeping so they don't drift apart in the water"
  }]);

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

  function handleDownloadPDF() {
        const pdf = new jsPDF();
        pdf.text('InstaNotes', 20, 20);

        // Add notes to PDF
        notes.forEach((noteItem, index) => {
            const yPos = 30 + index * 20;
            pdf.text(
                `* Title: ${noteItem.title}`, 20, yPos);
            pdf.text(
                `Content: ${noteItem.content}`, 20, yPos + 10);
        });

        // Save the PDF
        pdf.save('InstaNotes.pdf');
    };

  const inputFunctions = {
    onUpdateInputField: updateInputField,
    onAdd: addNote,
    onClearNote: clearNote,
    onDeleteAll: deleteAllNotes
  }

  return (
    <div>
      <Header onDownloadPDF={handleDownloadPDF} />
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
