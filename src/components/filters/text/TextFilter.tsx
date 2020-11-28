import React, { useState } from 'react';
import { useStore } from 'effector-react';

import { $notes, INote } from '../../../stores/notes';

interface ITextFilter {
  setFilterValue: (filterValue: string) => void;
  filterValue: string;
}

const TextFilter = ({ setFilterValue, filterValue }: ITextFilter) => {
  const notes = useStore($notes);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const renderFilter = () => {
    if (!notes.length) return null;

    return (
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='search for text in notes'
          value={filterValue}
          onChange={handleChange}
        />
      </form>
    );
  };

  return renderFilter();
};

export default TextFilter;
