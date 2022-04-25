import React, { useState, useEffect } from "react";
import { Router, Link, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import CmpUploadFile from './CmpUploadFile';
import DspLineChart from '../views/DspLineChart';
import DspHome from '../views/DspHome';
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import Login from "./Login";
import Register from "./Register";
import Activation from "./Activation";
import Home from "./Home";
import Profile from "./Profile";
import BoardUser from "./BoardUser";
import BoardModerator from "./BoardModerator";
import BoardAdmin from "./BoardAdmin";
import { logout } from "../actions/auth";
import { clearMessage } from "../actions/message";
import { history } from "../helpers/history";

function CmpNavbar() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage()); // clear message when changing location
    });
  }, [dispatch]);
  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes("MOD"));
      setShowAdminBoard(currentUser.roles.includes("ADMIN"));
    }
  }, [currentUser]);
  const logOut = () => {
    dispatch(logout());
  };
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Dashboard
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/linechart"} className="nav-link">
              LineChart
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to={"/uploadfile"} className="nav-link">
              Upload
            </Link>
          </li> */}
          {/* <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li> */}
          {/* TODO: delete after tweaking */}
          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
              </Link>
            </li>
          )}
          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
              </Link>
            </li>
          )}
          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div>
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link text-danger" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/activation"} className="nav-link">
                Create Account
              </Link>
            </li>
          </div>
        )}
      </nav>
      <Routes>
        {/* <Route path='/' element={<DspHome />} /> */}
        <Route path='/Linechart' element={<DspLineChart />} />
        <Route path='/uploadfile' element={<CmpUploadFile />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/activation" element={<Activation />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route path="/user" element={<BoardUser />} />
        <Route path="/mod" element={<BoardModerator />} />
        <Route path="/admin" element={<BoardAdmin />} />
      </Routes>

    </div>
  );
}

export default CmpNavbar;