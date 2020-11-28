import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import Spinner from '../spinner';
import Note from '../note';
import AddNote from '../addNote';
import TextFilter from '../filters/text';

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
  let notes = useStore($notes);
  const loading = useStore($loading);

  const [filterValue, setFilterValue] = useState('');

  useEffect(() => {
    setTimeout(() => {
      stopLoading();
      fetchNotes([]);
    }, 1000);
  }, []);

  const filterNotes = (notesToFilter: INote[]) => {
    if (filterValue === '') return notesToFilter;
    return notesToFilter.filter((note) => {
      return note.content.includes(filterValue);
    });
  };

  const renderNotesList = (notesToRender: INote[]) => {
    if (loading) {
      return null;
    } else if (notesToRender.length === 0) {
      return <p>There are no any notes</p>;
    } else {
      const filteredNotes = filterNotes(notesToRender);

      return filteredNotes.map(({ content, id, tags }) => (
        <Note key={id} content={content} id={id} tags={tags} />
      ));
    }
  };

  return (
    <NotesContainer>
      <AddNote />
      <TextFilter setFilterValue={setFilterValue} filterValue={filterValue} />
      <Spinner loading={loading} />
      {renderNotesList(notes)}
    </NotesContainer>
  );
};

export default NotesList;
