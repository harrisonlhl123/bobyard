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

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
          <button onClick={handleAdminLogin}>Admin Login</button>
        </div>
      );
    }
  }

  return (
    <>
      <h1>Chirper</h1>
      { getLinks() }
    </>
  );
}

export default NavBar;