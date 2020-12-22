import {
  createStore,
  createEvent,
  createEffect,
  sample,
  combine,
} from 'effector';
import { v4 as uuidv4 } from 'uuid';

import { $filterValue } from '../filters/text';
import { $tagFilterValue } from '../filters/tag';
import { stopLoading } from '../spinner';

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

interface IAddNote {
  tags: string;
  content: string;
}

const NON_EXISTING_ID = '-1';

export const fetchNotesFx = createEffect(async () => {
  const fetchedNotes = await apiFetchNotes();
  stopLoading();
  return fetchedNotes;
});

export const addNoteFx = createEffect(
  async ({ tags, content }: IAddNote): Promise<INote> => {
    let noteTags: string[];
    if (tags === '') {
      noteTags = [];
    } else {
      noteTags = tags.split(',').map((tag) => tag.trim());
    }

    const newNote = {
      id: uuidv4(),
      tags: noteTags,
      pinned: false,
      content,
    };

    const addedNote = await apiAddNote(newNote);
    stopLoading();
    return addedNote;
  }
);

export const deleteNoteFx = createEffect(async (id: string) => {
  const success = await apiDeleteNote(id);
  stopLoading();
  if (success) return id;
  return NON_EXISTING_ID;
});

export const updateNoteFx = createEffect(async (updatedNote: INote) => {
  const success = await apiUpdateNote(updatedNote);
  stopLoading();
  return { success, updatedNote };
});

const rearrangeNotes = createEvent();

export const togglePinned = createEvent<string>();
togglePinned.watch(() => rearrangeNotes());

export const $notes = createStore<INote[]>([]);

$notes
  .on(fetchNotesFx.doneData, (_, notes) => {
    return notes;
  })
  .on(addNoteFx.doneData, (state, addedNote) => {
    return [...state, addedNote];
  })
  .on(deleteNoteFx.doneData, (state, deleteId) => {
    return state.filter(({ id }) => id !== deleteId);
  })
  .on(updateNoteFx.doneData, (state, payload) => {
    const { success, updatedNote } = payload;
    if (success) {
      return state.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
    } else {
      return state;
    }
  })
  .on(togglePinned, apiTogglePinned)
  .on(rearrangeNotes, (state) => {
    state.sort((a, b) => +a.pinned - +b.pinned).reverse();
  });

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

export const $finalFilterResult = combine(
  $filteredNotesByText,
  $filteredNotesByTags,
  (filteredNotesByText, filteredNotesByTags) => {
    const combinedArrays = new Set([
      ...filteredNotesByText,
      ...filteredNotesByTags,
    ]);
    const result = Array.from(combinedArrays);
    return result;
  }
);
