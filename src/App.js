import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
const tg = window.Telegram.WebApp

function App() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    tg.ready()
  }, []);

  async function saveUser() {
    const responce = await axios.post("http://45.131.40.90/api/thumbnail", {initData: tg.initData, data: {username: username}});
    console.log(responce);
  }

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <button onClick={onClose}>Exit</button>
      <input onChange={(e) => {setUsername(e.target.value)}} type="text">{username}</input>
      <button onClick={saveUser}>Save</button>
    </div>
  );
}

export default App;
