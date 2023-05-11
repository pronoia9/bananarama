import { styled } from 'styled-components';

import BananaSketch from './BananaSketch';

export default function Overlay() {
  return (
    <Container>
      <Title>
        Banana
        <br />
        Bliss
      </Title>
      <Hamburger></Hamburger>
      <Description></Description>
      <Poem></Poem>
      <Sketch>
        <BananaSketch />
      </Sketch>
    </Container>
  );
}

const Container = styled.div``;

const Title = styled.div``;

const Hamburger = styled.div``;

const Description = styled.div``;

const Poem = styled.div``;

const Sketch = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0) rotate(0deg);
  width: 75%;
  height: 75%;
  & g.skin {
    cursor: pointer;
  }
`;
