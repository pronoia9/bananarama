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
      <Hamburger>
        <div />
        <div />
        <div />
      </Hamburger>
      <Description>
        The fruitiest place on the web
        <br />
        Where every day is a-peeling
      </Description>
      <Poem>
        Peel the skin away,
        <br /> Reveal the yellow inside,
        <br />
        Bananas are a snack,
        <br />
        That you just can't hide.
        <br />
        <br />
        Add them to your cereal,
        <br />
        Or top them with some cream,
        <br />
        Bananas are a treat,
        <br />
        That's always in your dream.
      </Poem>
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
