import NotesList from './NotesList';

import {
  fetchNotesFx,
  addNoteFx,
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
  addNoteFx,
  deleteNote,
  updateNote,
  togglePinned,
  $notes,
  $filteredNotesByText,
  $filteredNotesByTags,
  $finalFilterResult,
};

export type INote = noteInterface;
