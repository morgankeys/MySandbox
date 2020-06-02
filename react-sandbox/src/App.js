import React from "react";
import styled from "styled-components";

const Frame = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  background-color: #444;
  color: #fff;

  padding-top:32px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
`;


const ToFieldOpen = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: flex-start;

  border: 1px solid #fff;
  width: 80%;
  max-height: 400px;

  padding: 16px;
  overflow-x: scroll;
  margin-bottom: 32px;
`;

const Addressee = styled.p`
  margin: 0 8px 16px 0;
  padding: 4px;
  background-color: #ffffff11;
  width: 30%;
  word-wrap: break-word;
  min-width: 240px;
  max-width: 300px;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolderValue: 0
    };

    this.placeHolderFunction = this.placeHolderFunction.bind(this);
  }

  placeHolderFunction(event) {
    this.setState({ height: event.target.value });
  }

  render() {
    let list = [];

    for (let i = 1; i <= 29; i++) {
      list.push(`Bid Package Name ${i}`);
    }
    console.log(list);

    return (
      <Frame>
         <h1>Wrapping the recipient field</h1>

        <ToFieldOpen>
          <Addressee style={{height:'280px'}}>Expanded Bid Package</Addressee>
          <Addressee>Bid Package name, which should wrap when it is very long...</Addressee>
          {list.map((name, index) => (
            <Addressee key={index}>{name}</Addressee>
          ))}
        </ToFieldOpen>

      </Frame>
    );
  }
}

export default App;



{/* <ToFieldGrid>
{list.map((name, index) => (
  <AddresseeGrid key={index}>{name}</AddresseeGrid>
))}
</ToFieldGrid> */}