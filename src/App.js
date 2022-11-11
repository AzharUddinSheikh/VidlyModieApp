import './App.css';
import NavBar from './component/NavBar';
import Movie from './movie';
import Rental from './component/Rental';
import Customer from './component/Customer';
import {Routes, Route, Navigate} from 'react-router-dom';
import MovieDetail from './component/MovieDetail';
import NotFound from './component/common/NotFound';
import LoginForm from './component/LoginForm';
import RegisterForm from './component/RegisterForm';


function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/rental' element={<Rental />} />
          
        <Route path='/customer' element={<Customer />} />

        <Route path='/movie/:id' element={<MovieDetail />} />

        <Route path='/movies/new' element={<MovieDetail />} />
 
        <Route path='/movies' element={<Movie />} />

        <Route path='/login' element={<LoginForm />} />

        <Route path='/register' element={<RegisterForm />} />

        <Route path='/not-found' element={<NotFound />} />

        <Route path='/' element={<Navigate to='/movies'/>} />
      </Routes>
    </>
  );
}

export default App;
