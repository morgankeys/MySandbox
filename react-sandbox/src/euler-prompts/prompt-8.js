import React from "react"

import { TopFrame } from "../components"

import styled from "styled-components"

const NumberGrid = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: start;
  align-items: start;
  flex-wrap: wrap;

  width: 100%;
`
const Number = styled.div`
  margin: 4px;
`

const Prompt8 = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`



class Prompt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      primes: [],
    }

    this.handleClick = this.handleClick.bind(this)
  }

  isThisPrime(number) {
    if (number != 1 && number != 2) {
      for (let i = number - 1; i > 1; i--) {
        if (number % i == 0) {
          return false
        }
      }
      return true
    } else {
      return true
    }
  }

  handleClick(generateNumbers) {
    if (generateNumbers == true) {
      generateNumbers = false
    } else {
      generateNumbers = true
    }
    
    let lastPrime =
      this.state.primes.length > 0
        ? this.state.primes[this.state.primes.length - 1]
        : 1

    let current = lastPrime + 1
    let foundNextPrime = false

    while (generateNumbers) {
      while (!foundNextPrime) {
        if (this.isThisPrime(current)) {
          this.setState((prevState) => {
            prevState.primes.push(current)
            return prevState
          })
          foundNextPrime = true
        } else {
          current++
        }
      }      
    }



  }

  render() {
    return (
      <TopFrame>
        <h3>Prompt 8: Print all prime numbers...</h3>
        <Prompt8>
          <div>
            <button onClick={this.handleClick}>Generate next prime</button>
          </div>
          <NumberGrid>
            {this.state.primes.map((p) => (
              <Number>{p}</Number>
            ))}
          </NumberGrid>
        </Prompt8>
      </TopFrame>
    )
  }
}

export default Prompt
