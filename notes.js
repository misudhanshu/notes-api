const express = require("express");
const app = express();

app.use(express.json());

const PORT = 4000;

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to notes api",
  });
});

let notes = [
  {
    id: 1,
    title: "Making a coffee",
  },
  {
    id: 2,
    title: "Making a tea",
  },
  {
    id: 3,
    title: "Having meal",
  },
];

app.get("/notes", (req, res) => {
  res.json(notes);
});

app.get("/notes/:id", (req, res) => {
  const currentNote = notes.find((n) => n.id === parseInt(req.params.id));

  if (currentNote) {
    res.status(200).json(currentNote);
  } else {
    res.status(404).json({
      message: "Note not found",
    });
  }
});

app.put("/notes/:id", (req, res) => {
  const updateNote = notes.find((n) => n.id === parseInt(req.params.id));

  if (updateNote) {
    updateNote.title = req.body.title || updateNote.title;
    console.log(updateNote.title);

    res.status(200).json({
      message: "Note updated successfully",
      updateNote: updateNote,
    });
  } else {
    res.status(404).json({
      message: `Note with ${req.params.id} not found`,
    });
  }
});

app.post("/notes", (req, res) => {
  const newNotes = {
    createdAt: new Date().toLocaleTimeString(),
    id: Date.now(),
  };
  if (!req.body.title) {
    return res.status(404).json({ message: "Title is required" });
  }
  notes.push(newNotes);

  res.status(201).json({
    message: "Note created successfully",
  });
});

app.delete("/notes/:id", (req, res) => {
  const findNote = notes.find(
    (noteItem) => noteItem.id === parseInt(req.params.id),
  );

  if (findNote) {
    notes = notes.filter((n) => n.id !== findNote.id);

    res.status(200).json({
      message: "Note deleted successfully",
      data: notes,
    });
  } else {
    res.status(404).json({
      message: "Note not found",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
