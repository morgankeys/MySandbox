import React from 'react';
import logo from './logo.svg';
import codes from './csi-codes.js';

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
   font-size: 28px;
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
         currentValue: '',
      }

      this.getSuggestion = this.getSuggestion.bind(this)
      this.addToList = this.addToList.bind(this)
      this.removeFromList = this.removeFromList.bind(this)
      this.handleChange = this.handleChange.bind(this)
   }

   getSuggestion(event) {

   }

   addToList(event) {
      if(this.state.currentValue !== '') {
         this.setState({
            entries: [...this.state.entries, this.state.currentValue],
            currentValue: ''
         })
         console.log(this.state.entries)
      }
      
   }

   removeFromList(event) {

   }

   handleChange(event) {
      this.setState({ currentValue: event.target.value })
   }

   render() {
      let list = this.state.entries

      return (
         <Frame>
            <h3>
               Hello world!
           </h3>
            <Suggester>
               <Input
                  type="text"
                  placeholder="Type keywords here"
                  value={this.state.currentValue}
                  onChange={this.handleChange} 
                  onSubmit={this.addToList}
                  />
               <button onClick={this.addToList}>Add to list</button>
            </Suggester>
            <div>
               {list.map((word) => <p key={word}>{word}</p>)}
            </div>
         </Frame>
      );
   }
}

export default App;
