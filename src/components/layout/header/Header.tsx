import React from 'react';
import styled from '@emotion/styled';

const Div = styled.div`
  padding: 10px 15px;
  background-color: #2993ff;
  border-bottom: 1px solid black;
  box-shadow: 0px -2px 10px 1px;
  font-family: Arial, Helvetica, sans-serif;
`;

const H1 = styled.h1`
  max-width: 75%;
  margin: 0 auto;
`;

const Header = () => {
  return (
    <Div>
      <H1>Notes</H1>
    </Div>
  );
};

export default Header;
