// import { useState } from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import Login from "./components/Login";
// import Profile from "./components/Profile";
// import Main from "./components/Main"; // You'll need to create this
// // import NotFound from "./NotFound"; // You'll need to create this

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [count, setCount] = useState(0);

//   const handleLoginSuccess = () => {
//     setIsAuthenticated(true);
//   };

//   const handleLogout = () => {
//     setIsAuthenticated(false);
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route
//           path="/login"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/profile" />
//             ) : (
//               <Login onLoginSuccess={handleLoginSuccess} />
//             )
//           }
//         />

//         {/* Protected routes */}
//         <Route
//           path="/"
//           element={
//             isAuthenticated ? (
//               <Navigate to="/profile" />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             isAuthenticated ? (
//               <Profile onLogout={handleLogout} />
//             ) : (
//               <Navigate to="/login" />
//             )
//           }
//         />

//         {/* 404 Not Found */}
//         <Route
//           path="*"
//           element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Outlet,
  useLocation,
  matchPath,
} from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import UnAuth from "./pages/UnAuth";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a layout component
const Layout = () => {
  // const location = useLocation();
  
  // const navbarRoutes = ["/", "/sign-in", "/sign-up"];
  // const isVerifyRoute = matchPath("/verify/:email", location.pathname);

  // const showNavbar = navbarRoutes.includes(location.pathname) || isVerifyRoute;
  
  return (
    <>
      <Navbar />
      <div id="outlet">
        <Outlet />
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    </>
  );
};

// Define the routes
const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    {/* <Route element={<ProtectedLoader />}> */}
      <Route index element={<Home />} />

      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />

      {/* Protected */}
      {/* <Route element={<ProtectedRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route element={<RequireRole allowedRoles={["user"]} />}>
          <Route path="user" element={<User />} />
        </Route>
        <Route element={<RequireRole allowedRoles={["admin"]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route> */}

      <Route path="unauthorized" element={<UnAuth />} />
      <Route path="*" element={<NotFound />} />
    {/* </Route> */}
  </Route>
);

const App = () => {
  return <RouterProvider router={createBrowserRouter(routes)} />;
};

export default App


