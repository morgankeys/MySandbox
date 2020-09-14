import React from "react"

import { Frame } from "../components"

import styled from "styled-components"

class Prompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cachedEntry: "",
      entry: "",
      names: ["Alice", "Bob"],
    }

    this.clickEnter = this.clickEnter.bind(this)
    this.typeInField = this.typeInField.bind(this)
  }

  typeInField(event) {
    this.setState({ cachedEntry: event.target.value })
  }

  clickEnter(event) {
    this.setState({ cachedEntry: "", entry: this.state.cachedEntry })
  }

  render() {
    return (
      <Frame>
        <h3>Hello world!</h3>
        <div>
          <p>Enter name:</p>
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
          {this.state.names.find((name) => name === this.state.entry) && (
            <p>Oh hi, {this.state.entry}!</p>
          )}
        </div>
      </Frame>
    )
  }
}

export default Prompt
