import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaExchangeAlt,
  FaUserFriends,
  FaChartLine,
  FaHandshake,
} from "react-icons/fa";
import { IoMdRocket } from "react-icons/io";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate("/main", {
        state: {
          searchQuery: searchQuery.trim(),
          searchMode: true, // Add this flag to indicate we're in search mode
        },
      });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const popularSkills = [
    "Web Development",
    "Graphic Design",
    "Language Exchange",
    "Photography",
    "Cooking",
    "Music Lessons",
    "Fitness Training",
    "Career Coaching",
    "DIY Crafts",
    "Financial Advice",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Background Blur Elements */}
      <div className="fixed -z-10 w-full h-full overflow-hidden pointer-events-none">
        {/* Blue Blob */}
        <div
          className="absolute top-[15%] left-[-10%] w-[32rem] h-[32rem] bg-blue-400 rounded-full opacity-40 blur-[120px] animate-blob animation-delay-2000"
          style={{ mixBlendMode: "lighten" }}
        ></div>
        {/* Pink Blob */}
        <div
          className="absolute top-[10%] right-[-12%] w-[36rem] h-[36rem] bg-pink-400 rounded-full opacity-35 blur-[130px] animate-blob animation-delay-4000"
          style={{ mixBlendMode: "screen" }}
        ></div>
        {/* Green Blob */}
        <div
          className="absolute bottom-[10%] left-[20%] w-[28rem] h-[28rem] bg-emerald-400 rounded-full opacity-35 blur-[110px] animate-blob"
          style={{ mixBlendMode: "multiply" }}
        ></div>
        {/* Yellow Splash */}
        <div
          className="absolute bottom-[-8%] right-[10%] w-[24rem] h-[24rem] bg-yellow-300 rounded-full opacity-30 blur-[100px] animate-blob animation-delay-3000"
          style={{ mixBlendMode: "overlay" }}
        ></div>
        {/* Violet Splash */}
        <div
          className="absolute top-[55%] left-[55%] w-[20rem] h-[20rem] bg-violet-400 rounded-full opacity-25 blur-[120px] animate-blob animation-delay-1000"
          style={{ mixBlendMode: "color-dodge" }}
        ></div>
      </div>
      {/* Hero Section */}
      <section className="w-full py-24 px-4 sm:px-6 lg:px-8 bg-white/70 backdrop-blur-sm relative z-10">
        {/* Rest of your existing hero section code remains exactly the same */}
        <div className="max-w-8xl mx-auto">
          <div className="text-center">
            {/* Tagline - subtle but visible */}
            <div className="inline-flex items-center mb-6 text-blue-600">
              <IoMdRocket className="mr-2 text-lg" />
              <span className="text-base font-medium">
                Connect. Learn. Grow.
              </span>
            </div>

            {/* Headline - full width and bold */}
            <div className="px-4 sm:px-8 lg:px-16">
              <h1 className="text-5xl md:text-7xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="text-blue-600 block md:inline">
                  Swap Your Skills,
                </span>
                <span className="text-indigo-600 block md:inline">
                  Expand Your Network
                </span>
              </h1>
            </div>

            {/* Subhead - clear and readable */}
            <div className="max-w-4xl mx-auto px-4">
              <p className="text-2xl text-gray-600 mb-12">
                Find your perfect skill exchange partner in our thriving
                community of passionate learners and experts.
              </p>
            </div>

            {/* Search - centered but full width on larger screens */}
            {/* Search - centered but full width on larger screens */}
            <div className="max-w-3xl mx-auto px-4">
              {" "}
              {/* Changed from max-w-4xl to max-w-3xl */}
              <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="What skill would you like to learn or teach?"
                  className="flex-grow px-5 py-3 text-md focus:outline-none placeholder-gray-400"
                />
                <button
                  onClick={handleSearch}
                  className="px-6 bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <FaSearch className="text-lg" /> {/* Reduced icon size */}
                  <span className="ml-2 hidden sm:inline">Search</span>
                </button>
              </div>
              {/* Popular searches - also adjusted to match new width */}
              <div className="mt-4">
                {" "}
                {/* Reduced margin-top */}
                <p className="text-sm text-gray-500 mb-2">
                  Popular right now:
                </p>{" "}
                {/* Reduced margin-bottom */}
                <div className="flex flex-wrap justify-center gap-2">
                  {" "}
                  {/* Reduced gap */}
                  {popularSkills.slice(0, 8).map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        setSearchQuery(skill);
                        handleSearch();
                      }}
                      className="px-3 py-1 text-sm font-medium bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How SkillSwap Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-xl bg-blue-50">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaSearch className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Find Your Match
              </h3>
              <p className="text-gray-600">
                Search for people with the skills you need who are looking to
                learn what you offer.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-purple-50">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaExchangeAlt className="text-purple-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Connect & Exchange
              </h3>
              <p className="text-gray-600">
                Message potential partners and arrange your skill exchange
                sessions.
              </p>
            </div>

            <div className="text-center p-6 rounded-xl bg-indigo-50">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUserFriends className="text-indigo-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                Grow Together
              </h3>
              <p className="text-gray-600">
                Learn new skills while teaching others, building valuable
                connections.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Sarah"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah K.</h4>
                  <p className="text-gray-500 text-sm">Graphic Designer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "I taught web design to Mark while he helped me improve my
                photography skills. Now we collaborate on projects together!"
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Carlos"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Carlos M.</h4>
                  <p className="text-gray-500 text-sm">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "Through SkillSwap, I improved my Spanish while teaching
                programming. Now I have both new skills and a great friend in my
                language partner!"
              </p>
              <div className="flex items-center text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-10 text-center shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Swapping Skills?
          </h2>
          <p className="text-blue-100 mb-8 text-xl">
            Join thousands of learners exchanging knowledge right now.
          </p>
          <button
            onClick={() => navigate("/main")}
            className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          >
            Find Your Skill Match Now
          </button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose SkillSwap
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <FaChartLine className="text-blue-500 text-2xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Skill Tracking
              </h3>
              <p className="text-gray-600">
                Track your learning progress and see your skills improve over
                time.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <FaHandshake className="text-purple-500 text-2xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Verified Users
              </h3>
              <p className="text-gray-600">
                All users are verified to ensure a safe and trustworthy
                community.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <FaExchangeAlt className="text-indigo-500 text-2xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Flexible Exchanges
              </h3>
              <p className="text-gray-600">
                Exchange skills in-person or online, whatever works for you.
              </p>
            </div>

            <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
              <FaUserFriends className="text-green-500 text-2xl mb-4" />
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Community Events
              </h3>
              <p className="text-gray-600">
                Join our regular skill-sharing meetups and workshops.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite ease-in-out;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Home;
