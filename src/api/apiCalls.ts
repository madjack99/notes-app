import { INote } from '../components/notesList';

export const apiFetchNotes = () => {
  return new Promise<INote[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

export const apiAddNote = (newNote: INote) => {
  return new Promise<INote>((resolve, reject) => {
    setTimeout(() => {
      resolve(newNote);
    }, 1000);
  });
};

export const apiDeleteNote = (state: INote[], deleteId: string) => {
  return state.filter(({ id }) => id !== deleteId);
};

export const apiUpdateNote = (state: INote[], updatedNote: INote) => {
  return state.map((note) => {
    if (note.id === updatedNote.id) {
      return updatedNote;
    } else {
      return note;
    }
  });
};

export const apiTogglePinned = (state: INote[], targetNoteId: string) => {
  return state.map((note) => {
    if (note.id === targetNoteId) {
      return {
        ...note,
        pinned: !note.pinned,
      };
    }
    return note;
  });
};
