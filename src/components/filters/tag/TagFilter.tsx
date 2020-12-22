import React from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import { $notes } from '../../notesList';
import { $tagFilterValue, updateTagFilterValue } from './model';

const TagFilter = () => {
  const notes = useStore($notes);
  const tagFilterValue = useStore($tagFilterValue);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTagFilterValue(e.target.value);
  };

  const renderTagFilter = () => {
    if (notes.length === 0) return null;

    return (
      <Form onSubmit={handleSubmit}>
        <Input
          type='text'
          placeholder='search for tags separated by comma without #'
          value={tagFilterValue}
          onChange={handleChange}
        />
      </Form>
    );
  };

  return renderTagFilter();
};

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

export default TagFilter;
