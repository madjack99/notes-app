import { createStore, createEvent, sample } from 'effector';

import { $filterValue } from '../filters/text';
import { $tagFilterValue } from '../filters/tag';

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

$notes
  .on(fetchNotes, apiFetchNotes)
  .on(addNote, apiAddNote)
  .on(deleteNote, apiDeleteNote)
  .on(updateNote, apiUpdateNote)
  .on(togglePinned, apiTogglePinned);

export const $filteredNotesByText = sample(
  $notes,
  $filterValue,
  (notes, filterValue) => {
    if (filterValue === '') return notes;
    return notes.filter((note) => {
      return note.content.includes(filterValue);
    });
  }
);

export const $filteredNotesByTags = sample(
  $notes,
  $tagFilterValue,
  (notes, tagFilterValue) => {
    if (tagFilterValue === '') return notes;
    const targetTags = tagFilterValue.split(',').map((tag) => tag.trim());
    return notes.filter((note) => {
      return targetTags.every((targetTag) => {
        return note.tags.includes(targetTag);
      });
    });
  }
);
