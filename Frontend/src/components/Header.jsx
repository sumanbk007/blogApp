import React from 'react';
import { NavLink ,Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../redux/authSlice';


function Header() {
  // Access the isAuthenticated state from the Redux store
  const isAuthenticated = useSelector(state => state.auth.isLoggedIn);

   const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/');  
    };


  return (
    <nav>
     <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h2>BlogApp</h2>
        </Link>

      <div className="navLinks">
        {/* Show navigation links only if authenticated */}
        <NavLink to="/" activeClassName="active">All Blogs</NavLink>
        {isAuthenticated && (
          <>
            <NavLink to="/blogs/add" activeClassName="active">Add Blog</NavLink>
          </>
        )}
      </div>

         <div className="navBtns">
        {/* Show Login and Sign In buttons only if NOT authenticated */}
        {!isAuthenticated && (
          <>
            <Link to="/login"><button>Login</button></Link>
            <Link to="/signup"><button>SignUp</button></Link>
          </>
        )}
        {/* Show Logout button only if authenticated */}
        {isAuthenticated && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
}

export default Header;
