import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import Spinner from '../spinner';
import Note from '../note';
import AddNote from '../addNote';
import TextFilter from '../filters/text';
import TagFilter from '../filters/tag';

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
  const [filterTagValue, setFilterTagValue] = useState('');

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

  const filterByTags = (notesToFilter: INote[]) => {
    if (filterTagValue === '') return notesToFilter;

    const targetTags = filterTagValue.split(',').map((tag) => tag.trim());
    return notesToFilter.filter((note) => {
      return targetTags.every((targetTag) => {
        return note.tags.includes(targetTag);
      });
    });
  };

  const renderNotesList = (notesToRender: INote[]) => {
    if (loading) {
      return null;
    } else if (notesToRender.length === 0) {
      return <p>There are no any notes</p>;
    } else {
      const filteredNotes = filterNotes(notesToRender);
      const filteredByTags = filterByTags(filteredNotes);

      filteredByTags.sort((a, b) => +a.pinned - +b.pinned).reverse();

      return filteredByTags.map(({ content, id, tags, pinned }) => (
        <Note key={id} content={content} id={id} tags={tags} pinned={pinned} />
      ));
    }
  };

  return (
    <NotesContainer>
      <AddNote />
      <TextFilter setFilterValue={setFilterValue} filterValue={filterValue} />
      <TagFilter
        setFilterTagValue={setFilterTagValue}
        filterTagValue={filterTagValue}
      />
      <Spinner loading={loading} />
      {renderNotesList(notes)}
    </NotesContainer>
  );
};

export default NotesList;
