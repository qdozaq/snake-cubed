import styled from 'styled-components';

const Paragraph = styled.p`
  margin: 1rem 0;
  width: 100%;
  font-size: 1.2rem;

  a {
    color: ${({ theme }) => theme.secondaryAccent}
  }
`;

export default Paragraph;