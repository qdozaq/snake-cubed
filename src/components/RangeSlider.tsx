import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

type RangeProps = {
  value: number;
  update: (e: ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
};

// from https://codepen.io/-J0hn-/pen/MOMjQp
export default ({ value, update, min, max }: RangeProps) => {
  return (
    <RangeContainer>
      <RangeInput
        type="range"
        value={value.toString()}
        min={min.toString()}
        max={max.toString()}
        step="1"
        onChange={update}
      />
      <Output>{value}</Output>
    </RangeContainer>
  );
};

const uiColor = ({ theme }) =>
  theme.name === 'dark' ? theme.secondary : 'white';

const RangeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

const Output = styled.span`
  background: ${uiColor};
  color: #111;
  border-radius: 2px;
  padding: 3px 7px;
  margin: 0px 10px;
  text-align: center;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: -12px;
    top: 50%;
    transform: translateY(-50%);
    height: 0;
    width: 0;
    border: solid 6px ${uiColor};
    z-index: -1;
    border-top-color: white;
    border-bottom-color: white;
    border-left-color: white;
  }
`;

const RangeInput = styled.input`
  -webkit-appearance: none;
  outline: none;
  background: ${uiColor};
  height: 2px;
  width: 10rem;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: ${uiColor};
  }

  /* FIREFOX */
  &::-moz-range-thumb {
    border: none;
    height: 14px;
    width: 14px;
    border-radius: 50%;
    background: ${uiColor};
    cursor: pointer;
  }

  &::-moz-range-track {
    width: 100%;
    height: 3px;
    cursor: pointer;
    background: ${uiColor};
    border-radius: 5px;
  }
`;
