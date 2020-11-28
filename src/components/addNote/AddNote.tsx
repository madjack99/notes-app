import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { addNote } from '../../stores/notes';
import { $loading, startLoading, stopLoading } from '../../stores/loading';

const Form = styled.form`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

type ButtonProps = {
  disabled: boolean;
  type: string;
};

const Button = styled.button<ButtonProps>`
  padding: 5px 10px;
  border: none;
  background-color: ${(props) => (props.disabled ? '#698690' : '#2993ff')};
  color: white;
  cursor: pointer;
  border-radius: 10px;
  outline: none;
  &:hover {
    background-color: ${(props) => (props.disabled ? '#698690' : '#25DB18')};
  }
`;

const AddNote = () => {
  let [content, setContent] = useState('');

  const loading = useStore($loading);
  console.log(loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();

    const newNote = {
      id: uuidv4(),
      content,
    };

    setTimeout(() => {
      stopLoading();
      addNote(newNote);
    }, 1000);

    setContent('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor='content'>Add you note here</label>
      <input type='text' value={content} onChange={handleChange} />
      <Button type='submit' disabled={loading}>
        Add note
      </Button>
    </Form>
  );
};

export default AddNote;
