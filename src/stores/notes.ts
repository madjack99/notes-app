import { createStore, createEvent } from 'effector';

export interface INote {
  content: string;
  id: number;
}

export const fetchNotes = createEvent<INote[]>();

export const $notes = createStore<INote[]>([]);

$notes.on(fetchNotes, (_, fetchedNotes) => fetchedNotes);
