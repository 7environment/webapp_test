import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const tg = window.Telegram.WebApp;

function App() {
  const [thumbnail, setThumbnail] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    tg.ready()
  }, [])

  useEffect(async () => {
    const response = await axios.get(`http://45.131.40.90/api/thumbnail/id/${tg.initDataUnsafe.user.id}`);
    setThumbnail(response.data);
  }, [])

  const onClose = () => {
    tg.close();
  }

  const saveUser = async () => {
    await axios.post(`http://45.131.40.90/api/thumbnail`, JSON.stringify({initData: tg.initData, data: {username: username}}))
  }


  return (
  <div className="App">
    <span>{thumbnail.imageUrl}</span>
    <span>{thumbnail.username}</span>
    <input onChange={(event) => {setUsername(event.target.value)}}>{username}</input>
    <button onClick={saveUser}>Сохранить ник</button>
    <button onClick={onClose}>Закрыть</button>
  </div>
)
}

export default App;
