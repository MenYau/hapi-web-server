import { nanoid } from 'nanoid';
import notes from './notes.mjs';

const addNoteHandler = (req, h) => {
  const { title, tags, body } = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, tags, body, createdAt, updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id);

  if (isSuccess.length) {
    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });
    res.code(201);

    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });
  res.code(500);

  return res;
};

const getAllNotesHandler = (req, h) => {
  const res = h.response({
    status: 'success',
    data: {
      notes,
    },
  });

  res.code(200);

  return res;
};

const getNoteByIdHandler = (req, h) => {
  const { id } = req.params;

  const isExist = notes.filter((note) => note.id === id);

  if (isExist.length) {
    const res = h.response({
      status: 'success',
      data: {
        note: isExist[0],
      },
    });

    res.code(200);

    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  res.code(404);

  return res;
};

const editNoteByIdHandler = (req, h) => {
  const { id } = req.params;
  const { title, tags, body } = req.payload;

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes[noteIndex] = {
      ...notes[noteIndex],
      title,
      tags,
      body,
      updatedAt: new Date().toISOString(),
    };

    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbaharui',
    });
    res.code(200);

    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
  });
  res.code(404);

  return res;
};

const deleteNoteHandler = (req, h) => {
  const { id } = req.params;

  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);

    const res = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    res.code(200);

    return res;
  }

  const res = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id catatan tidak ditemukan',
  });
  res.code(404);

  return res;
};

export {
  addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNoteByIdHandler, deleteNoteHandler,
};
