import './App.css';
import {HiCash} from 'react-icons/hi'
import Welcome from './Welcome';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './Dashboard';

function App() {
  return (
    <BrowserRouter>
    <div id='approot'>
      <Routes>
        <Route exact path='/' element={<Welcome />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
