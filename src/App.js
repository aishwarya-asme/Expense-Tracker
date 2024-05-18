import { Outlet } from 'react-router-dom';
import './App.css';
import Header from '../../my_expenses/src/Component/Header';

function App() {
  return (
    <div  >
    <Header/>
    <Outlet/>
    </div>
  );
}

export default App;
