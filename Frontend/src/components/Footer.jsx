import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaExchangeAlt, FaUserFriends, FaEnvelope, FaQuestionCircle, FaTrophy, FaFileAlt } from "react-icons/fa";

function Footer() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    localStorage.setItem("selectedTopic", category);
    navigate("/main");
  };

  const toggleCategory = (categoryName) => {
    if (expandedCategory === categoryName) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryName);
    }
  };

  const skillCategories = [
    { name: "Creative", topics: ["Graphic Design", "Photography", "Music"] },
    { name: "Technical", topics: ["Programming", "Web Development", "Data Science"] },
    { name: "Languages", topics: ["Spanish", "French", "Mandarin"] },
    { name: "Professional", topics: ["Career Coaching", "Public Speaking", "Finance"] },
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 flex items-center">
              <FaExchangeAlt className="mr-2 text-blue-600" />
              SkillSwap
            </h3>
            <p className="text-gray-600">
              Connect with others to exchange skills and grow together in our community.
            </p>
          </div>

          {/* Skill Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Skill Categories</h4>
            <div className="space-y-2">
              {skillCategories.map((category) => (
                <div key={category.name} className="relative">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className="text-gray-600 hover:text-blue-600 transition-colors text-left"
                    >
                      {category.name}
                    </button>
                    <button
                      className="md:hidden text-gray-500"
                      onClick={() => toggleCategory(category.name)}
                    >
                      {expandedCategory === category.name ? "−" : "+"}
                    </button>
                  </div>

                  {(activeCategory === category.name || expandedCategory === category.name) && (
                    <div className="mt-1 ml-4 space-y-1 bg-white rounded-md shadow-sm md:absolute md:z-10 md:w-48 md:ml-0 md:mt-0 md:shadow-md md:border md:border-gray-200 md:p-2">
                      {category.topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => handleCategoryClick(topic)}
                          className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                        >
                          {topic}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <FaTrophy className="mr-2 text-blue-500" />
                Leaderboard
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <FaQuestionCircle className="mr-2 text-blue-500" />
                How It Works
              </a>
              <a href="#" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <FaFileAlt className="mr-2 text-blue-500" />
                Terms & Privacy
              </a>
              <button 
                onClick={() => navigate("/help")} 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <FaUserFriends className="mr-2 text-blue-500" />
                Support
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900">Contact Us</h4>
            <div className="space-y-2">
              <a href="mailto:support@skillswap.com" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
                <FaEnvelope className="mr-2 text-blue-500" />
                support@skillswap.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500">
          <p>
            © {new Date().getFullYear()} SkillSwap. Created by team NJ CUBE
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;