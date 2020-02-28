import React from 'react';
import styled from 'styled-components';

import Gear from './components/icons/GearIcon';
import IconButton from './components/IconButton';

const IconContainer = styled.div`
  position: fixed;
  top: 0;
  margin: 0.5rem;
`;

export default () => {
  return (
    <IconContainer>
      <IconButton underline={false}>
        <Gear />
      </IconButton>
    </IconContainer>
  );
};
