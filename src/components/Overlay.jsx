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

const Container = styled.div`
  font-family: 'Inter';
  font-size: 16px;
  & h1 {
    padding: 0;
    margin: 0 0 0.05em 0;
    font-weight: 400;
    font-size: min(18vw, 14em);
    line-height: 0.85em;
  }
`;

const Title = styled.h1`
  position: absolute;
  top: 5vw;
  left: 5vw;
`;

const Hamburger = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 5vw;
  right: 5vw;
  & > div {
    position: relative;
    width: 24px;
    height: 2px;
    background: #252525;
    margin-bottom: 6px;
  }
`;

const Description = styled.div`
  position: absolute;
  bottom: 5vw;
  left: 5vw;
  width: 30ch;
  max-width: 40%;
`;

const Poem = styled.div`
  position: absolute;
  bottom: 5vw;
  right: 5vw;
  width: 35ch;
  max-width: 40%;
  line-height: 1em;
  letter-spacing: -0.01em;
  text-align: right;
`;

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
