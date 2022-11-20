import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import MyProfile from './components/MyProfile/MyProfile';


function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/my-profile' element={<MyProfile></MyProfile>}></Route>
      </Routes>
    </div>
  );
}

export default App;
