import React from "react";
import logo from "./logo.svg";
import patternVertical from "./patterns/vertical.svg";
import patternHorizontal from "./patterns/horizontal.svg";
import patternDiagonalA from "./patterns/diagonal-A.svg";
import patternDiagonalB from "./patterns/diagonal-B.svg";

import styled from "styled-components";

const colors = {
  red: {
   light: "#FFE4DE",
   dark: "#FF937B",
   pattern: patternVertical,
   repeatX: "repeat",
   repeatY: "no-repeat",
   backgroundSize: "16px 46px",
  },
  yellow: {
   light: "#FEF6D4",
   dark: "#FAE06C",
   pattern: patternHorizontal,
   repeatX: "no-repeat",
   repeatY: "repeat",
   backgroundSize: "209px 16px",
  },
  green: {
   light: "#EBF5E0",
   dark: "#B5D98B",
   pattern: patternDiagonalA,
   repeatX: "repeat",
   repeatY: "no-repeat",
   backgroundSize: "auto auto",
  },
  blue: {
   light: "#DEF2F9",
   dark: "#84CFE6",
   pattern: patternDiagonalB,
   repeatX: "repeat",
   repeatY: "no-repeat",
   backgroundSize: "auto auto",
  },
  purple: {
   light: "#EFE6FC",
   dark: "#C5A3F4",
  },
};

const Frame = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #fff;
  color: #444;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-content: center;
  flex-wrap: wrap;

  height: 600px;
  width: 100%;
`;

const Cell = styled.div`
  height: 46px;
  width: 290px;
  border-top: #ccc;
  border-bottom: #ccc;
  ${(props) => `
   background: url(${props.color.pattern}) ${props.color.light};
   // background-repeat-x: ${props.color.repeatX};
   // background-repeat-y: ${props.color.repeatY};
   // background-size: ${props.color.backgroundSize};
  `}

  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 4px;

  font-family: "Proxima Nova";
  font-weight: 300;
  font-size: 16px;
  color: #191919;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 40,
    };

    this.changeHeight = this.changeHeight.bind(this);
  }

  changeHeight(event) {
    this.setState({ height: event.target.value });
  }

  render() {
    const keys = Object.keys(colors);
    let generateCells = [];

    for (let i = 0; i < 33; i++) {
      let rando = Math.floor(Math.random() * 5);
      generateCells.push(colors[keys[rando]]);
    }

    return (
      <Frame>
        <Wrap>
          {generateCells.map((colorCode, key) => {
            return <Cell key={key} color={colorCode} >$10,000</Cell>;
          })}
        </Wrap>
      </Frame>
    );
  }
}

export default App;
