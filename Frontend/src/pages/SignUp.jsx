import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import axios from "../utils/apis/axios";
import useValidator from "../utils/hooks/useValidator";
import useNotify from "../utils/hooks/useNotify";

const SignUp = () => {
  const { setAuth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";

  const notify = useNotify();
  const validate = useValidator();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    // Validate the data
    const validationError = validate(userData, {
      type: "register"
    });
    if (validationError) {
      notify("error", validationError);
      setIsLoading(false);
      return; 
    }

    try {
      const response = await axios.post("/authorize/register", userData, {
        withCredentials: true,
      });
      setAuth(response.data); 
      notify("success", "Registration successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.log("[CLIENT - Register] Error: ", err.stack);
      notify("error", err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f5f5f5",
      padding: "20px"
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        width: "100%",
        maxWidth: "400px"
      }}>
        <h1 style={{
          fontSize: "1.8rem",
          marginBottom: "0.5rem",
          color: "#333",
          textAlign: "center"
        }}>Hello, There!</h1>
        <p style={{
          color: "#666",
          marginBottom: "1.5rem",
          textAlign: "center"
        }}>Fill out this form to create your account.</p>
        
        <form onSubmit={handleSubmit} noValidate style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem"
        }}>
          <label htmlFor="username" style={{
            fontWeight: "500",
            color: "#444"
          }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.3s",
              ":focus": {
                borderColor: "#4f6dff"
              }
            }}
          />
          
          <label htmlFor="email" style={{
            fontWeight: "500",
            color: "#444"
          }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.3s",
              ":focus": {
                borderColor: "#4f6dff"
              }
            }}
          />
          
          <label htmlFor="password" style={{
            fontWeight: "500",
            color: "#444"
          }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            style={{
              padding: "0.75rem",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1rem",
              outline: "none",
              transition: "border-color 0.3s",
              ":focus": {
                borderColor: "#4f6dff"
              }
            }}
          />
          
          <p style={{
            textAlign: "center",
            margin: "0.5rem 0",
            color: "#666"
          }}>
            Already have an account? <Link to="/sign-in" style={{
              color: "#4f6dff",
              textDecoration: "none",
              fontWeight: "500",
              ":hover": {
                textDecoration: "underline"
              }
            }}>Sign in</Link>
          </p>
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{
              backgroundColor: "#4f6dff",
              color: "white",
              padding: "0.75rem",
              border: "none",
              borderRadius: "4px",
              fontSize: "1rem",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.3s",
              ":hover": {
                backgroundColor: "#3a5bd9"
              },
              ":disabled": {
                backgroundColor: "#cccccc",
                cursor: "not-allowed"
              }
            }}
          >
            {isLoading ? (
              <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <span style={{ marginRight: "8px" }}>Loading</span>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite"
                }}></div>
              </span>
            ) : "Register"}
          </button>
        </form>
      </div>

      {/* For the loading spinner animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SignUp;