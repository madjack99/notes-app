import { INote } from '../components/notesList';

// export const apiFetchNotes = (store: INote[], fetchedNotes: INote[]) =>
//   fetchedNotes;

export const apiFetchNotes = () => {
  return new Promise<INote[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([]);
    }, 1000);
  });
};

export const apiAddNote = (state: INote[], newNote: INote) => [
  ...state,
  newNote,
];

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
