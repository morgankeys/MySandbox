import React from 'react';
import logo from './logo.svg';

import styled from 'styled-components'

const colors = {
  "NAVY": "#001f3f",
  "BLUE": "#0074D9",
  "AQUA": "#7FDBFF",
  "TEAL": "#39CCCC",
  "OLIVE": "#3D9970",
  "GREEN": "#2ECC40",
  "LIME": "#01FF70",
  "YELLOW": "#FFDC00",
  "ORANGE": "#FF851B",
  "RED": "#FF4136",
  "MAROON": "#85144b",
  "FUCHSIA": "#F012BE",
  "PURPLE": "#B10DC9",
  "BLACK": "#111111",
  "GRAY": "#AAAAAA",
  "SILVER": "#DDDDDD",
}

function getRandomColorIndex() {
  return Math.floor(Math.random() * (15)); //The maximum is inclusive and the minimum is inclusive 
}

function getRandomHeight() {
  return Math.floor(Math.random() * 200 + 20); //The maximum is inclusive and the minimum is inclusive 
}

const Frame = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;

   background-color: #fff;
   color: #191919;

   display: flex;
   flex-flow: row wrap;
   justify-content: start;
   align-items: baseline;
   align-content: start;
   overflow: scroll;
   padding: 48px;
`

const Box = styled.div`
  height: ${props => props.height}px;
  width: 200px;
  background-color: ${props => Object.values(colors)[props.colorIndex]};
  margin: 30px;
  display: flex;

  justify-content: center;
  align-content: center;
  align-items: center;
`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }


  render() {
    return (
      <Frame>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
        <Box colorIndex={getRandomColorIndex()} height={getRandomHeight()}><p>Cat</p></Box>
      </Frame>
    );
  }
}

export default App;