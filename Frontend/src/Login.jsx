import React, { useState, useEffect } from "react";

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Apply global styles to prevent scrolling
  useEffect(() => {
    // Store original styles
    const originalBodyStyle = document.body.style.cssText;
    const originalHtmlStyle = document.documentElement.style.cssText;

    // Apply non-scrollable styles
    document.body.style.cssText = `
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      box-sizing: border-box;
    `;

    document.documentElement.style.cssText = `
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      box-sizing: border-box;
    `;

    // Cleanup function to restore original styles
    return () => {
      document.body.style.cssText = originalBodyStyle;
      document.documentElement.style.cssText = originalHtmlStyle;
    };
  }, []);

  // Styles
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    margin: 0,
    padding: "20px",
    boxSizing: "border-box",
    overflow: "hidden",
    position: "fixed",
    top: 0,
    left: 0,
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "32px",
    width: "100%",
    maxWidth: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const successCardStyle = {
    ...cardStyle,
    background: "#10b981",
    color: "white",
    textAlign: "center",
    boxShadow:
      "0 4px 6px rgba(16, 185, 129, 0.1), 0 1px 3px rgba(16, 185, 129, 0.2)",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "24px",
  };

  const titleStyle = {
    fontSize: "1.75rem",
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: "8px",
    margin: 0,
  };

  const subtitleStyle = {
    color: "#6b7280",
    fontSize: "0.95rem",
    margin: 0,
    fontWeight: "400",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  };

  const labelStyle = {
    fontWeight: "600",
    color: "#374151",
    fontSize: "0.875rem",
  };

  const inputStyle = {
    padding: "12px 16px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.2s ease",
    background: "white",
    outline: "none",
    color: "#1f2937",
    boxSizing: "border-box",
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: "#3b82f6",
    boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
  };

  const inputErrorStyle = {
    ...inputStyle,
    borderColor: "#ef4444",
    boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.1)",
  };

  const buttonStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    outline: "none",
    minHeight: "44px",
    background: "#3b82f6",
    color: "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const buttonSecondaryStyle = {
    ...buttonStyle,
    background: "white",
    color: "#374151",
    border: "2px solid #e5e7eb",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  };

  const linkButtonStyle = {
    background: "none",
    border: "none",
    color: "#3b82f6",
    cursor: "pointer",
    fontWeight: "600",
    textDecoration: "none",
    transition: "color 0.2s ease",
    padding: "4px 8px",
    borderRadius: "4px",
    fontSize: "0.9rem",
  };

  const linkButtonPrimaryStyle = {
    ...linkButtonStyle,
    color: "#7c3aed",
  };

  const errorStyle = {
    color: "#ef4444",
    fontSize: "0.875rem",
    marginTop: "4px",
    display: "flex",
    alignItems: "center",
    gap: "4px",
  };

  const footerStyle = {
    marginTop: "24px",
    textAlign: "center",
  };

  const authSwitchStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    color: "#6b7280",
    fontSize: "0.9rem",
    marginTop: "16px",
  };

  const successContentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!showForgotPassword) {
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!isLoginMode) {
        if (!formData.name) {
          newErrors.name = "Name is required";
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (showForgotPassword) {
        alert("Password reset link sent to your email!");
        setShowForgotPassword(false);
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      } else if (isLoginMode) {
        setIsLoggedIn(true);
        console.log("Login successful:", formData.email);
      } else {
        setIsLoginMode(true);
        alert("Account created successfully! Please log in.");
        setFormData((prev) => ({
          ...prev,
          password: "",
          confirmPassword: "",
          name: "",
        }));
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    });
    setErrors({});
  };

  const switchMode = () => {
    setIsLoginMode(!isLoginMode);
    setShowForgotPassword(false);
    setErrors({});
    setFormData((prev) => ({
      ...prev,
      password: "",
      confirmPassword: "",
      name: "",
    }));
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setIsLoginMode(true);
    setErrors({});
    setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
  };

  if (isLoggedIn) {
    return (
      <div style={containerStyle}>
        <div style={successCardStyle}>
          <div style={successContentStyle}>
            <div style={{ animation: "pulse 2s ease-in-out infinite" }}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="12" fill="#10B981" />
                <path
                  d="M8 12l2 2 4-4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 style={{ margin: 0, fontSize: "1.5rem" }}>Welcome Back!</h2>
            <p style={{ margin: 0 }}>You have successfully logged in.</p>
            <p style={{ fontSize: "0.9rem", opacity: 0.9, margin: "8px 0" }}>
              Logged in as: {formData.email}
            </p>
            <button
              onClick={handleSignOut}
              style={buttonSecondaryStyle}
              onMouseOver={(e) => {
                e.target.style.background = "#f9fafb";
                e.target.style.borderColor = "#d1d5db";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "white";
                e.target.style.borderColor = "#e5e7eb";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>
            {showForgotPassword
              ? "Reset Password"
              : isLoginMode
              ? "Welcome Back"
              : "Create Account"}
          </h1>
          <p style={subtitleStyle}>
            {showForgotPassword
              ? "Enter your email to receive a password reset link"
              : isLoginMode
              ? "Sign in to your account"
              : "Sign up for a new account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={formStyle}>
          {!isLoginMode && !showForgotPassword && (
            <div style={formGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={errors.name ? inputErrorStyle : inputStyle}
                placeholder="Enter your full name"
                onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.name
                    ? "#ef4444"
                    : "#e5e7eb")
                }
              />
              {errors.name && (
                <span style={errorStyle}>
                  <span>⚠</span> {errors.name}
                </span>
              )}
            </div>
          )}

          <div style={formGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={errors.email ? inputErrorStyle : inputStyle}
              placeholder="Enter your email"
              onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.email
                  ? "#ef4444"
                  : "#e5e7eb")
              }
            />
            {errors.email && (
              <span style={errorStyle}>
                <span>⚠</span> {errors.email}
              </span>
            )}
          </div>

          {!showForgotPassword && (
            <>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  style={errors.password ? inputErrorStyle : inputStyle}
                  placeholder="Enter your password"
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = errors.password
                      ? "#ef4444"
                      : "#e5e7eb")
                  }
                />
                {errors.password && (
                  <span style={errorStyle}>
                    <span>⚠</span> {errors.password}
                  </span>
                )}
              </div>

              {!isLoginMode && (
                <div style={formGroupStyle}>
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    style={
                      errors.confirmPassword ? inputErrorStyle : inputStyle
                    }
                    placeholder="Confirm your password"
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) =>
                      (e.target.style.borderColor = errors.confirmPassword
                        ? "#ef4444"
                        : "#e5e7eb")
                    }
                  />
                  {errors.confirmPassword && (
                    <span style={errorStyle}>
                      <span>⚠</span> {errors.confirmPassword}
                    </span>
                  )}
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            style={buttonStyle}
            disabled={isLoading}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.background = "#2563eb";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.background = "#3b82f6";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {isLoading ? (
              <span
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                  style={{ animation: "spin 1s linear infinite" }}
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="31.416"
                    strokeDashoffset="31.416"
                  >
                    <animate
                      attributeName="stroke-dasharray"
                      dur="2s"
                      values="0 31.416;15.708 15.708;0 31.416"
                      repeatCount="indefinite"
                    />
                    <animate
                      attributeName="stroke-dashoffset"
                      dur="2s"
                      values="0;-15.708;-31.416"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
                Processing...
              </span>
            ) : showForgotPassword ? (
              "Send Reset Link"
            ) : isLoginMode ? (
              "Sign In"
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <div style={footerStyle}>
          {showForgotPassword ? (
            <div style={{ marginBottom: "16px" }}>
              <button
                onClick={() => setShowForgotPassword(false)}
                style={linkButtonStyle}
                onMouseOver={(e) => {
                  e.target.style.color = "#2563eb";
                  e.target.style.background = "rgba(59, 130, 246, 0.1)";
                }}
                onMouseOut={(e) => {
                  e.target.style.color = "#3b82f6";
                  e.target.style.background = "none";
                }}
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <>
              {isLoginMode && (
                <div style={{ marginBottom: "16px" }}>
                  <button
                    onClick={handleForgotPassword}
                    style={linkButtonStyle}
                    onMouseOver={(e) => {
                      e.target.style.color = "#2563eb";
                      e.target.style.background = "rgba(59, 130, 246, 0.1)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#3b82f6";
                      e.target.style.background = "none";
                    }}
                  >
                    Forgot your password?
                  </button>
                </div>
              )}

              <div style={authSwitchStyle}>
                <span>
                  {isLoginMode
                    ? "Don't have an account?"
                    : "Already have an account?"}
                </span>
                <button
                  onClick={switchMode}
                  style={linkButtonPrimaryStyle}
                  onMouseOver={(e) => {
                    e.target.style.color = "#6d28d9";
                    e.target.style.background = "rgba(124, 58, 237, 0.1)";
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = "#7c3aed";
                    e.target.style.background = "none";
                  }}
                >
                  {isLoginMode ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
