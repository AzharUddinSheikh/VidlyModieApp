import {useEffect, useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './component/NavBar';
import Movie from './movie';
import MovieDetail from './component/MovieDetail';
import Rental from './component/Rental';
import Customer from './component/Customer';
import NotFound from './component/common/NotFound';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';
import Logout from './component/Logout';
import ProtectedRoute from './component/common/ProtectedRoute';
import auth from './services/authService';
import './App.css';


function App() {

  const [user, setUser] = useState({});

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    setUser(currentUser);
  }, []);

  return (
    <>
      <NavBar user={user}/>
      <Routes>
        <Route path='/rental' element={<Rental />} />
          
        <Route path='/customer' element={<Customer />} />

        <Route element={<ProtectedRoute />}>
            <Route path='/movies/new' element={<MovieDetail />} />
            <Route path='/movie/:id' element={<MovieDetail />} />
        </Route>

        <Route path='/movies' element={<Movie user={user} />} />

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
