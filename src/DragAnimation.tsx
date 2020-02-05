import React from 'react';
import styled, { keyframes } from 'styled-components';

const mouseMove = keyframes`
  to {
    transform: translate(13px, -33px) rotate(44deg);
  }
`;

const SVG = styled.svg`
  width: 10rem;

  #arrows {
    opacity: .9;
    path {
      fill: ${({ theme }) => theme.accent};
    }
  }

  #arrow-vertical {
    transform-origin:center;
    transform: rotate(-90deg) scale(.9) translate(7px,13px);
  }

  #cube, #mouse {
    polygon, line {
      stroke: ${({ theme }) => theme.secondary};
    }
  }

  #cube {
    transform: translateY(5px);
  }

  #mouse {
    opacity: .9;
    polygon {
      fill: ${({ theme }) => theme.secondary};
    }
    animation: ${mouseMove} 2s infinite alternate cubic-bezier(.82,0,.24,.99);
  }
`;

export default () => <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 85.27 75.69">
  <g id="cube">
    <g>
      <polygon points="65.96 37.97 43.05 54.25 43.05 22 67.96 8.91 65.96 37.97" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" />
      <polygon points="43.05 54.25 14.76 40.16 11.76 10.51 43.05 22 43.05 54.25" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" />
      <line x1="39.86" y1="0.65" x2="39.86" y2="25.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" />
      <line x1="39.86" y1="0.38" x2="11.76" y2="10.51" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" />
      <line x1="67.96" y1="8.91" x2="39.86" y2="0.38" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" />
      <line x1="39.86" y1="25.52" x2="14.76" y2="39.84" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" />
      <line x1="65.96" y1="37.65" x2="39.86" y2="25.52" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.75" />
    </g>
    <g>
      <path d="M74.85,18l-2,28.49L50.48,62.39V30.78L74.85,18m.28-.43L50.23,30.63V62.88l22.9-16.29,2-29.05Z" transform="translate(-7.17 -8.62)" />
      <path d="M19.22,19.51,50,30.8V62.47L22.17,48.62l-3-29.11m-.28-.38,3,29.66L50.23,62.88V30.63L18.94,19.13Z" transform="translate(-7.17 -8.62)" />
      <line x1="39.86" y1="0.65" x2="39.86" y2="25.52" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" />
      <line x1="39.86" y1="0.38" x2="11.76" y2="10.51" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" />
      <line x1="67.96" y1="8.91" x2="39.86" y2="0.38" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" />
      <line x1="39.86" y1="25.52" x2="14.76" y2="39.84" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" />
      <line x1="65.96" y1="37.65" x2="39.86" y2="25.52" fill="none" stroke="#000" stroke-miterlimit="10" stroke-width="0.25" />
    </g>
  </g>
  <g id="arrows">
    <g id="arrow" opacity="0.7">
      <path d="M85.35,36.34,71.09,39.18l3.63,2.23c-18.26,13.83-38.65,13.85-56.93.07l3.56-2.06L7.17,36.19l7.6,13.22.61-5.08c9.89,7.53,20.36,11.33,30.83,11.33S67.09,51.88,77,44.4l.47,4.93Z" transform="translate(-7.17 -8.62)" fill="#999696" />
    </g>
    <g id="arrow-vertical" opacity="0.7">
      <path d="M85.35,36.34,71.09,39.18l3.63,2.23c-18.26,13.83-38.65,13.85-56.93.07l3.56-2.06L7.17,36.19l7.6,13.22.61-5.08c9.89,7.53,20.36,11.33,30.83,11.33S67.09,51.88,77,44.4l.47,4.93Z" transform="translate(-7.17 -8.62)" fill="#999696" />
    </g>
  </g>
  <g id="mouse">
    <polygon id="mouse-2" data-name="mouse" points="59.44 37.36 59.33 73.32 68.94 60.37 84.89 62.76 59.44 37.36" fill="#fff" stroke="#000" stroke-linejoin="round" stroke-width="0.75" />
  </g>
</SVG>