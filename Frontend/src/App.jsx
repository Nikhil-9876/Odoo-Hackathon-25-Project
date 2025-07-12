import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./components/Login";
// import Home from "./Home"; // You'll need to create this
import Main from "./components/Main"; // You'll need to create this
// import NotFound from "./NotFound"; // You'll need to create this

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          isAuthenticated ? (
            <Navigate to="/dashboard" />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        } />
        
        {/* Protected routes */}
        <Route path="/" element={
          isAuthenticated ? (
            <Home />
          ) : (
            <Navigate to="/login" />
          )
        } />
        
        <Route path="/main" element={<Main />} />
        
        {/* 404 Not Found */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
  );
}

export default App;