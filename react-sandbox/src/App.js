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

  cursor: grab;
`

const Half = styled.div`
  width: 100%;
  height: 50%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  align-content: center;
`

const Logger = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
`

const LetterBox = (props) => {
  return (
    <Draggable onDrag={props.onDrag} onStop={props.onMouseUp}>
      <StyledLetterBox>{props.children}</StyledLetterBox>
    </Draggable>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    const letters = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"]

    let letterObjects = []
    
    letters.map( l =>
      letterObjects.push({
        name: l,
        x: null,
        y: null,
        sorted: false,
      })
    )

    let sortingBuckets = {}
    let buckets = ["Left", "Right"]
    buckets.map(b => 
      sortingBuckets[b] = {
        name: b,
        x: null,
        y: null,
        height: null,
        width: null,
      }  
    )


    this.state = {
      height: 40,
      letterObjects: letterObjects,
      sortingBuckets: sortingBuckets,
      logger: `Logging: null`,
    }

    this.dragHandler = this.dragHandler.bind(this)
    this.mouseUpHandler = this.mouseUpHandler.bind(this)
    this.bucketUpdate = this.bucketUpdate.bind(this)
  }

  dragHandler = (l) => (event, data) => {
    this.setState(prevState => 
      {
        let newState = prevState
        console.log("dragHandler: "+l.name)
        
        let i = newState.letterObjects.findIndex(compare => compare.name === l.name ) 
        newState.letterObjects[i].x = data.x
        newState.letterObjects[i].y = data.y
        
        newState.logger = `Logging: x:${newState.letterObjects.x} y:${newState.letterObjects.y}`
        return newState
      })
  }

  mouseUpHandler = (letter) => (event) => {
    console.log("Stopped dragging... ")
    console.log(letter)


  }

  handleResize = () => {
    
  }

  bucketUpdate = (bucket) => {
    
    console.log(`${bucket.name}: ${bucket.x}, ${bucket.y}`)
  }

  render() {
    window.addEventListener('resize', this.bucketUpdate)

    return (
      <Frame>
        <Half key="top">
          {this.state.letterObjects.map( l => {
            return (
              <LetterBox 
                key={l.name} 
                onDrag={this.dragHandler(l)} 
                onMouseUp={this.mouseUpHandler(l)}
              >
                {l.name}
              </LetterBox>
            )
          })}
        </Half>
        <Half key="bottom" >
          <Bucket 
            componentDidUpdate={
              this.bucketUpdate(this.state.sortingBuckets["Left"]
            )}>
            Left Bucket
          </Bucket>
          <Bucket 
            key="right"
            componentDidUpdate={
              this.bucketUpdate(this.state.sortingBuckets["Right"]
          )}>
            Right Bucket
          </Bucket>
        </Half>
        <Logger>{this.state.logger}</Logger>
      </Frame>
    )
  }
}

export default App
