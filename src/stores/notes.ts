import { createStore, createEvent } from 'effector';

export interface INote {
  content: string;
  id: string;
  tags: string[];
  pinned: boolean;
}

export const fetchNotes = createEvent<INote[]>();

export const addNote = createEvent<INote>();

export const deleteNote = createEvent<string>();

export const updateNote = createEvent<INote>();

export const togglePinned = createEvent<string>();

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
  })
  .on(togglePinned, (state, targetNoteId) => {
    return state.map((note) => {
      if (note.id === targetNoteId) {
        return {
          ...note,
          pinned: !note.pinned,
        };
      }
      return note;
    });
  });
