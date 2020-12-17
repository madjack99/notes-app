import NotesList from './NotesList';

import {
  fetchNotes,
  addNote,
  deleteNote,
  updateNote,
  togglePinned,
  $notes,
  INote as noteInterface,
} from './model';

export default NotesList;

export { fetchNotes, addNote, deleteNote, updateNote, togglePinned, $notes };

export type INote = noteInterface;
