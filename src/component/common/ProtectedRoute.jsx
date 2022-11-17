import React from 'react';
import auth from '../../services/authService';
import { Route, Navigate, Outlet} from 'react-router-dom';


const ProtectedRoute = () => {
    return !auth.getCurrentUser() ? <Navigate to='/login'/> : <Outlet />
}
 
export default ProtectedRoute;