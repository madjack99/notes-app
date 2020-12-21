import { createStore, createEvent, sample } from 'effector';

import { $notes } from '../../notesList';

export const updateTagFilterValue = createEvent<string>();

export const $tagFilterValue = createStore<string>('');

$tagFilterValue.on(updateTagFilterValue, (_, newValue) => newValue);

export const $filteredNotesByTags = sample(
  $notes,
  $tagFilterValue,
  (notes, tagFilterValue) => {
    if (tagFilterValue === '') return notes;
    const targetTags = tagFilterValue.split(',').map((tag) => tag.trim());
    const filteredNotes = notes.filter((note) => {
      return targetTags.every((targetTag) => {
        return note.tags.includes(targetTag);
      });
    });
    return filteredNotes.sort((a, b) => +a.pinned - +b.pinned).reverse();
  }
);
