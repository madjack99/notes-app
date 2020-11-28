import React, { useState } from 'react';
import styled from '@emotion/styled';

import { deleteNote, updateNote } from '../../stores/notes';
import { startLoading, stopLoading } from '../../stores/loading';

const NoteWrapper = styled.div`
  width: 100%;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
`;

const Button = styled.button`
  margin: 0 10px 0 0;
  padding: 5px 10px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: #2993ff;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #25db18;
  }
`;

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
        <TextArea value={editContent} onChange={handleChange} />
      </form>
    );
  };

  return (
    <NoteWrapper>
      {renderContent()}
      <Button onClick={handleDelete}>delete</Button>
      <Button onClick={handleEdit}>update</Button>
      <Button>pin</Button>
    </NoteWrapper>
  );
};

export default Note;
