import React from 'react';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { addNoteFx } from '../notesList';
import { $content, setContent, $tags, setTags } from './model';
import { $loading, startLoading } from '../spinner';

const AddNote = () => {
  const content = useStore($content);
  const tags = useStore($tags);
  const loading = useStore($loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'content') {
      setContent(value);
    } else {
      setTags(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (content === '') return;
    startLoading();
    addNoteFx({ tags, content });
    setContent('');
    setTags('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor='content'>Add your note here</label>
      <input
        type='text'
        value={content}
        name='content'
        id='content'
        onChange={handleChange}
        placeholder='Text'
      />
      <label htmlFor='tags'>Add your tags here</label>
      <input
        type='text'
        value={tags}
        name='tags'
        id='tags'
        onChange={handleChange}
        placeholder='Tags separated by comma'
      />
      <Button type='submit' disabled={loading}>
        Add note
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 10px;
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

export default AddNote;
