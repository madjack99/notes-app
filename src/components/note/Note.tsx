import React, { useState } from 'react';
import { useStore } from 'effector-react';

import { deleteNote, updateNote } from '../../stores/notes';
import { startLoading, stopLoading } from '../../stores/loading';

interface INote {
  content: string;
  id: string;
}

const Note = ({ content, id }: INote) => {
  console.log('content', content);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  console.log('edit content', editContent);

  const handleDelete = () => {
    startLoading();

    setTimeout(() => {
      stopLoading();
      deleteNote(id);
    }, 1000);
  };

  const handleEdit = () => {
    if (!editing) {
      setEditing(true);
      setEditContent(content);
    } else {
      setEditing(false);
      startLoading();
      setTimeout(() => {
        stopLoading();
        updateNote({
          content: editContent,
          id,
        });
      }, 1000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditContent(e.target.value);
  };

  const renderContent = () => {
    if (!editing) return <p>{content}</p>;

    return (
      <form>
        <textarea value={editContent} onChange={handleChange} />
      </form>
    );
  };

  return (
    <div>
      {renderContent()}
      <button onClick={handleDelete}>delete</button>
      <button onClick={handleEdit}>update</button>
      <button>pin</button>
    </div>
  );
};

export default Note;
