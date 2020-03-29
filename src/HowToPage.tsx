import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import Arrow from './components/icons/ArrowIcon';
import IconButton from './components/IconButton';
import FoodIcon from './components/icons/FoodIcon';
import DragAnimation from './components/icons/DragAnimation';
import Paragraph from './components/Paragraph';
import MoveAnimation from './components/icons/MoveAnimation';
import Gear from './components/icons/GearIcon';

const HowToSection = styled.section<{ reverse?: boolean }>`
  display: flex;
  justify-content: center;
  padding: 0 15rem;
  @media only screen and (max-width: 38rem) {
    flex-direction: ${props => (props.reverse ? 'column-reverse' : 'column')};
    align-items: center;
  }
`;

const HowTo = styled.div`
  width: 100vw;
  margin: 0;
  overflow: hidden;
  overflow-y: auto;
  padding-bottom: 5rem;
  padding-top: 5rem;

  h1 {
    text-align: center;
    letter-spacing: 0.5rem;
  }

  @media only screen and (max-width: 38rem) {
    width: auto;
    margin: 0 2rem;
  }
`;

type Props = {
  toggle: () => void;
};

export default function HowToPage({ toggle }: Props) {
  useEffect(
    () => ReactGA.event({ category: 'Engagement', action: 'Clicked How To' }),
    []
  );

  return (
    <HowTo>
      <IconButton onClick={toggle}>
        <Arrow />
      </IconButton>
      <h1>Objective</h1>
      <HowToSection>
        <Paragraph>
          Ever played{' '}
          <a href="https://en.wikipedia.org/wiki/Snake_(video_game_genre)">
            snake
          </a>
          ? Well this is <em>Snake Cubed</em>. Get it? Cause it's a cube?
          <br />
          <br />
          Anyway, like snake, your goal is to collect as many of these{' '}
          <FoodIcon /> as possible. As you collect more the larger your snake
          grows and if you run into yourself <b>GAME OVER!</b>
        </Paragraph>
      </HowToSection>
      <h1>Controls</h1>
      <HowToSection>
        <DragAnimation />
        <Paragraph>Swipe or drag on the cube to rotate it.</Paragraph>
      </HowToSection>
      <HowToSection reverse>
        <Paragraph>
          Use the &larr; &rarr; keys, <b>A</b> and <b>D</b>, or tap the left and
          right sides of the screen (for mobile) to change the direction of the
          snake.
          <br />
          <br />
          <b>Left</b> and <b>right</b> are tied to the snake's orientation,
          which is important to keep in mind when figuring out which direction
          you want to go.
        </Paragraph>
        <MoveAnimation />
      </HowToSection>
      <HowToSection>
        <Paragraph>
          Click the{' '}
          <span
            style={{ width: '2rem', height: '2rem', display: 'inline-block' }}
          >
            <Gear />
          </span>{' '}
          in the corner for additional game settings!
        </Paragraph>
      </HowToSection>
    </HowTo>
  );
}
