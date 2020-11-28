import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import Spinner from '../spinner';

import { $notes } from '../../stores/notes';
import { $loading, stopLoading } from '../../stores/loading';

const NotesList = () => {
  const notes = useStore($notes);
  const loading = useStore($loading);

  useEffect(() => {
    setTimeout(stopLoading, 1000);
  });

  return <div>{loading && <Spinner />}</div>;
};

export default NotesList;
