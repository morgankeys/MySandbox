import React from 'react';
import logo from './logo.svg';
import './App.css';

// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// DANGER! This is insecure. See http://twil.io/secure

console.log(process.env)

const accountSid = process.env.REACT_APP_TWILIO_ACCOUNT_SID;
const authToken = process.env.REACT_APP_TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
    from: '',
    to: ''
  })
  .then(message => console.log(message.sid));

const handleClick = () => {
  // client.messages
  //   .create({
  //     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
  //     from: '',
  //     to: ''
  //   })
  //   .then(message => console.log(message.sid));
  console.log("Clicked!")
}


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick}>Send text</button>
      </header>
    </div>
  );
}

export default App;