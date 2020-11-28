import React from 'react';
import { useStore } from 'effector-react';

import { deleteNote } from '../../stores/notes';
import { startLoading, stopLoading } from '../../stores/loading';

interface INote {
  content: string;
  id: string;
}

const Note = ({ content, id }: INote) => {
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    startLoading();

    setTimeout(() => {
      stopLoading();
      deleteNote(id);
    }, 1000);
  };

  return (
    <div>
      <p>{content}</p>
      <button onClick={handleDelete}>delete</button>
      <button>update</button>
      <button>pin</button>
    </div>
  );
};

export default Note;
