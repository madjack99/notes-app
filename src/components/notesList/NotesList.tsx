import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import Spinner from '../spinner';
import Note from '../note';
import AddNote from '../addNote';
import TextFilter from '../filters/text';
import TagFilter, { $isFilterOn } from '../filters/tag';

import { $notes, fetchNotes, $finalFilterResult, INote } from './model';
import { $loading, stopLoading } from '../spinner';

const NotesList = () => {
  const notes = useStore($notes);
  const finalFilterResult = useStore($finalFilterResult);
  const loading = useStore($loading);
  const isFilterOn = useStore($isFilterOn);

  useEffect(() => {
    setTimeout(() => {
      stopLoading();
      fetchNotes([]);
    }, 1000);
  }, []);

  const renderNote = ({ content, id, tags, pinned }: INote) => (
    <Note key={id} content={content} id={id} tags={tags} pinned={pinned} />
  );

  const renderNotesList = () => {
    if (loading) {
      return null;
    } else if (notes.length === 0) {
      return <p>There are no any notes</p>;
    } else if (isFilterOn) {
      return finalFilterResult.map((note) => renderNote(note));
    } else {
      return notes.map((note) => renderNote(note));
    }
  };

  return (
    <NotesContainer>
      <AddNote />
      <TextFilter />
      <TagFilter />
      <Spinner loading={loading} />
      {renderNotesList()}
    </NotesContainer>
  );
};

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  max-width: 75%;
  margin: 10px auto;
`;

export default NotesList;
