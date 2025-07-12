import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../assets/Modal/Modal";
import "./Main.css";

const Main = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);

  // Initialize with mock data and check for incoming search query
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
      {
        id: 5,
        name: "Michael Brown",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        skillsOffered: ["Java", "Spring Boot", "Microservices"],
        skillsWanted: ["Cloud Architecture", "Kubernetes"],
        rating: 4.3,
      },
      {
        id: 6,
        name: "Emily Davis",
        photo: "https://randomuser.me/api/portraits/women/3.jpg",
        skillsOffered: ["Angular", "TypeScript", "RxJS"],
        skillsWanted: ["UI Animation", "Three.js"],
        rating: 4.6,
      },
      {
        id: 7,
        name: "David Wilson",
        photo: "https://randomuser.me/api/portraits/men/4.jpg",
        skillsOffered: ["DevOps", "Docker", "CI/CD"],
        skillsWanted: ["Python Scripting", "Automation"],
        rating: 4.9,
      },
      {
        id: 8,
        name: "Jessica Taylor",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        skillsOffered: ["Swift", "iOS Development", "Mobile UI"],
        skillsWanted: ["Backend Integration", "Firebase"],
        rating: 4.4,
      },
      {
        id: 9,
        name: "Robert Anderson",
        photo: "https://randomuser.me/api/portraits/men/5.jpg",
        skillsOffered: ["C#", ".NET Core", "SQL Server"],
        skillsWanted: ["Azure Cloud", "Entity Framework"],
        rating: 4.1,
      },
      {
        id: 10,
        name: "Olivia Martinez",
        photo: "https://randomuser.me/api/portraits/women/5.jpg",
        skillsOffered: ["Vue.js", "Vuex", "Vuetify"],
        skillsWanted: ["State Management", "Testing"],
        rating: 4.7,
      },
      {
        id: 11,
        name: "William Thomas",
        photo: "https://randomuser.me/api/portraits/men/6.jpg",
        skillsOffered: ["Go", "REST APIs", "Performance Optimization"],
        skillsWanted: ["Distributed Systems", "gRPC"],
        rating: 4.8,
      },
      {
        id: 12,
        name: "Sophia Hernandez",
        photo: "https://randomuser.me/api/portraits/women/6.jpg",
        skillsOffered: ["Ruby on Rails", "PostgreSQL", "RSpec"],
        skillsWanted: ["React Frontend", "GraphQL"],
        rating: 4.5,
      },
      {
        id: 13,
        name: "James Moore",
        photo: "https://randomuser.me/api/portraits/men/7.jpg",
        skillsOffered: ["Android", "Kotlin", "Jetpack Compose"],
        skillsWanted: ["KMM", "Cross-platform Development"],
        rating: 4.3,
      },
      {
        id: 14,
        name: "Ava Jackson",
        photo: "https://randomuser.me/api/portraits/women/7.jpg",
        skillsOffered: ["Data Science", "Pandas", "NumPy"],
        skillsWanted: ["Data Visualization", "D3.js"],
        rating: 4.9,
      },
      {
        id: 15,
        name: "Daniel White",
        photo: "https://randomuser.me/api/portraits/men/8.jpg",
        skillsOffered: ["Blockchain", "Solidity", "Web3.js"],
        skillsWanted: ["Smart Contract Security", "DeFi"],
        rating: 4.6,
      },
    ];

    setProfiles(mockProfiles);

    // Check if there's a search query from the Home component
    if (location.state?.searchQuery) {
      setSearchTerm(location.state.searchQuery);
      filterProfiles(mockProfiles, location.state.searchQuery);
    } else {
      setFilteredProfiles(mockProfiles);
    }
  }, [location.state]);

  // Filter profiles based on search term
  const filterProfiles = (profilesToFilter, term) => {
    const results = profilesToFilter.filter(
      (profile) =>
        profile.name.toLowerCase().includes(term.toLowerCase()) ||
        profile.skillsOffered.some((skill) =>
          skill.toLowerCase().includes(term.toLowerCase())
        ) ||
        (profile.skillsWanted &&
          profile.skillsWanted.some((skill) =>
            skill.toLowerCase().includes(term.toLowerCase())
          ))
    );
    setFilteredProfiles(results);
  };

  // Handle search term changes
  useEffect(() => {
    filterProfiles(profiles, searchTerm);
  }, [searchTerm, profiles]);

  const handleRequest = (profile) => {
    setSelectedProfile(profile);
    setIsModalOpen(true);
  };

  const handleSubmitRequest = (message) => {
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

      {searchTerm && (
        <div className="search-results-header">
          <h2>
            {filteredProfiles.length > 0
              ? `Search results for "${searchTerm}"`
              : `No results found for "${searchTerm}"`}
          </h2>
        </div>
      )}

      <main className="profiles-container">
        {filteredProfiles.length > 0 ? (
          filteredProfiles.map((profile) => (
            <ProfileTile
              key={profile.id}
              profile={profile}
              onRequest={() => handleRequest(profile)}
              highlightSkill={searchTerm}
            />
          ))
        ) : (
          <div className="no-results">
            No profiles found matching your search.
          </div>
        )}
      </main>

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

// Updated ProfileTile component to highlight matching skills
const ProfileTile = ({ profile, onRequest, highlightSkill }) => {
  // Helper function to highlight matching text
  const highlightMatch = (text) => {
    if (
      !highlightSkill ||
      !text.toLowerCase().includes(highlightSkill.toLowerCase())
    ) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlightSkill})`, "i"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightSkill.toLowerCase() ? (
        <span key={i} className="highlighted-skill">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="profile-tile">
      <div className="profile-header">
        <img src={profile.photo} alt={profile.name} className="profile-photo" />
        <div className="profile-info">
          <h2>{highlightMatch(profile.name)}</h2>
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
              <li key={`offered-${index}`}>{highlightMatch(skill)}</li>
            ))}
          </ul>
        </div>
        <div className="skills-column">
          <h3>Skills Wanted</h3>
          <ul>
            {profile.skillsWanted.map((skill, index) => (
              <li key={`wanted-${index}`}>{highlightMatch(skill)}</li>
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

// RequestForm component remains the same
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

export default Main;
