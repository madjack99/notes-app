import React from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import { $notes } from '../../notesList';
import { $filterValue, updateFilterValue } from './model';

const TextFilter = () => {
  const notes = useStore($notes);
  const filterValue = useStore($filterValue);

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

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

export default TextFilter;
