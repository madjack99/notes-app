import React from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import { $notes } from '../../notesList';

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

interface ITextFilter {
  updateFilterValue: (filterValue: string) => void;
  filterValue: string;
}

const TextFilter = ({ updateFilterValue, filterValue }: ITextFilter) => {
  const notes = useStore($notes);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilterValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const renderFilter = () => {
    if (!notes.length) return null;

    return (
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='search for text in notes'
          value={filterValue}
          onChange={handleChange}
        />
      </Form>
    );
  };

  return renderFilter();
};

export default TextFilter;
