import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg sms-navbar">
      <div className="container-fluid px-4">
        <Link className="navbar-brand sms-brand" to="/">
          <span className="sms-brand-icon" role="img" aria-label="graduation cap">🎓</span>
          EduManage
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#smsNavbar"
          aria-controls="smsNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="smsNavbar">
          {isAuthenticated && (
            <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">Students</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">Add Student</Link>
                </li>
              </ul>
              <div className="d-flex align-items-center gap-3">
                <span className="sms-user-name">{user?.name || user?.username}</span>
                <button className="btn sms-btn-outline" onClick={handleLogout}>
                  Sign Out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
