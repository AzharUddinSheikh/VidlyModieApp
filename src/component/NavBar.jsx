import React from 'react';
import { NavLink } from 'react-router-dom';


const NavBar = ({user}) => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">Vidly Movie</NavLink>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/movies">Movie</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/customer">Customer</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rental">Rental</NavLink>
                        </li>
                        {!user?._id && 
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/register">Register</NavLink>
                                </li>
                            </>
                        }
                        {user?._id && 
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">{user.name}</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    );
}
 
export default NavBar;