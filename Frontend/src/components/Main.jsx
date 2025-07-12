import React, { useState, useEffect } from "react";
import Modal from "../assets/Modal/Modal";
import "./Main.css";

const Main = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Mock data - in a real app, you would fetch this from an API
  useEffect(() => {
    const mockProfiles = [
      {
        id: 1,
        name: "John Doe",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        skillsOffered: ["React", "JavaScript", "Node.js"],
        skillsWanted: ["UI/UX Design", "GraphQL"],
        rating: 4.5,
      },
      {
        id: 2,
        name: "Jane Smith",
        photo: "https://randomuser.me/api/portraits/women/1.jpg",
        skillsOffered: ["Python", "Data Analysis", "Machine Learning"],
        skillsWanted: ["Frontend Development", "React"],
        rating: 4.8,
      },
      {
        id: 3,
        name: "Alex Johnson",
        photo: "https://randomuser.me/api/portraits/men/2.jpg",
        skillsOffered: ["UI/UX Design", "Figma", "Adobe XD"],
        skillsWanted: ["Backend Development", "Database Design"],
        rating: 4.2,
      },
      {
        id: 4,
        name: "Sarah Williams",
        photo: "https://randomuser.me/api/portraits/women/2.jpg",
        skillsOffered: ["GraphQL", "Apollo", "TypeScript"],
        skillsWanted: ["DevOps", "AWS"],
        rating: 4.7,
      },
    ];
    setProfiles(mockProfiles);
    setFilteredProfiles(mockProfiles);
  }, []);

  // Filter profiles based on search term
  useEffect(() => {
    const results = profiles.filter(
      (profile) =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.skillsOffered.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        profile.skillsWanted.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
    setFilteredProfiles(results);
  }, [searchTerm, profiles]);

  const handleRequest = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleSubmitRequest = (message) => {
    // In a real app, this would send the request to your backend
    console.log(`Request sent to ${selectedProfile.name}:`, message);
    setIsModalOpen(false);
    alert(`Request sent to ${selectedProfile.name}!`);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Skill Exchange Network</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
      </header>
      <main className="profiles-container">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileTile
              key={profile.id}
              profile={profile}
              onRequest={() => handleRequest(profile)}
            />
          ))
        ) : (
          <div className="no-results">
            No profiles found matching your search.
          </div>
        )}
      </main>

      {/* Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Send Request to ${selectedProfile?.name || ""}`}
        width="500px"
      >
        {selectedProfile && (
          <RequestForm
            profile={selectedProfile}
            onSubmit={handleSubmitRequest}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
      </Modal>
    </div>
  );
};

// New RequestForm component
const RequestForm = ({ profile, onSubmit, onCancel }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(message);
  };

  return (
    <div className="request-form">
      <div className="profile-summary">
        <img
          src={profile.photo}
          alt={profile.name}
          className="profile-photo-sm"
        />
        <div>
          <h3>{profile.name}</h3>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={i < Math.floor(profile.rating) ? "filled" : ""}
              >
                {i < profile.rating ? "★" : "☆"}
              </span>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Hi ${profile.name}, I'd like to connect about...`}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Send Request
          </button>
        </div>
      </form>
    </div>
  );
};

// ProfileTile component remains the same as before
const ProfileTile = ({ profile, onRequest }) => {
  return (
    <div className="profile-tile">
      <div className="profile-header">
        <img src={profile.photo} alt={profile.name} className="profile-photo" />
        <div className="profile-info">
          <h2>{profile.name}</h2>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className={`star ${
                  i < Math.floor(profile.rating) ? "filled" : ""
                }`}
              >
                {i < profile.rating ? "★" : "☆"}
              </span>
            ))}
            <span className="rating-value">{profile.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      <div className="skills-section">
        <div className="skills-column">
          <h3>Skills Offered</h3>
          <ul>
            {profile.skillsOffered.map((skill, index) => (
              <li key={`offered-${index}`}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="skills-column">
          <h3>Skills Wanted</h3>
          <ul>
            {profile.skillsWanted.map((skill, index) => (
              <li key={`wanted-${index}`}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
      <button className="request-button" onClick={() => onRequest(profile.id)}>
        Send Request
      </button>
    </div>
  );
};

export default Main;
