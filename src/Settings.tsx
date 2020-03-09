import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import Gear from './components/icons/GearIcon';
import IconButton from './components/IconButton';
import Range from './components/RangeSlider';
import Toggle from './components/ToggleButton';

const IconContainer = styled.div`
  position: fixed;
  top: 0;
  margin: 0.5rem;
  width: 2rem;
  height: 2rem;
`;

const SettingsContainer = styled.div`
  position: absolute;
  color: white;
  left: 3rem;
  top: 1.5rem;
  width: auto;
  height: auto;
  padding: 1rem;
  background: #000;
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

const ThemeToggle = styled.span`
  font-weight: 200;
  display: inline-flex;
`;

type Props = {
  toggleTheme: (val: boolean) => void;
  size: number;
  handleSize: (e: ChangeEvent<HTMLInputElement>) => void;
  speed: number;
  handleSpeed: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default ({
  toggleTheme,
  handleSize,
  handleSpeed,
  size,
  speed
}: Props) => {
  const [toggle, setToggle] = useState(true);

  // For closing when clicking outside settings. Disabled for now
  // const gearRef = useRef<SVGElement>();
  // const settingsRef = useRef() as React.RefObject<HTMLDivElement>;

  // useEffect(() => {
  //   const close = ({ target }: MouseEvent) => {
  //     if (
  //       !gearRef?.current?.contains(target as Node) &&
  //       !settingsRef?.current?.contains(target as Node)
  //     ) {
  //       setToggle(false);
  //     }
  //   };

  //   document.addEventListener('click', close);

  //   return () => document.removeEventListener('click', close);
  // }, []);

  return (
    <>
      <IconContainer>
        <IconButton underline={false} onClick={() => setToggle(!toggle)}>
          <Gear />
        </IconButton>
      </IconContainer>
      <CSSTransition
        in={toggle}
        classNames="settings"
        timeout={200}
        unmountOnExit
      >
        <SettingsContainer>
          <SettingLabel>Theme</SettingLabel>
          <ThemeToggle>
            Light <Toggle toggle={toggleTheme} /> Dark
          </ThemeToggle>
          <SettingLabel>Cube Size</SettingLabel>
          <Range value={size} update={handleSize} min={1} max={20} />
          <SettingLabel>Speed</SettingLabel>
          <Range value={speed} update={handleSpeed} min={1} max={20} />
        </SettingsContainer>
      </CSSTransition>
    </>
  );
};
