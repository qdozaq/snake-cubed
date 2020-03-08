import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export const MenuButton = styled.button<{ clicked?: boolean }>`
  border: none;
  background: none;
  font-size: 3rem;
  line-height: 4rem;
  outline: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  white-space: nowrap;

  transition: color 0.3s ease-out, text-decoration 0.3s ease-out,
    letter-spacing 1s cubic-bezier(0.02, 1, 0.29, 0.95);
  color: ${({ theme }) => theme.secondaryFaded};

  &:focus {
    text-decoration: underline ${({ theme }) => theme.secondaryFaded};
  }

  &:hover {
    color: ${({ theme }) => theme.secondary};
    text-decoration: underline ${({ theme }) => theme.secondary};
  }

  ${({ clicked }) => clicked && `letter-spacing: .8rem`}
`;

const Container = styled.div`
  top: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  text-align: center;

  &.menu-exit {
    opacity: 1;
    pointer-events: none;
  }

  &.menu-exit-active {
    opacity: 0;
    transition: opacity 1s;
  }

  &.menu-enter {
    opacity: 0;
    pointer-events: initial;
    transform: scale(0.8);
  }

  &.menu-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: opacity 0.8s cubic-bezier(0.13, 0.87, 0.32, 0.95),
      transform 0.8s cubic-bezier(0.13, 0.87, 0.32, 0.95);
  }
`;

type Props = {
  show: boolean;
  children: ReactNode;
};

export const MenuContainer = ({ show, children }: Props) => (
  <CSSTransition in={show} timeout={1500} classNames="menu" unmountOnExit>
    <Container>{children}</Container>
  </CSSTransition>
);
