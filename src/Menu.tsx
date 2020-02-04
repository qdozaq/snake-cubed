import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export const MenuButton = styled.button<{ clicked?: boolean }>`
  border: none;
  background: none;
  font-size: 3rem;
  line-height: 4rem;
  outline: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  transition: color .3s ease-out,
              text-decoration .3s ease-out,
              letter-spacing 1s cubic-bezier(.02,1,.29,.95);
  color: ${({ theme }) => theme.menuButton}; 

  &:focus{
    text-decoration: underline ${({ theme }) => theme.menuButton};
  }

  &:hover {
    color: ${({ theme }) => theme.menuButtonHover};
    text-decoration: underline ${({ theme }) => theme.menuButtonHover};
  }

  ${({ clicked }) => clicked && `letter-spacing: .8rem`}
`;

const Container = styled.div`
  top:0;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;

  &.menu-exit {
    opacity: 1;
    pointer-events: none;
  }

  &.menu-exit-active{
    opacity: 0;
    transition: opacity 1s;
  }

  &.menu-enter {
    opacity: 0;
    pointer-events: initial;
    transform: scale(.8);
  }

  &.menu-enter-active{
    opacity: 1;
    transform: scale(1);
    transition: opacity .8s cubic-bezier(.13,.87,.32,.95),
                transform .8s cubic-bezier(.13,.87,.32,.95);
  }

`;

type Props = {
  show: boolean;
  children: ReactNode;
}

export const MenuContainer = ({ show, children }: Props) =>
  <CSSTransition in={show} timeout={1500} classNames='menu' unmountOnExit>
    <Container>
      {children}
    </Container>
  </CSSTransition>
