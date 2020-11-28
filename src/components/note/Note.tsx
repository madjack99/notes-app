import React from 'react';

interface INote {
  content: string;
}

const Note = ({ content }: INote) => {
  return <div>{content}</div>;
};

export default Note;
