import { createStore, createEvent } from 'effector';

export interface INote {
  content: string;
  id: string;
}

export const fetchNotes = createEvent<INote[]>();

export const addNote = createEvent<INote>();

export const $notes = createStore<INote[]>([]);

$notes
  .on(fetchNotes, (_, fetchedNotes) => fetchedNotes)
  .on(addNote, (state, newNote) => [...state, newNote]);
