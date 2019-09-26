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
   flex-flow: column wrap;
   justify-content: start;
   align-items: center;
   padding-top: 15%;
`

const TopLine = styled.div`
   font-weight: 700;
   font-size: 16px;
   line-height: 20px;
`

const BottomLine = styled.div`
   font-weight: normal;
   font-size: 14px;
   line-height: 18px;
`

const Cell = styled.div`
   border: 1px solid #fff;
   padding: 0 16px;
   width: 300px;
   height: ${props => props.height}px;
   display: flex;
   flex-flow: column wrap;
   justify-content: center;
   align-items: baseline;
   align-content: flex-start;
   

   * {
      margin-right: 12px;
   }
`

const Instructions = styled.div`
   display: flex;
   justify-content: center;
   align-content: center;
   flex-direction: column;
   align-items: center;
   margin-bottom: 32px;

   input {
      font-size: 24px;
      width: 100px;
      text-align: center;
   }

   
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
        <Instructions>
           <h3>
              Change the height to see how the text transforms
           </h3>
           <p>Height:</p>
           <input type="number" value={this.state.height} onChange={this.changeHeight}/>
        </Instructions>
        <div>
           <Cell height={this.state.height}>
              <TopLine>Morgan Keys</TopLine>
              <BottomLine>Product Designer</BottomLine>
           </Cell>
        </div>
     </Frame>
  );
}
}

export default App;
