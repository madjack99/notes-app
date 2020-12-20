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

interface ITagFilter {
  filterTagValue: string;
  updateTagFilterValue: (tagValue: string) => void;
}

const TagFilter = ({ filterTagValue, updateTagFilterValue }: ITagFilter) => {
  const notes = useStore($notes);

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
          value={filterTagValue}
          onChange={handleChange}
        />
      </Form>
    );
  };

  return renderTagFilter();
};

export default TagFilter;
