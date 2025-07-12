import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaCogs,
  FaQuestionCircle,
  FaTachometerAlt,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../utils/hooks/useAuth";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { auth } = useAuth();
  const [userName, setUserName] = useState("");
  const [avatarURL, setAvatarURL] = useState(null);
  const navigate = useNavigate();
  const URL = import.meta.env.VITE_API_URL;

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (auth?.accessToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.post(`${URL}/user/getuser`, null, {
            headers: { "auth-token": auth.accessToken },
          });
          setUserName(response.data.name);
          setAvatarURL(response.data.avatarImageURL);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchUserData();
    }
  }, [auth]);

  const navLinks = [
    { to: "/", label: "Home", icon: <FaHome className="mr-2" /> },
    {
      to: "/profile",
      label: "Profile",
      icon: <FaQuestionCircle className="mr-2" />,
    },
  ];

  if (auth?.accessToken) {
    navLinks.push({
      to: "/account",
      label: "Dashboard",
      icon: <FaTachometerAlt className="mr-2" />,
    });
  }

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        className="fixed top-0 w-full z-50 py-3 shadow-sm bg-white/70 backdrop-blur-md border-b border-gray-200"
      >
        <Container fluid className="pl-0 sm:pl-8">
          <Navbar.Brand
            as={Link}
            to="/"
            className="flex items-center mx-4 mr-auto"
          >
            <span className="text-3xl font-bold bg-black bg-clip-text text-transparent">
              SkillShare
            </span>
          </Navbar.Brand>

          {/* Hamburger Menu Button */}
          <button
            className="nav__btn lg:hidden"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <div className={`hamburger-line ${isOpen ? "open" : ""}`}></div>
            <div className={`hamburger-line ${isOpen ? "open" : ""}`}></div>
          </button>

          {/* Mobile Nav Content */}
          <div className={`nav__content lg:hidden ${isOpen ? "open" : ""}`}>
            <ul className="nav__items">
              {navLinks.map(({ to, label, icon }) => (
                <li key={label} className="nav__item border-b border-gray-200">
                  <NavLink
                    to={to}
                    className="nav__item-text"
                    onClick={toggleMenu}
                    style={({ isActive }) => ({
                      color: isActive ? "#4f6dff" : "#333",
                    })}
                  >
                    {icon} {label}
                  </NavLink>
                </li>
              ))}
              {!auth?.accessToken ? (
                <>
                  <li className="nav__item border-b border-gray-200">
                    <NavLink
                      to="/sign-in"
                      className="nav__item-text"
                      onClick={toggleMenu}
                      style={({ isActive }) => ({
                        color: isActive ? "#4f6dff" : "#333",
                      })}
                    >
                      Sign in
                    </NavLink>
                  </li>
                  <li className="nav__item">
                    <NavLink
                      to="/sign-up"
                      className="nav__item-text"
                      onClick={toggleMenu}
                      style={({ isActive }) => ({
                        color: isActive ? "#4f6dff" : "#333",
                      })}
                    >
                      Sign up
                    </NavLink>
                  </li>
                </>
              ) : (
                <li className="nav__item">
                  <NavLink
                    to="/profile"
                    className="nav__item-text"
                    onClick={toggleMenu}
                    style={({ isActive }) => ({
                      color: isActive ? "#4f6dff" : "#333",
                    })}
                  >
                    Profile
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Desktop Nav Content */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="w-full justify-center ml-40"
          >
            {/* Desktop Auth Section */}
            <div className="auth-section  w-60 ml-5 text-sm fixed right-5">
              {!auth?.accessToken ? (
                <div className="flex rounded-full border border-gray-200 overflow-hidden">
                  <Nav.Link
                    as={NavLink}
                    to="/sign-in"
                    className="flex-1 px-4 py-2 no-underline text-gray-800 hover:text-blue-600 transition-colors text-center"
                  >
                    Sign in
                  </Nav.Link>
                  <div className="border-l border-gray-200 h-auto my-1"></div>
                  <NavLink
                    to="/sign-up"
                    className="flex-1 px-4 py-2 no-underline text-gray-800 hover:text-blue-600 transition-colors text-center"
                  >
                    Sign up
                  </NavLink>
                </div>
              ) : (
                <div className="flex items-center gap-2 font-medium text-gray-800">
                  <NavLink
                    to="/profile"
                    className="hover:opacity-80 transition-opacity"
                  >
                    {avatarURL ? (
                      <img
                        src={avatarURL}
                        alt="Profile"
                        className="w-10 h-10 rounded-full border border-gray-300 object-cover"
                      />
                    ) : (
                      <span className="w-10 h-10 rounded-full border fixed right-5 bottom-5 border-gray-300 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-12 h-12 text-gray-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>
                      </span>
                    )}
                  </NavLink>
                  {userName}
                </div>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="pt-16 bg-white"></div>

      {/* Styles */}
      <style>{`
        .nav__btn {
          position: relative;
          width: 40px;
          height: 40px;
          padding: 10px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: transparent;
          border: none;
          z-index: 1000;
        }
        .hamburger-line {
          width: 28px;
          height: 3px;
          border-radius: 2px;
          background: #3b82f6;
          transform-origin: 50% 50%;
          transition: transform 0.3s cubic-bezier(0.48, 0.43, 0.29, 1.3),
            background-color 0.3s;
        }
        .hamburger-line:first-child {
          margin-bottom: 7px;
          transform: ${isOpen ? "translateY(7px) rotate(-45deg)" : "none"};
        }
        .hamburger-line:last-child {
          transform: ${isOpen ? "translateY(-7px) rotate(45deg)" : "none"};
        }
        .nav__content {
          position: fixed;
          top: 80px;
          right: 0;
          width: ${isOpen ? "250px" : "0"};
          height: calc(100vh - 80px);
          background: white;
          box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: width 0.3s ease;
          z-index: 999;
        }
        .nav__items {
          list-style-type: none;
          padding: 20px;
          width: 250px;
        }
        .nav__item {
          padding: 15px 0;
        }
        .nav__item-text {
          display: flex;
          align-items: center;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          opacity: ${isOpen ? "1" : "0"};
          transition: opacity 0.3s ease ${isOpen ? "0.2s" : "0s"};
        }
        .nav__item-text:hover {
          color: #4f6dff;
        }
        @media (min-width: 992px) {
          .nav__btn,
          .nav__content {
            display: none;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
