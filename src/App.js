import React, { useState } from "react";
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <h1> A.I 새점 -지능디자인</h1>
      <form onSubmit={handleSubmit}>
        <textarea 
          value={message}
          placeholder = "개인 정보 입력하세요... "
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button type = "submit">submit</button>
      </form>
      <div>{response}</div>
      </div>
  );
}

export default App