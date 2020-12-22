import NotesList from './NotesList';

import {
  fetchNotesFx,
  addNote,
  deleteNote,
  updateNote,
  togglePinned,
  $notes,
  $filteredNotesByText,
  $filteredNotesByTags,
  INote as noteInterface,
  $finalFilterResult,
} from './model';

export default NotesList;

export {
  fetchNotesFx,
  addNote,
  deleteNote,
  updateNote,
  togglePinned,
  $notes,
  $filteredNotesByText,
  $filteredNotesByTags,
  $finalFilterResult,
};

export type INote = noteInterface;
