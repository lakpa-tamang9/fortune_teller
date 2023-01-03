import React, { useState } from "react";
import './App.css';

function App() {
  const [language, setLanguage] = useState('english'); // default language is English
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, language }), // send the selected language to the server
    })
      .then((res) => res.json())
      .then((data) => setResponse(data.message));
  };

  return (
    <div className="App">
      <h1 style={{fontSize: '48px', color: 'brown', textAlign: 'center'}}> A.I 새점 -지능디자인</h1>
      <form onSubmit={handleSubmit}>
      <div style={{display: 'flex;', flexDirection: 'row'}}>
        <label>
          Select Language:
          <select value={language} onChange={handleLanguageChange}>
            <option value="english">English</option>
            <option value="korean">Korean</option>
          </select>
        </label>
        <textarea 
          value={message}
          placeholder = "개인 정보 입력하세요"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        </div>
        <button type="submit">submit</button>
      </form>
      <div>{response}</div>
    </div>
  );
}

export default App