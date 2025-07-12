import React, { useState, useEffect } from "react";
import SkillRequestsComponent from './SkillRequestsComponent';

function Profile({ onLogout }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [showLogoutMenu, setShowLogoutMenu] = useState(false);
  const [userProfile, setUserProfile] = useState({
    name: "Marc Demo",
    email: "marc.demo@example.com",
    profilePhoto: null,
    skillsOffered: ["React", "JavaScript", "Node.js", "Python", "UI/UX Design"],
    skillsWanted: ["Machine Learning", "Data Science", "AWS", "DevOps"],
    bio: "Full-stack developer passionate about creating innovative solutions and learning new technologies.",
    rating: 4.5,
    completedExchanges: 12,
    reviews: [
      {
        name: "Sarah Johnson",
        rating: 5,
        comment: "Excellent React skills and very helpful!",
      },
      {
        name: "Mike Chen",
        rating: 4,
        comment: "Great teacher, explained concepts clearly.",
      },
      {
        name: "Emma Davis",
        rating: 5,
        comment: "Professional and knowledgeable.",
      },
    ],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...userProfile });
  const [newSkillOffered, setNewSkillOffered] = useState("");
  const [newSkillWanted, setNewSkillWanted] = useState("");

  // Apply global styles to prevent scrolling
  useEffect(() => {
    const originalBodyStyle = document.body.style.cssText;
    const originalHtmlStyle = document.documentElement.style.cssText;

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

    return () => {
      document.body.style.cssText = originalBodyStyle;
      document.documentElement.style.cssText = originalHtmlStyle;
    };
  }, []);

  // Close logout menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLogoutMenu && !event.target.closest(".profile-menu")) {
        setShowLogoutMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showLogoutMenu]);

  // Styles
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    background: "#ffffff",
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    position: "fixed",
    top: 0,
    left: 0,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    padding: "16px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const logoStyle = {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#1f2937",
  };

  const navStyle = {
    display: "flex",
    gap: "24px",
    alignItems: "center",
  };

  const navButtonStyle = {
    background: "none",
    border: "none",
    color: "#6b7280",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "8px 16px",
    borderRadius: "8px",
    transition: "all 0.2s ease",
  };

  const navButtonActiveStyle = {
    ...navButtonStyle,
    color: "#3b82f6",
    background: "rgba(59, 130, 246, 0.1)",
  };

  const contentStyle = {
    flex: 1,
    padding: "24px",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
  };

  const mainContentStyle = {
    width: "100%",
    maxWidth: "1200px",
    display: "flex",
    gap: "24px",
    flexWrap: "wrap",
  };

  const cardStyle = {
    background: "#ffffff",
    borderRadius: "16px",
    padding: "24px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
    border: "1px solid #e5e7eb",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  };

  const profileCardStyle = {
    ...cardStyle,
    flex: "1",
    minWidth: "300px",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const skillsCardStyle = {
    ...cardStyle,
    flex: "2",
    minWidth: "400px",
  };

  const photoStyle = {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    border: "4px solid #e5e7eb",
    marginBottom: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    background: "#f3f4f6",
    color: "#6b7280",
  };

  const buttonStyle = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: "#3b82f6",
    color: "white",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const buttonSecondaryStyle = {
    ...buttonStyle,
    background: "white",
    color: "#374151",
    border: "2px solid #e5e7eb",
  };

  const skillTagStyle = {
    background: "#f3f4f6",
    color: "#374151",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "500",
    margin: "4px",
    display: "inline-block",
    border: "1px solid #e5e7eb",
  };

  const skillTagOfferedStyle = {
    ...skillTagStyle,
    background: "#dbeafe",
    color: "#1e40af",
    border: "1px solid #3b82f6",
  };

  const skillTagWantedStyle = {
    ...skillTagStyle,
    background: "#dcfce7",
    color: "#166534",
    border: "1px solid #22c55e",
  };

  const inputStyle = {
    padding: "10px 14px",
    border: "2px solid #e5e7eb",
    borderRadius: "8px",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
    background: "white",
    outline: "none",
    color: "#1f2937",
    width: "100%",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const tabStyle = {
    display: "flex",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: "24px",
    gap: "4px",
  };

  const tabButtonStyle = {
    padding: "12px 16px",
    border: "none",
    background: "none",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#6b7280",
    borderBottom: "2px solid transparent",
    transition: "all 0.2s ease",
  };

  const tabButtonActiveStyle = {
    ...tabButtonStyle,
    color: "#3b82f6",
    borderBottomColor: "#3b82f6",
  };

  const ratingStyle = {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "1.2rem",
    color: "#fbbf24",
  };

  const reviewCardStyle = {
    ...cardStyle,
    margin: "12px 0",
    padding: "16px",
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...userProfile });
  };

  const handleSave = () => {
    setUserProfile({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...userProfile });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setEditData((prev) => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()],
      }));
      setNewSkillOffered("");
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setEditData((prev) => ({
        ...prev,
        skillsWanted: [...prev.skillsWanted, newSkillWanted.trim()],
      }));
      setNewSkillWanted("");
    }
  };

  const removeSkillOffered = (index) => {
    setEditData((prev) => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((_, i) => i !== index),
    }));
  };

  const removeSkillWanted = (index) => {
    setEditData((prev) => ({
      ...prev,
      skillsWanted: prev.skillsWanted.filter((_, i) => i !== index),
    }));
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>);
    }

    return stars;
  };

  const renderProfileTab = () => (
    <div style={mainContentStyle}>
      <div style={profileCardStyle}>
        <div style={photoStyle}>
          {userProfile.profilePhoto ? (
            <img
              src={userProfile.profilePhoto}
              alt="Profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <span>👤</span>
          )}
        </div>

        {isEditing ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <input
              style={inputStyle}
              value={editData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Name"
            />
            <input
              style={inputStyle}
              value={editData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Email"
            />
            <textarea
              style={textareaStyle}
              value={editData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              placeholder="Bio"
            />
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                style={buttonStyle}
                onClick={handleSave}
                onMouseOver={(e) => (e.target.style.background = "#2563eb")}
                onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
              >
                Save
              </button>
              <button
                style={buttonSecondaryStyle}
                onClick={handleCancel}
                onMouseOver={(e) => (e.target.style.background = "#f9fafb")}
                onMouseOut={(e) => (e.target.style.background = "white")}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ width: "100%" }}>
            <h2
              style={{
                margin: "0 0 8px 0",
                fontSize: "1.5rem",
                color: "#1f2937",
              }}
            >
              {userProfile.name}
            </h2>
            <p
              style={{
                margin: "0 0 12px 0",
                color: "#6b7280",
                fontSize: "0.9rem",
              }}
            >
              {userProfile.email}
            </p>
            <p
              style={{
                margin: "0 0 16px 0",
                color: "#374151",
                fontSize: "0.9rem",
                lineHeight: "1.5",
              }}
            >
              {userProfile.bio}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div style={ratingStyle}>
                {renderStars(userProfile.rating)}
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "0.9rem",
                    color: "#6b7280",
                  }}
                >
                  {userProfile.rating} ({userProfile.completedExchanges}{" "}
                  exchanges)
                </span>
              </div>
            </div>

            <button
              style={buttonStyle}
              onClick={handleEdit}
              onMouseOver={(e) => (e.target.style.background = "#2563eb")}
              onMouseOut={(e) => (e.target.style.background = "#3b82f6")}
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div style={skillsCardStyle}>
        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: "1.25rem",
            color: "#1f2937",
          }}
        >
          Skills Offered
        </h3>
        <div style={{ marginBottom: "24px" }}>
          {(isEditing ? editData.skillsOffered : userProfile.skillsOffered).map(
            (skill, index) => (
              <span key={index} style={skillTagOfferedStyle}>
                {skill}
                {isEditing && (
                  <button
                    style={{
                      marginLeft: "8px",
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                    }}
                    onClick={() => removeSkillOffered(index)}
                  >
                    ×
                  </button>
                )}
              </span>
            )
          )}
          {isEditing && (
            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
              <input
                style={inputStyle}
                value={newSkillOffered}
                onChange={(e) => setNewSkillOffered(e.target.value)}
                placeholder="Add skill offered"
                onKeyPress={(e) => e.key === "Enter" && addSkillOffered()}
              />
              <button
                style={buttonSecondaryStyle}
                onClick={addSkillOffered}
                onMouseOver={(e) => (e.target.style.background = "#f9fafb")}
                onMouseOut={(e) => (e.target.style.background = "white")}
              >
                Add
              </button>
            </div>
          )}
        </div>

        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: "1.25rem",
            color: "#1f2937",
          }}
        >
          Skills Wanted
        </h3>
        <div>
          {(isEditing ? editData.skillsWanted : userProfile.skillsWanted).map(
            (skill, index) => (
              <span key={index} style={skillTagWantedStyle}>
                {skill}
                {isEditing && (
                  <button
                    style={{
                      marginLeft: "8px",
                      background: "none",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                    }}
                    onClick={() => removeSkillWanted(index)}
                  >
                    ×
                  </button>
                )}
              </span>
            )
          )}
          {isEditing && (
            <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
              <input
                style={inputStyle}
                value={newSkillWanted}
                onChange={(e) => setNewSkillWanted(e.target.value)}
                placeholder="Add skill wanted"
                onKeyPress={(e) => e.key === "Enter" && addSkillWanted()}
              />
              <button
                style={buttonSecondaryStyle}
                onClick={addSkillWanted}
                onMouseOver={(e) => (e.target.style.background = "#f9fafb")}
                onMouseOut={(e) => (e.target.style.background = "white")}
              >
                Add
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderReviewsTab = () => (
    <div style={{ width: "100%", maxWidth: "800px" }}>
      <h3
        style={{ margin: "0 0 24px 0", fontSize: "1.25rem", color: "#1f2937" }}
      >
        Rating and Feedback ({userProfile.reviews.length} reviews)
      </h3>

      {userProfile.reviews.map((review, index) => (
        <div key={index} style={reviewCardStyle}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "1rem", color: "#1f2937" }}>
              {review.name}
            </h4>
            <div style={ratingStyle}>{renderStars(review.rating)}</div>
          </div>
          <p
            style={{
              margin: 0,
              color: "#6b7280",
              fontSize: "0.9rem",
              lineHeight: "1.5",
            }}
          >
            {review.comment}
          </p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={logoStyle}>Skill Swap Platform</div>
        <div style={navStyle}>
          <button
            style={navButtonStyle}
            onMouseOver={(e) =>
              (e.target.style.background = "rgba(59, 130, 246, 0.1)")
            }
            onMouseOut={(e) => (e.target.style.background = "none")}
          >
            Swap request
          </button>
          <button
            style={navButtonActiveStyle}
            onMouseOver={(e) =>
              (e.target.style.background = "rgba(59, 130, 246, 0.1)")
            }
            onMouseOut={(e) =>
              (e.target.style.background = "rgba(59, 130, 246, 0.1)")
            }
          >
            Home
          </button>
          <div style={{ position: "relative" }} className="profile-menu">
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: showLogoutMenu
                  ? "2px solid #3b82f6"
                  : "2px solid transparent",
              }}
              onClick={() => setShowLogoutMenu(!showLogoutMenu)}
              onMouseOver={(e) => (e.target.style.background = "#d1d5db")}
              onMouseOut={(e) => (e.target.style.background = "#e5e7eb")}
            >
              👤
            </div>
            {showLogoutMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  minWidth: "120px",
                  zIndex: 1000,
                }}
              >
                <button
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    border: "none",
                    background: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    color: "#374151",
                    transition: "background 0.2s ease",
                  }}
                  onClick={() => {
                    setShowLogoutMenu(false);
                    if (onLogout) onLogout();
                  }}
                  onMouseOver={(e) => (e.target.style.background = "#f9fafb")}
                  onMouseOut={(e) => (e.target.style.background = "none")}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div style={contentStyle}>
        <div style={{ width: "100%", maxWidth: "1200px" }}>
          <div style={tabStyle}>
            <button
              style={
                activeTab === "profile" ? tabButtonActiveStyle : tabButtonStyle
              }
              onClick={() => setActiveTab("profile")}
              onMouseOver={(e) => (e.target.style.color = "#3b82f6")}
              onMouseOut={(e) =>
                (e.target.style.color =
                  activeTab === "profile" ? "#3b82f6" : "#6b7280")
              }
            >
              Profile
            </button>
            <button
              style={
                activeTab === "reviews" ? tabButtonActiveStyle : tabButtonStyle
              }
              onClick={() => setActiveTab("reviews")}
              onMouseOver={(e) => (e.target.style.color = "#3b82f6")}
              onMouseOut={(e) =>
                (e.target.style.color =
                  activeTab === "reviews" ? "#3b82f6" : "#6b7280")
              }
            >
              Reviews
            </button>
            <button
              style={
                activeTab === "requests" ? tabButtonActiveStyle : tabButtonStyle
              }
              onClick={() => setActiveTab("requests")}
              onMouseOver={(e) => (e.target.style.color = "#3b82f6")}
              onMouseOut={(e) =>
                (e.target.style.color =
                  activeTab === "requests" ? "#3b82f6" : "#6b7280")
              }
            >
              Requests
            </button>
          </div>

          {/* {activeTab === "profile" ? renderProfileTab() : renderReviewsTab()} */}
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "reviews" && renderReviewsTab()}
          {activeTab === "requests" && <SkillRequestsComponent />}
        </div>
      </div>
    </div>
  );
}

export default Profile;