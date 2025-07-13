import './App.css';
import {useEffect} from "react";

const tg = window.Telegram.WebApp;

function App() {

  useEffect(() => {
    tg.ready()
  }, [])

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <span>{tg.initDataUnsafe.user.id}</span>
      work
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
}

export default App;
