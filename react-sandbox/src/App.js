import React from 'react';
import logo from './logo.svg';

import styled from 'styled-components'

import {ReactComponent as Twitter} from "./logos/Twitter-Gray.svg"
import {ReactComponent as X} from "./logos/X-Gray.svg"

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

const MarqueeIcon = styled.div`
   width: 256px;
   height: 256px;
   
   overflow: clip;

   div {
      display: inline-div;
      width: 200%;
      
      // @keyframes slide{
      //    start { transform: translateX(0%); }
      //    50% { transform: translateX(0%); }
      //    75% { transform: translateX(-50%); }
      //    end { transform: translateX(0%); }
      // }

      // animation: slide 4s ease-in-out infinite;

      &:hover { 
         @keyframes slide {
            start { transform: translateX(0%); }
            30% { transform: translateX(-50%); }
            50% { transform: translateX(0%); }
            end { transform: translateX(0%); }
         }
         animation: slide 2s ease-in-out infinite;
      }
   }

   svg {
      height: 50%;
      width: 50%;
      
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
           <MarqueeIcon>
            {/* <div><Twitter/></div>
            <div><X/></div> */}
            <div>
               <X/>
               <Twitter/>
            </div>
           </MarqueeIcon>
     </Frame>
  );
}
}

export default App;
