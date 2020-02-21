import React, { useEffect } from 'react';
import styled from 'styled-components';
import ReactGA from 'react-ga';

import Arrow from '../components/ArrowButton';
import FoodIcon from '../components/FoodIcon';
import DragAnimation from '../components/DragAnimation';
import Paragraph from '../components/Paragraph';
import MoveAnimation from '../components/MoveAnimation';

const HowToSection = styled.section<{ reverse?: boolean }>`
  display: flex;
  justify-content: center;
  @media only screen and (max-width:38rem) {
    flex-direction: ${props => props.reverse ? 'column-reverse' : 'column'};
    align-items: center;
  }
`;

const HowTo = styled.div`
  width: 35rem;
  margin:0; 

  h1 {
    text-align: center;
    letter-spacing: .5rem;
  }

  @media only screen and (max-width:38rem) {
    width: auto;
    margin: 0 2rem;
    padding-bottom: 5rem;
    padding-top: 5rem;
    overflow: hidden;
    overflow-y: auto;
  }
`;

type Props = {
  toggle: () => void;
}

export default function HowToPage({ toggle }: Props) {
  useEffect(() => ReactGA.event({ category: 'Engagement', action: 'Clicked How To' }), []);

  return (
    <HowTo>
      <Arrow onClick={toggle} />
      <h1>Objective</h1>
      <Paragraph>
        Ever played <a href="https://en.wikipedia.org/wiki/Snake_(video_game_genre)">snake</a>?
        Well this is <em>Snake Cubed</em>. Get it? Cause it's a cube?
        <br />
        <br />
        Anyway, like snake, your goal is to collect as many of these <FoodIcon /> as possible.
        As you collect more the larger your snake grows and if you run into yourself <b>GAME OVER!</b>
      </Paragraph>
      <h1>Controls</h1>
      <HowToSection>
        <DragAnimation />
        <Paragraph>
          Swipe or drag on the cube to rotate it.
        </Paragraph>
      </HowToSection>
      <HowToSection reverse>
        <Paragraph>
          Use the &larr; &rarr; keys, <b>A</b> and <b>D</b>, or tap the left and right sides of the screen (for mobile) to change the direction of the snake.
          <br />
          <br />
          <b>Left</b> and <b>right</b> are tied to the snake's orientation, which is important to keep in mind when figuring out which direction you want to go.
        </Paragraph>
        <MoveAnimation />
      </HowToSection>
    </HowTo>
  )
}