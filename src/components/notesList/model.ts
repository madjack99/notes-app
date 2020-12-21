import { createStore, createEvent } from 'effector';

import {
  apiFetchNotes,
  apiAddNote,
  apiDeleteNote,
  apiUpdateNote,
  apiTogglePinned,
} from '../../api';

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

export const $filteredNotes = createStore(($notes: INote[]) => $notes);

$notes
  .on(fetchNotes, apiFetchNotes)
  .on(addNote, apiAddNote)
  .on(deleteNote, apiDeleteNote)
  .on(updateNote, apiUpdateNote)
  .on(togglePinned, apiTogglePinned);
