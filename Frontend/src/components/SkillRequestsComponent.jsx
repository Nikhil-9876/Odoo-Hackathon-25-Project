import React, { useState } from "react";

const SkillRequestsComponent = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      requester: "Alice Thompson",
      requesterRating: 4.8,
      skillOffered: "Python",
      skillWanted: "React",
      description: "Looking to learn React for a new project. I can teach Python fundamentals and advanced concepts in return.",
      timePosted: "2 hours ago",
      status: "open",
      profileImage: null
    },
    {
      id: 2,
      requester: "David Rodriguez",
      requesterRating: 4.2,
      skillOffered: "AWS",
      skillWanted: "UI/UX Design",
      description: "Need help with UI/UX design principles and tools. I can share my AWS cloud architecture knowledge.",
      timePosted: "5 hours ago",
      status: "open",
      profileImage: null
    },
    {
      id: 3,
      requester: "Jennifer Kim",
      requesterRating: 4.7,
      skillOffered: "Data Science",
      skillWanted: "Node.js",
      description: "Want to build a backend API with Node.js. I can teach data analysis with Python and machine learning basics.",
      timePosted: "1 day ago",
      status: "open",
      profileImage: null
    },
    {
      id: 4,
      requester: "Robert Wilson",
      requesterRating: 4.0,
      skillOffered: "DevOps",
      skillWanted: "JavaScript",
      description: "Looking to improve my JavaScript skills for automation scripts. I can help with CI/CD pipelines and Docker.",
      timePosted: "2 days ago",
      status: "open",
      profileImage: null
    },
    {
      id: 5,
      requester: "Maria Garcia",
      requesterRating: 4.9,
      skillOffered: "Machine Learning",
      skillWanted: "React",
      description: "Want to build ML model interfaces with React. I can teach neural networks and deep learning concepts.",
      timePosted: "3 days ago",
      status: "open",
      profileImage: null
    },
    {
      id: 6,
      requester: "James Chen",
      requesterRating: 4.3,
      skillOffered: "Vue.js",
      skillWanted: "Python",
      description: "Experienced frontend developer looking to transition to full-stack. Can teach Vue.js and modern JS frameworks.",
      timePosted: "1 week ago",
      status: "open",
      profileImage: null
    }
  ]);

  const [filteredRequests, setFilteredRequests] = useState(requests);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("all");

  // Get unique skills for filter dropdown
  const allSkills = [...new Set([
    ...requests.map(r => r.skillOffered),
    ...requests.map(r => r.skillWanted)
  ])];

  // Filter requests based on search and skill filter
  const handleSearch = (term) => {
    setSearchTerm(term);
    filterRequests(term, selectedSkill);
  };

  const handleSkillFilter = (skill) => {
    setSelectedSkill(skill);
    filterRequests(searchTerm, skill);
  };

  const filterRequests = (term, skill) => {
    let filtered = requests;

    if (term) {
      filtered = filtered.filter(request =>
        request.requester.toLowerCase().includes(term.toLowerCase()) ||
        request.skillOffered.toLowerCase().includes(term.toLowerCase()) ||
        request.skillWanted.toLowerCase().includes(term.toLowerCase()) ||
        request.description.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (skill !== "all") {
      filtered = filtered.filter(request =>
        request.skillOffered === skill || request.skillWanted === skill
      );
    }

    setFilteredRequests(filtered);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }

    return stars;
  };

  const handleRespond = (request) => {
    alert(`Responding to ${request.requester}'s request for ${request.skillWanted}!`);
    // Here you would typically open a modal or navigate to a messaging interface
  };

  const handleViewProfile = (request) => {
    alert(`Viewing ${request.requester}'s profile...`);
    // Here you would typically navigate to the user's profile page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Skill Exchange Requests
          </h1>
          <p className="text-gray-600">
            Browse and respond to skill exchange requests from other users
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search requests by name, skills, or description..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="sm:w-48">
              <select
                value={selectedSkill}
                onChange={(e) => handleSkillFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Skills</option>
                {allSkills.map(skill => (
                  <option key={skill} value={skill}>{skill}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredRequests.length} of {requests.length} requests
          </p>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No requests found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search terms or filters
              </p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                      {request.profileImage ? (
                        <img
                          src={request.profileImage}
                          alt={request.requester}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span>👤</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {request.requester}
                      </h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {renderStars(request.requesterRating)}
                        </div>
                        <span className="text-sm text-gray-600">
                          {request.requesterRating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {request.timePosted}
                  </span>
                </div>

                {/* Skills Exchange */}
                <div className="mb-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Offers:
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
                        {request.skillOffered}
                      </span>
                    </div>
                    <div className="text-gray-400 text-xl">↔</div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-600">
                        Wants:
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
                        {request.skillWanted}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {request.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleRespond(request)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Respond
                  </button>
                  <button
                    onClick={() => handleViewProfile(request)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillRequestsComponent;