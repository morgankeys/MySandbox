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

class App extends React.Component {
  constructor(props) {
     super(props)
     this.state = {
        height: 40
     }
     
     this.changeHeight = this.changeHeight.bind(this)
  }
  
  changeHeight(event) {
     this.setState({height: event.target.value})
  }
  
  render() {
     return (
     <Frame>
           <h3>
              Hello world!
           </h3>
     </Frame>
  );
}
}

export default App;
