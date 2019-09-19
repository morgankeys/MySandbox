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


function App() {
  return (
    <Frame>
      Hello world!
    </Frame>
  );
}

export default App;
