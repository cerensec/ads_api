import './App.css';
import {Route, Routes, useParams} from 'react-router-dom'
import Header from './containers/header'
import Home from './containers/home'
import Form from './containers/form';
import Detail from './containers/detail';

const MyHoc = (props)=>{
  const params = useParams()

  const Child = props.child

  return (<Child {...props} params={params} />)
}

function App() {
  return (
    <div className="App">
        <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/form' element={<Form/>}/>
        <Route exact path='/detail/:id' element={<MyHoc child={Detail}/>}/>
      </Routes>
    </div>
  );
}

export default App;
