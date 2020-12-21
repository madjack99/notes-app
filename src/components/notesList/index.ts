import NotesList from './NotesList';

import {
  fetchNotes,
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
  fetchNotes,
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
