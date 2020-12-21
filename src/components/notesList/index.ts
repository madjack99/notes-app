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
};

export type INote = noteInterface;
