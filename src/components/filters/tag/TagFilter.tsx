import React from 'react';
import { useStore } from 'effector-react';
import styled from '@emotion/styled';

import { $notes } from '../../../stores/notes';

const Form = styled.form`
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
`;

interface ITagFilter {
  filterTagValue: string;
  setFilterTagValue: (tagValue: string) => void;
}

const TagFilter = ({ filterTagValue, setFilterTagValue }: ITagFilter) => {
  const notes = useStore($notes);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterTagValue(e.target.value);
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
