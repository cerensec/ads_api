import './App.css';
import {Route, Routes, useParams} from 'react-router-dom'
import Header from './containers/header'
import Home from './containers/home'

function App() {
  return (
    <div className="App">
        <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
      </Routes>
    </div>
  );
}

export default App;
