import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import Spinner from '../spinner';
import Note from '../note';
import AddNote from '../addNote';

import { $notes, fetchNotes, INote } from '../../stores/notes';
import { $loading, stopLoading } from '../../stores/loading';

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 75%;
  margin: 10px auto;
`;

const NotesList = () => {
  const notes = useStore($notes);
  const loading = useStore($loading);

  useEffect(() => {
    setTimeout(() => {
      stopLoading();
      fetchNotes([]);
    }, 1000);
  }, []);

  const renderNotesList = (notesToRender: INote[]) => {
    if (loading) {
      return null;
    } else if (notesToRender.length === 0) {
      return <p>There are no any notes</p>;
    } else {
      return notesToRender.map(({ content, id }) => (
        <Note key={id} content={content} id={id} />
      ));
    }
  };

  return (
    <NotesContainer>
      <AddNote />
      <Spinner loading={loading} />
      {renderNotesList(notes)}
    </NotesContainer>
  );
};

export default NotesList;
