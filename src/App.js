import {useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import NavBar from './component/NavBar';
import Movie from './movie';
import MovieDetail from './component/MovieDetail';
import Rental from './component/Rental';
import Customer from './component/Customer';
import NotFound from './component/common/NotFound';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import './App.css';
import Logout from './component/Logout';


function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      const jwtToken = localStorage.getItem('token');
      const userObject = jwt_decode(jwtToken);
      setUser(userObject)
    } catch {
      {};
    }
  }, []);

  return (
    <>
      <NavBar user={user}/>
      <Routes>
        <Route path='/rental' element={<Rental />} />
          
        <Route path='/customer' element={<Customer />} />

        <Route path='/movie/:id' element={<MovieDetail />} />

        <Route path='/movies/new' element={<MovieDetail />} />

        <Route path='/movies' element={<Movie />} />

        <Route path='/login' element={<LoginForm />} />

        <Route path='/logout' element={<Logout />} />

        <Route path='/register' element={<RegisterForm />} />

        <Route path='/not-found' element={<NotFound />} />

        <Route path='/' element={<Navigate to='/movies'/>} />
      </Routes>
    </>
  );
}

export default App;
