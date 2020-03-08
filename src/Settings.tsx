import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Gear from './components/icons/GearIcon';
import IconButton from './components/IconButton';

const IconContainer = styled.div`
  position: fixed;
  top: 0;
  margin: 0.5rem;
`;

const SettingsContainer = styled.div`
  position: absolute;
  left: 3rem;
  top: 1.5rem;
  /* transform: translate(3rem, 1.5rem); */
  width: auto;
  height: auto;
  padding: 1rem;
  background: ${({ theme }) => theme.secondary};
  border-radius: 5px;
  box-shadow: 3px 3px 16px 3px rgba(0, 0, 0, 0.3);
  /* background: #222; */

  transform-origin: top left;
  transition: transform 200ms cubic-bezier(0.13, 0.87, 0.32, 0.95);

  &.settings-exit {
    pointer-events: none;
    transform: scale(1);
  }

  &.settings-exit-active {
    transform: scale(0);
  }

  &.settings-enter {
    transform: scale(0);
  }

  &.settings-enter-active {
    transform: scale(1);
  }
`;

const SettingLabel = styled.p`
  color: white;
  margin: 0;
`;

export default () => {
  const [toggle, setToggle] = useState(true);
  const gearRef = useRef<SVGElement>();
  const settingsRef = useRef() as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    const close = ({ target }: MouseEvent) => {
      if (
        !gearRef?.current?.contains(target as Node) &&
        !settingsRef?.current?.contains(target as Node)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener('click', close);

    return () => document.removeEventListener('click', close);
  }, []);

  return (
    <>
      <IconContainer>
        <IconButton underline={false} onClick={() => setToggle(!toggle)}>
          <Gear gearRef={gearRef} />
        </IconButton>
      </IconContainer>
      <CSSTransition
        in={toggle}
        classNames="settings"
        timeout={200}
        unmountOnExit
      >
        <SettingsContainer ref={settingsRef}>
          <SettingLabel>Theme</SettingLabel>
          <Toggle />
          <SettingLabel>Cube Size</SettingLabel>
          <SettingLabel>Speed</SettingLabel>
        </SettingsContainer>
      </CSSTransition>
    </>
  );
};

/**
 * From https://codepen.io/mburnette/pen/LxNxNg
 */
const Toggle = () => {
  return (
    <>
      <Input type="checkbox" id="switch" />
      <Label
        //@ts-ignore
        for="switch"
      >
        Toggle
      </Label>
    </>
  );
};

const Input = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Label = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: 200px;
  height: 100px;
  background: black;
  display: block;
  border-radius: 100px;
  position: relative;

  ${Input}:checked + & {
    background: ${({ theme }) => theme.primary};
  }

  ${Input}:checked + &:after {
    left: calc(100% - 5px);
    transform: translateX(-100%);
  }

  &:after {
    content: '';
    position: absolute;
    top: 5px;
    left: 5px;
    width: 90px;
    height: 90px;
    background: #fff;
    border-radius: 90px;
    transition: 0.3s;
  }

  &:active:after {
    width: 130px;
  }
`;
