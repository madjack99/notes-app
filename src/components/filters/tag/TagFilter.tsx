import React from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import { $notes } from '../../notesList';
import { $tagFilterValue, updateTagFilterValue } from './model';

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

const TagFilter = () => {
  const notes = useStore($notes);
  const tagFilterValue = useStore($tagFilterValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTagFilterValue(e.target.value);
  };

  const renderTagFilter = () => {
    if (notes.length === 0) return null;

    return (
      <Form>
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

export default TagFilter;
