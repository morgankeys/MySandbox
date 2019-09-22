import React from 'react';
import logo from './logo.svg';

import styled from 'styled-components'

const Frame = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #444;
  color: #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: ${props => props.color}
`
const TopLine = styled.div`
  font-weight: bold;
  line-height: 22px;
  font-size: 16px;
`
const BottomLine = styled.div`
  font-weight: normal;
  line-height: 19px;
  font-size: 14px;
`

const Cell = styled.div`
  border: 1px solid #fff;
  padding: 0 8px;
  width: ${props => props.width}
  height: ${props => props.height}
  display: flex;
  justify-content: center;
  align-content: start;
  flex-flow: column wrap;

  * {
    margin-right: 12px;
  }
`

function App() {
  return (
    <Frame>
      <Cell width="500px" height="20px">
        <TopLine>Morgan Keys</TopLine>
        <BottomLine>Desigineer Extrodinaire</BottomLine>
      </Cell>
    </Frame>
  );
}

export default App;
