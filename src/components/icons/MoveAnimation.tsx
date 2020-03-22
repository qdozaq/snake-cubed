import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const INITIAL_OPACITY = 0.3;

const snakeKeyframes = (n: number) => {
  // 4 = number of cubes in rotation
  const percent = (n / 4) * 100;
  const last = n > 3 ? 12 : 0;
  return keyframes`
    ${percent - 25}% {
      opacity: ${INITIAL_OPACITY};
    }
    ${percent - 24}% {
      opacity: 1;
    }
    ${percent - 1 - last}% {
      opacity: 1;
    }
    ${percent - last}% {
      opacity: ${INITIAL_OPACITY};
    }
  `;
};

const ANIMATION_LENGTH = 4;

const snakeAnimation = (n: number) => {
  return n <= 3
    ? css`
        #_${n} {
          animation: ${snakeKeyframes(n)} ${ANIMATION_LENGTH}s infinite linear;
        }
      `
    : n === 4
    ? css`
        #_${n} {
          animation: ${snakeKeyframes(n)} ${ANIMATION_LENGTH * 2}s -3s infinite linear;
        }
      `
    : css`
        #_${n} {
          animation: ${snakeKeyframes(n - 1)} ${ANIMATION_LENGTH * 2}s 1s
            infinite linear;
        }
      `;
};

const SVG = styled.svg`
  width: 16rem;

  #cubes {
    rect {
      fill: ${({ theme }) => theme.accent}
    }
    g {
      opacity: ${INITIAL_OPACITY};
    }

    ${snakeAnimation(1)}
    ${snakeAnimation(2)}
    ${snakeAnimation(3)}
    ${snakeAnimation(4)}
    ${snakeAnimation(5)}
  }

  #left, #right {
    opacity: ${INITIAL_OPACITY};
    fill: ${({ theme }) => theme.secondary}
  }

  #left {
    animation: ${snakeKeyframes(4)} ${ANIMATION_LENGTH *
  2}s -3s infinite linear;
  }

  #right {
    animation: ${snakeKeyframes(4)} ${ANIMATION_LENGTH * 2}s 1s infinite linear;
  }
`;

export default () => (
  <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 189.94 86">
    <g id="cubes">
      <g id="_5" data-name="5">
        <rect x="60" y="60" width="26" height="26" rx="3.5" fill="#f93e3e" />
      </g>
      <g id="_4" data-name="4">
        <rect x="60" width="26" height="26" rx="3.5" fill="#f93e3e" />
      </g>
      <g id="_3" data-name="3">
        <rect x="60" y="30" width="26" height="26" rx="3.5" fill="#f93e3e" />
      </g>
      <g id="_2" data-name="2">
        <rect x="30" y="30" width="26" height="26" rx="3.5" fill="#f93e3e" />
      </g>
      <g id="_1" data-name="1">
        <rect y="30" width="26" height="26" rx="3.5" fill="#f93e3e" />
      </g>
    </g>
    <g id="left">
      <text transform="translate(100.25 33.04)" font-size="29">
        LEFT
      </text>
    </g>
    <g id="right">
      <text transform="translate(100.25 72.04)" font-size="29">
        RIGHT
      </text>
    </g>
  </SVG>
);
