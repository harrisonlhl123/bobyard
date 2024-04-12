import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { login, logout } from '../../store/session';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();
  
  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const handleAdminLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email: "admin@aa.io", password: "password" })); 
  }

  return (
    <nav className="navbar">
      <Link className="navbar-link" to={'/'}>Bobyard</Link>
      <div className="navbar-links">
        {loggedIn ? (
          <button className="navbar-button" onClick={logoutUser}>Logout</button>
        ) : (
          <>
            <Link className="navbar-link" to={'/signup'}>Signup</Link>
            <Link className="navbar-link" to={'/login'}>Login</Link>
            <button className="navbar-button" onClick={handleAdminLogin}>Admin Login</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
