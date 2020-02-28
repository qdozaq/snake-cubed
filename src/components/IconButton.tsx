import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button<{ underline: boolean }>`
  cursor: pointer;
  background: none;
  border: none;
  border-bottom: solid 0.1rem;
  border-bottom-color: rgba(0, 0, 0, 0);
  outline: none;

  transition: border-bottom-color 0.2s ease-in-out;

  ${({ underline }) =>
    underline &&
    css`
      &:hover,
      :active,
      :focus {
        border-bottom-color: ${({ theme }) => theme.secondary};
      }
    `}
`;

type Props = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  underline?: boolean;
  children: ReactNode;
};

export default ({ onClick, underline = true, children }: Props) => (
  <Button onClick={onClick} underline={underline}>
    {children}
  </Button>
);
