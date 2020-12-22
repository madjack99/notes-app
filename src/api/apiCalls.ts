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

export const apiDeleteNote = (id: string) => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
  });
};

export const apiUpdateNote = (updatedNote: INote) => {
  return new Promise<boolean>((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, 1000);
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
