import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

const tg = window.Telegram.WebApp;

function App() {
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    tg.ready()
  }, [])

  useEffect(async () => {
    const response = await axios.get(`https://api.telegram.org/api/thumbnail/id/${tg.initDataUnsafe.user.id}`);
    setThumbnail(response.data);
  }, [])

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <span>{thumbnail.imageUrl}</span>
      <span>{thumbnail.username}</span>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
