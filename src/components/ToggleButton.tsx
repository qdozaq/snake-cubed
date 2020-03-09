import React, { useEffect, useContext, useRef } from 'react';
import styled, { ThemeContext } from 'styled-components';

/**
 * From https://codepen.io/mburnette/pen/LxNxNg
 */
type ToggleProps = {
  toggle: (val: boolean) => void;
};

export default ({ toggle }: ToggleProps) => {
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
      <Label htmlFor="switch">Toggle</Label>
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
