import React from "react"
import logo from "./logo.svg"

import styled from "styled-components"

import Draggable from "react-draggable"

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
  flex-direction: column;
`

const StyledBucket = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid #fff;

  display: flex;
  justify-content: center;
  align-items: center;
`

const Bucket = (props) => {
  return <StyledBucket>{props.children}</StyledBucket>
}

const StyledLetterBox = styled.div`
  border: 1px solid #fff;
  width: 60px;
  height: 60px;
  margin: 16px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const LetterBox = (props) => {
  return (
    <Draggable onDrag={props.onDrag}>
      <StyledLetterBox>{props.children}</StyledLetterBox>
    </Draggable>
  )
}

const Half = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Logger = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`

class App extends React.Component {
  constructor(props) {
    super(props)

    const letters = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"]

    let letterObjects = []
    
    letters.map( l =>
      letterObjects[l] = {
        x: null,
        y: null,
        sorted: false,
      }
    )

    this.state = {
      height: 40,
      letterObjects: letterObjects,
      bucketLeft: {
        x: null,
        y: null,
        contains: [],
      },
      bucketRight: {
        x: null,
        y: null,
        contains: [],
      },
      logger: `Logging: null`,
    }

    this.dragHandler = this.dragHandler.bind(this)
  }

  dragHandler = (l) => (event, data) => {
    // console.log(this.state.letterObjects.find(el => el.letter == l.letter))
    this.setState(prevState => 
      {
        let newState = prevState
        newState.letterObjects[l] = {x: data.x, y: data.y, sorted: false}
        newState.logger = `Logging: x:${data.x} y:${data.y}`
        return newState
      })
    console.log(this.state.letterObjects[l])
  }

  render() {
    return (
      <Frame>
        <Half key="top">
          {Object.keys(this.state.letterObjects).map( l => (
            <LetterBox key={l} onDrag={this.dragHandler(l)}>
              {l}
            </LetterBox>
          ))}
        </Half>
        <Half key="bottom">
          <Bucket key="left">Left Bucket</Bucket>
          <Bucket key="right">Right Bucket</Bucket>
        </Half>
        <Logger>{this.state.logger}</Logger>
      </Frame>
    )
  }
}

export default App
