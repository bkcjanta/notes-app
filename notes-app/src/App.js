import logo from './logo.svg';
import './App.css';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';

function App() {
  const db = getDatabase(app);
  const setData = () => {
    set(ref(db, 'notes/'), {
      title: 'Hello world!',
      body: 'This is a.'
    });
  }
  return (
    <div className="App">
      <button onClick={setData}>Set Data</button>
    </div>
  );
}

export default App;
