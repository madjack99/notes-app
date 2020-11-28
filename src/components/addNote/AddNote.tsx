import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import styled from '@emotion/styled';
import { useStore } from 'effector-react';

import { addNote } from '../../stores/notes';
import { $loading, startLoading, stopLoading } from '../../stores/loading';

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

const AddNote = () => {
  let [content, setContent] = useState('');
  let [tags, setTags] = useState('');

  const loading = useStore($loading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const { name } = e.target;
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

    let noteTags: string[];
    if (tags === '') {
      noteTags = [];
    } else {
      noteTags = tags.split(',').map((tag) => tag.trim());
    }

    const newNote = {
      id: uuidv4(),
      tags: noteTags,
      pinned: false,
      content,
    };

    setTimeout(() => {
      stopLoading();
      addNote(newNote);
    }, 1000);

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

export default AddNote;
