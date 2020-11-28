import React, { useEffect } from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import Spinner from '../spinner';

import { $notes } from '../../stores/notes';
import { $loading, stopLoading } from '../../stores/loading';

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 75%;
  margin: 10px auto;
`;

const NotesList = () => {
  const notes = useStore($notes);
  const loading = useStore($loading);

  useEffect(() => {
    setTimeout(stopLoading, 1000);
  });

  return (
    <NotesContainer>
      <Spinner loading={loading} />
    </NotesContainer>
  );
};

export default NotesList;
