import './App.css';
const tg = window.Telegram.WebApp

function App() {
  useEffect(() => {
    tg.ready()
  }, []);

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <button onClick={onClose}>Exit</button>
      <span>{tg.initData}</span>
      <span>{tg.initDataUnsafe.user.id}</span>
    </div>
  );
}

export default App;
