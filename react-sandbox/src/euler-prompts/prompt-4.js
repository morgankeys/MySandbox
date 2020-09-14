import React from "react"

import { Frame } from "../components"

import styled from "styled-components"

class Prompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cachedEntry: 0,
      entry: "",
      answer: null,
    }

    this.clickEnter = this.clickEnter.bind(this)
    this.typeInField = this.typeInField.bind(this)
  }

  doMath(entry) {
    let scratch = 0
    for (let i = 0; i <= entry; i++) {
      scratch = scratch + i
      console.log(scratch)
    }
    this.setState({ answer: scratch })
  }

  typeInField(event) {
    this.setState({ cachedEntry: event.target.value })
  }

  clickEnter(event) {
    this.setState({ entry: this.state.cachedEntry })
    this.doMath(this.state.cachedEntry)
  }

  render() {
    return (
      <Frame>
        <h3>Prompt 4: Add up every number from 0 to n</h3>
        <div>
          <p>Enter a number:</p>
          <div>
            <input
              type="text"
              onChange={this.typeInField}
              value={this.state.cachedEntry}
              placeholder={"Enter your name"}
            />
          </div>
          <div>
            <button onClick={this.clickEnter}>Enter</button>
          </div>
          {this.state.answer && <p>{this.state.answer}</p>}
        </div>
      </Frame>
    )
  }
}

export default Prompt
