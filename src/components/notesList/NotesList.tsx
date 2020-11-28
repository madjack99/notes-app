import React, { useEffect } from 'react';
import { useStore } from 'effector-react';

import { $notes } from '../../stores/notes';
import { $loading, stopLoading } from '../../stores/loading';

const NotesList = () => {
  const notes = useStore($notes);
  const loading = useStore($loading);

  useEffect(() => {
    setTimeout(stopLoading, 500);
  });

  return <div>{loading && 'spinner'}</div>;
};

export default NotesList;
