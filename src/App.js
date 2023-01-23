
import './App.css';
import Addplayer from './Components/Addplayer';
import Navbar from './Components/Navbar';
import { Outlet } from 'react-router-dom';
import Addteam from './Components/Addteam';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Outlet><Addplayer/></Outlet>

    </div>
  );
}

export default App;
