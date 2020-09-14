import React from "react"

import { Frame } from "./components"

import styled from "styled-components"

const Prompt2 = () => {
  const links = ["prompt-2", "prompt-3", "prompt-4", "prompt-5", "prompt-8"]
  return (
    <Frame>
      <h1>All prompts</h1>
      <ul>
        {links.map((link) => (
          <li>
            <a href={`/${link}`}>{link}</a>
          </li>
        ))}
      </ul>
    </Frame>
  )
}

export default Prompt2
