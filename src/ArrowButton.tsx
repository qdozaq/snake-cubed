import React from 'react';
import styled from 'styled-components';

const Arrow = () =>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 517" width="35">
    <path d="M282 508q9-9 9-22.5t-9-22.5L110 291h882q13 0 22.5-9.5t9.5-22.5-9.5-22.5T992 227H109L281 55q10-9 10-22.5T281 10q-9-10-22.5-10T236 10L9 236q-9 9-9 22.5T9 281l228 227q9 9 22.5 9t22.5-9z" />
  </svg>

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: solid .1rem;
  border-bottom-color: rgba(0,0,0,0);
  outline: none;

  transition: border-bottom-color .2s ease-in-out;

  &:Hover,:active,:focus {
    border-bottom-color: rgba(0,0,0,1);
  }
`;

type Props = {
  onClick?: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
}

export default ({ onClick }: Props) => <Button onClick={onClick}><Arrow /></Button>