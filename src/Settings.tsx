import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
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
  color: white;
  left: 3rem;
  top: 1.5rem;
  width: auto;
  height: auto;
  padding: 1rem;
  background: #111;
  border-radius: 5px;
  box-shadow: 3px 3px 16px 3px rgba(0, 0, 0, 0.3);

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

const SettingLabel = styled.h4`
  color: white;
  margin: 0.5rem 0;
`;

type Props = {
  toggleTheme: (val: boolean) => void;
};

export default ({ toggleTheme }: Props) => {
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
          <ThemeToggle>
            Light <Toggle toggle={toggleTheme} /> Dark
          </ThemeToggle>
          <SettingLabel>Cube Size</SettingLabel>
          <SettingLabel>Speed</SettingLabel>
        </SettingsContainer>
      </CSSTransition>
    </>
  );
};

const ThemeToggle = styled.span`
  font-weight: 200;
  display: inline-flex;
`;

/**
 * From https://codepen.io/mburnette/pen/LxNxNg
 */
type ToggleProps = {
  toggle: (val: boolean) => void;
};

const Toggle = ({ toggle }: ToggleProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const { name } = useContext(ThemeContext);

  useEffect(() => {
    if (ref.current) {
      ref.current.checked = name === 'dark';
    }
  }, []);

  return (
    <>
      <Input
        ref={ref}
        type="checkbox"
        id="switch"
        onChange={() => {
          if (ref && ref.current) {
            toggle(ref.current.checked);
          }
        }}
      />
      <Label
        //@ts-ignore
        for="switch"
      >
        Toggle
      </Label>
    </>
  );
};

const size = 3;

const Input = styled.input`
  height: 0;
  width: 0;
  /* visibility: hidden; */
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
  text-indent: -9999px;
  width: ${size}rem;
  height: ${size / 2}rem;
  background: #222;
  display: block;
  border-radius: 50px;
  position: relative;
  margin: 0 0.25rem;

  ${Input}:checked + & {
    background: #ff80ae;
  }

  ${Input}:checked + &:after {
    left: calc(100% - 2.5px);
    transform: translateX(-100%);
  }

  &:after {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    width: ${size / 2 - 0.1}rem;
    height: ${size / 2 - 0.1}rem;
    background: #fff;
    border-radius: ${size / 2 - 0.1}rem;
    transition: 0.3s;
  }

  &:active:after {
    width: ${size / 1.5}rem;
  }
`;
