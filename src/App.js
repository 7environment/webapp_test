import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";
const tg = window.Telegram.WebApp

function App() {
  const [userProfile, setUserProfile] = useState({username: "", thumbnail: null});
  const [isChoosing, setIsChoosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function loadThumbnail() {
    const response = await axios.get(`https://swixgodly.ru/api/thumbnail/id/${tg.initDataUnsafe.user.id}`)
    if (response.status === 200) {
      setUserProfile({username: response.data.username, thumbnail: response.data.imageUrl});
    } else {
      setIsChoosing(true);
    }
  }

  async function saveUser() {
    const response = await axios.post(`https://swixgodly.ru/api/username`, {initData: tg.initData, data: {username: userProfile.username}});
    if (response.status === 200) {
      setIsChoosing(false);
    }
  }

  async function getThumbnail(username) {
      if (username.length > 3) {
          setIsLoading(true);
          const response = await axios.get(`https://swixgodly.ru/api/thumbnail/${username}`);
          setIsLoading(false);
          if (response.status === 200) {
              setUserProfile({username: username, thumbnail: response.data.imageUrl})
          } else {
              setUserProfile({username: username, thumbnail: null});
          }
      } else {
          setUserProfile({username: username, thumbnail: null});
      }
  }

  useEffect(() => {
    tg.ready()
    loadThumbnail()
  }, []);

  const onClose = () => {
    tg.close();
  }

  const chooseAnother = () => {
      setUserProfile({username: "", thumbnail: null});
      setIsChoosing(true);
  }

  return (
    isChoosing ?
    <div className="App">
      <button onClick={onClose}>Выйти из приложения</button>
        {isLoading ?
          <h3>Загрузка...</h3>
        :
          userProfile.thumbnail ?
            <img src={userProfile.thumbnail} alt="profile"/>
          :
            <h3>Аккаунта с таким ником нет</h3>
        }
      <input value={userProfile.username} onChange={(e) => {getThumbnail(e.target.value)}} type="text"/>
      <button disabled={userProfile.thumbnail === null} onClick={saveUser}>Выбрать этот аккаунт</button>
    </div>
        :
    <div className="App">
      <button onClick={onClose}>Выйти из приложения</button>
      <img src={userProfile.thumbnail} alt="profile"/>
      <h3>{userProfile.username}</h3>
      <button>Выбрать этот аккаунт</button>
      <button onClick={chooseAnother}>Выбрать другой аккаунт</button>
    </div>
  );
}

export default App;
