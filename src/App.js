import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../../my_expenses/src/Component/Header';
import Signup from './Component/Signup';

function App() {
  return (
    <div className='h-screen bg-gray-100' >
    <Header/>
    <Signup/>
    <Outlet/>
    </div>
  );
}

export default App;
