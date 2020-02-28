import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: solid 0.1rem;
  border-bottom-color: rgba(0, 0, 0, 0);
  outline: none;

  transition: border-bottom-color 0.2s ease-in-out;

  &:hover,
  :active,
  :focus {
    border-bottom-color: ${({ theme }) => theme.secondary};
  }
`;

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
};

export default ({ onClick, children }: Props) => (
  <Button onClick={onClick}>{children}</Button>
);
