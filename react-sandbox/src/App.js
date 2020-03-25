import React from 'react';

import styled from 'styled-components'

const Frame = styled.div`
   position: absolute;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   overflow-y: scroll;

   background-color: #444;
   color: #fff;

   display: flex;
   flex-direction: column;
   justify-content: start;
   align-items: center;
`

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         countryData: [],
         usData: [],
      }

      // this.componentDidMount = this.componentDidMount.bind(this)
   }

   componentDidMount() {
      this.getData(this)

   }

   getData() {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = "https://mattblackworld.com/api/countries"; // site that doesn’t send Access-Control-*


      fetch(proxyurl + url)
         .then(response => response.text())
         .then(contents => {
            this.setState({ countryData: JSON.parse(contents) })
            let countryName = "United States of America"

            this.setState({
               usData: this.state.countryData
                  .find(item => Object.keys(item)[0] === countryName)[countryName]
                  .sort((a, b) => { return a.date > b.date ? 1 : -1 })
            })
         })
         .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
   }

   render() {
      return (
         <Frame>
            <h3>
               Hello world!
           </h3>
            <p>Date - Total Deaths - Total Cases</p>
            <div>
               {this.state.usData.map(day =>
                  <div key={day.date}>{day.date}: {day.total_deaths} / {day.total_cases}</div>
               )}
            </div>
         </Frame>
      );
   }
}


export default App;