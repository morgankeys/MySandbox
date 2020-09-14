import React from "react"

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom"

import Home from "./home"
import Prompt2 from "./euler-prompts/prompt-2"
import Prompt3 from "./euler-prompts/prompt-3"
import Prompt4 from "./euler-prompts/prompt-4"
import Prompt5 from "./euler-prompts/prompt-5"
import Prompt8 from "./euler-prompts/prompt-8"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/prompt-2" exact component={Prompt2} />
          <Route path="/prompt-3" exact component={Prompt3} />
          <Route path="/prompt-4" exact component={Prompt4} />
          <Route path="/prompt-5" exact component={Prompt5} />
          <Route path="/prompt-8" exact component={Prompt8} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    )
  }
}

export default App
