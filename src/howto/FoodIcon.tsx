import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  display: inline;
  rect {
    fill: ${({ theme }) => theme.secondaryAccent};
  }
`;

export default () => {
  return (
    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="25" height="25">
      <rect width="10" height="10"></rect>
    </SVG>
  )
}