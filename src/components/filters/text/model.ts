import { createEvent, createStore, sample } from 'effector';

import { $notes } from '../../notesList';

export const updateFilterValue = createEvent<string>();

export const $filterValue = createStore<string>('');

$filterValue.on(updateFilterValue, (_, newValue) => newValue);

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
