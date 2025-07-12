import React, { useState, useEffect } from 'react';
import './Admin.css';

const AdminDashboard = () => {
  const [reportedUsers, setReportedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const usersPerPage = 10;

  // Mock data - replace with actual API call
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    const mockReportedUsers = [
      {
        id: 1,
        username: 'user1',
        email: 'user1@example.com',
        reports: 5,
        lastReported: '2023-05-15',
        status: 'active'
      },
      {
        id: 2,
        username: 'user2',
        email: 'user2@example.com',
        reports: 12,
        lastReported: '2023-05-10',
        status: 'active'
      },
      {
        id: 3,
        username: 'user3',
        email: 'user3@example.com',
        reports: 3,
        lastReported: '2023-05-01',
        status: 'banned'
      },
      // Add more mock users as needed
    ];
    setReportedUsers(mockReportedUsers);
  }, []);

  // Filter users based on search term
  const filteredUsers = reportedUsers.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Handle delete confirmation
  const handleDeleteClick = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    // In a real app, you would call an API to delete the user
    setReportedUsers(reportedUsers.filter(user => user.id !== userToDelete));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="admin-container pt-4">
      <Sidebar />
      
      <div className="main-content">
        <div className="header">
          <h1>Reported Users Management</h1>
        </div>
        
        <div className="card">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>Search</button>
          </div>
          
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Reports</th>
                <th>Last Reported</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.reports}</td>
                    <td>{user.lastReported}</td>
                    <td>
                      <span className={`badge ${user.status === 'banned' ? 'badge-secondary' : 'badge-danger'}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <button 
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center' }}>No reported users found</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {totalPages > 1 && (
            <div className="pagination">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  className={currentPage === page ? 'active' : ''}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <button 
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Confirm User Deletion</h3>
            <p>Are you sure you want to delete this user? This action cannot be undone.</p>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sidebar Component
const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
      </div>
      <div className="sidebar-menu">
        <div className="menu-item">Dashboard</div>
        <div className="menu-item active">Reported Users</div>
        <div className="menu-item">Content Moderation</div>
        <div className="menu-item">System Settings</div>
      </div>
    </div>
  );
};

export default AdminDashboard;