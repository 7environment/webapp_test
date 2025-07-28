import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
const tg = window.Telegram.WebApp

function App() {
  const [username, setUsername] = useState("");
  const [debug, setDebug] = useState("");

  useEffect(() => {
    tg.ready()
  }, []);

  const onClose = () => {
    tg.close();
  }

  async function saveUser() {
    const response = await axios.post("https://swixgodly.ru/api/username", {initData: tg.initData, data: {username: username}})
    setDebug(response.data)
  }

  return (
    <div className="App">
      <h1>version 1</h1>
      <button onClick={onClose}>Exit</button>
      <input onChange={(e) => {setUsername(e.target.value)}} type="text" value={username} />
      <button onClick={saveUser}>Сохранить</button>
      <h1>{debug.username}</h1>
    </div>
  );
}

export default App;
