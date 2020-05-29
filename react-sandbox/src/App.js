import React from "react";
import logo from "./logo.svg";

import styled from "styled-components";

const Frame = styled.div`
  font-size: 16px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #666;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

const Block = styled.div`
  background-color: #fddaa4;
  height: 100%;
  width: 500px;
  border-radius: 4px;
`;

const Code = styled.div`
  background-color: transparent;
  font-family: monospace;
  color: #fff;
  height: fit-content;
  width: 250px;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 16px 32px 0;
`;

const Figma = styled.div`
  background-color: transparent;
  font-family: sans-serif;
  color: #fff;
  height: fit-content;
  width: 250px;
  position: absolute;
  top: 0;
  left: 0;
  padding: 0 0 32px 16px;
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
    return (
      <Frame>
        <Block />
        <Code>
          <h3>CSS</h3>
          <h4>Frame:</h4>
          <div>display: flex;</div>
          <div>justify-content: center;</div>
          <div>align-items: center;</div>
          <h4>Child:</h4>
          <div>height: 100%;</div>
          <div>width: 500px;</div>
        </Code>
        <Figma>
          <h3>Figma</h3>
          <h4>Inner rectangle:</h4>
          <div>L-R: Center</div>
          <div>T-B: Top & Bottom</div>
        </Figma>
      </Frame>
    );
  }
}

export default App;
