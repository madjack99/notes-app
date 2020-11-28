import { createStore, createEvent } from 'effector';

export interface INote {
  content: string;
  id: string;
}

export const fetchNotes = createEvent<INote[]>();

export const addNote = createEvent<INote>();

export const deleteNote = createEvent<string>();

export const updateNote = createEvent<INote>();

export const $notes = createStore<INote[]>([]);

$notes
  .on(fetchNotes, (_, fetchedNotes) => fetchedNotes)
  .on(addNote, (state, newNote) => [...state, newNote])
  .on(deleteNote, (state, deleteId) => {
    return state.filter(({ id }) => id !== deleteId);
  })
  .on(updateNote, (state, updatedNote) => {
    return state.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });
  });
