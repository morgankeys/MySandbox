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

// const ToFieldGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 33%);
//   grid-template-rows: repeat(auto-fit, 46px);
//   grid-auto-flow: column;
//   grid-auto-rows: min(46px);

//   border: 1px solid #fff;
//   width: 60%;
//   min-height: 400px;

//   padding: 16px;
//   margin-bottom: 32px;
// `;

// const AddresseeGrid = styled.p`
//   margin: 0 8px 8px 8px;
//   padding: 6px;
//   background-color: #ffffff11;
//   word-wrap: break-word;
//   max-height: 100px;
// `;

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
    let list = ['Company Name is looooooooooooooooooooooooooooooooooooooooooooooooooooooooooong 0'];

    for (let i = 1; i <= 29; i++) {
      list.push(`Company Name ${i}`);
    }
    console.log(list);

    return (
      <Frame>
         <h1>Wrapping the recipient field</h1>

        <ToFieldOpen>
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