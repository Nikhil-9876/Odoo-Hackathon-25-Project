import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Login";

function App() {
<<<<<<< HEAD
  const [showLogin, setShowLogin] = useState(true);
  const [count, setCount] = useState(0);

  if (showLogin) {
    return <Login />;
  }
=======
>>>>>>> 7d2253c68952aec9f65e1c3935ab8c0295506d23

  
  return (
    <>
<<<<<<< HEAD
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1> */}
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
      {/* <button onClick={() => setShowLogin(true)}>Back to Login</button> */}
=======
      
>>>>>>> 7d2253c68952aec9f65e1c3935ab8c0295506d23
    </>
  );
}

export default App;
