import './App.css';
import {useEffect, useState} from "react";
const axios = require('axios');
const tg = window.Telegram.WebApp

function App() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    tg.ready()
  }, []);

  const onClose = () => {
    tg.close();
  }

  async function saveUser() {
      await axios.post("http://45.131.40.90/api/thumbnail", {initData: tg.initData, data: {username: username}})
  }

  return (
    <div className="App">
      <button onClick={onClose}>Exit</button>
      <input onChange={(e) => {setUsername(e.target.value)}} type="text">{username}</input>
      <button onClick={saveUser}>Сохранить</button>
    </div>
  );
}

export default App;
