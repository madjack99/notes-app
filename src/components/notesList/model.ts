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

export const updateFilterValue = createEvent<string>();

export const $filterValue = createStore<string>('');

$filterValue.on(updateFilterValue, (_, newValue) => newValue);

export const updateTagFilterValue = createEvent<string>();

export const $tagFilterValue = createStore<string>('');

$tagFilterValue.on(updateTagFilterValue, (_, newValue) => newValue);
