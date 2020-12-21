import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import Spinner from '../spinner';
import Note from '../note';
import AddNote from '../addNote';
import TextFilter from '../filters/text';
import TagFilter from '../filters/tag';

import {
  $notes,
  fetchNotes,
  INote,
  $filteredNotesByText,
  $filteredNotesByTags,
} from './model';
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
  let notes = useStore($notes);
  const filteredNotesByText = useStore($filteredNotesByText);
  const filteredNotesByTags = useStore($filteredNotesByTags);
  const loading = useStore($loading);
  const filterValue = useStore($filterValue);
  const tagFilterValue = useStore($tagFilterValue);

  useEffect(() => {
    setTimeout(() => {
      stopLoading();
      fetchNotes([]);
    }, 1000);
  }, []);

  // const filterNotes = (notesToFilter: INote[]) => {
  //   if (filterValue === '') return notesToFilter;
  //   return notesToFilter.filter((note) => {
  //     return note.content.includes(filterValue);
  //   });
  // };

  // const filterByTags = (notesToFilter: INote[]) => {
  //   if (tagFilterValue === '') return notesToFilter;

  //   const targetTags = tagFilterValue.split(',').map((tag) => tag.trim());
  //   return notesToFilter.filter((note) => {
  //     return targetTags.every((targetTag) => {
  //       return note.tags.includes(targetTag);
  //     });
  //   });
  // };

  const renderNotesList = (notesToRender: INote[]) => {
    if (loading) {
      return null;
    } else if (notesToRender.length === 0) {
      return <p>There are no any notes</p>;
    } else {
      // const filteredNotes = filterNotes(notesToRender);
      // const filteredByTags = filterByTags(filteredNotes);

      // filteredByTags.sort((a, b) => +a.pinned - +b.pinned).reverse();

      return filteredNotesByText.map(({ content, id, tags, pinned }) => (
        <Note key={id} content={content} id={id} tags={tags} pinned={pinned} />
      ));
    }
  };

  return (
    <NotesContainer>
      <AddNote />
      <TextFilter
        updateFilterValue={updateFilterValue}
        filterValue={filterValue}
      />
      <TagFilter
        updateTagFilterValue={updateTagFilterValue}
        filterTagValue={tagFilterValue}
      />
      <Spinner loading={loading} />
      {renderNotesList(notes)}
    </NotesContainer>
  );
};

export default NotesList;
