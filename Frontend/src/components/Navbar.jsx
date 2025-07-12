import { Link, NavLink } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";

const Navbar = () => {
   const { auth } = useAuth();

  return (
    <header className="navbar">
      <nav>
        <span className="logo">
          <Link to="/">Logo</Link>
        </span>
        <ul>
        {!auth?.accessToken ? (
            <>
              <li>
                <NavLink to="/sign-in">Sign in</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign up</NavLink>
              </li>
            </>
          ) : (
            <>
            <li>
               <NavLink to="/profile">Profile</NavLink>
            </li>
            </>
          )
        }
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
