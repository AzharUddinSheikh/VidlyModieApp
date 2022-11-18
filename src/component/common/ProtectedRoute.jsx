import React from 'react';
import auth from '../../services/authService';
import { Navigate, Outlet, useLocation} from 'react-router-dom';


const ProtectedRoute = () => {
    const location = useLocation();
    return !auth.getCurrentUser() ? <Navigate state={{userRequestedURL:location.pathname}} to='/login'/> : <Outlet />
}
 
export default ProtectedRoute;