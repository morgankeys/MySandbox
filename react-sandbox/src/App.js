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
   flex-direction: column;
   justify-content: center;
   align-items: center;
`

const Input = styled.input`
   height: 40px;
   width: 400px;
   font-size: 32px;
   margin-bottom: 24px;
`

const Suggester = styled.p`
   display: flex;
   flex-direction: column;
   border-radius: 8px;

   button {
      height: 32px;
      font-size: 18px;
      border-radius: 4px;
      background-color: #2D9CDB;
      color: #fff;
      border: none;

      &:active {
         background-color: #2D9CDB44;
      }
   }
`

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         entries: ["hello"],
      }

      this.getSuggestion = this.changeHeight.bind(this)
      this.addToList = this.changeHeight.bind(this)
      this.removeFromList = this.changeHeight.bind(this)
   }

   changeHeight(event) {
      this.setState({ height: event.target.value })
   }

   getSuggestion(event) {
      
   }

   addToList(event) {
      this.setState({ entries: this.state.entries.push(event.target.value) })
   }

   removeFrom

   render() {
      return (
         <Frame>
            <h3>
               Hello world!
           </h3>
            <Suggester>
               <Input type="text" placholder="Type keywords here" />
               <button onClick={this.addToList}>Add to list</button>
            </Suggester>
            <p>
               {this.state.entries.map(word => <p>{word}</p>)}
            </p>
         </Frame>
      );
   }
}

export default App;
