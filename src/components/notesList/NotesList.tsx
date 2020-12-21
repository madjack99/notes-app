import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import Spinner from '../spinner';
import Note from '../note';
import AddNote from '../addNote';
import TextFilter from '../filters/text';
import TagFilter, { $isFilterOn } from '../filters/tag';

import { $notes, fetchNotes, INote, $finalFilterResult } from './model';
import { $filterValue, updateFilterValue } from '../filters/text';
import { $tagFilterValue, updateTagFilterValue } from '../filters/tag';
import { $loading, stopLoading } from '../spinner';

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
  const finalFilterResult = useStore($finalFilterResult);
  const loading = useStore($loading);
  const filterValue = useStore($filterValue);
  const tagFilterValue = useStore($tagFilterValue);
  const isFilterOn = useStore($isFilterOn);

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
    } else if (isFilterOn) {
      // filteredByTags.sort((a, b) => +a.pinned - +b.pinned).reverse();

      return finalFilterResult.map(({ content, id, tags, pinned }) => (
        <Note key={id} content={content} id={id} tags={tags} pinned={pinned} />
      ));
    } else {
      return notes.map(({ content, id, tags, pinned }) => (
        <Note key={id} content={content} id={id} tags={tags} pinned={pinned} />
      ));
    }
  };

  return (
    <NotesContainer>
      <AddNote />
      <TextFilter />
      <TagFilter />
      <Spinner loading={loading} />
      {renderNotesList(notes)}
    </NotesContainer>
  );
};

export default NotesList;
