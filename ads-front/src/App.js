import './App.css';
import {Route, Routes, useParams} from 'react-router-dom'
import Header from './containers/header'
import Home from './containers/home'
import Form from './containers/form';
import Detail from './containers/detail';
import Admin from './containers/admin';
import Edit from './containers/edit';

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
        <Route exact path='/admin' element={<Admin/>}/>
        <Route exact path='/detail/:id' element={<MyHoc child={Detail}/>}/>
        <Route exact path='/edit/:id' element={<MyHoc child={Edit}/>}/>
      </Routes>
    </div>
  );
}

export default App;
