import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RequestForm.css'; // We'll create this for styling

const RequestForm = ({ profile, onSubmit, onCancel }) => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="request-form">
      <div className="profile-summary">
        <img 
          src={profile.photo} 
          alt={profile.name} 
          className="profile-photo-sm" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/50';
          }}
        />
        <div>
          <h3>{profile.name}</h3>
          <div className="rating">
            {Array.from({ length: 5 }).map((_, i) => (
              <span 
                key={i} 
                className={`star ${i < Math.floor(profile.rating) ? 'filled' : ''}`}
              >
                {i < profile.rating ? '★' : '☆'}
              </span>
            ))}
            <span className="rating-value">{profile.rating.toFixed(1)}</span>
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
            minLength={10}
            disabled={isSubmitting}
          />
          <small className="character-count">{message.length}/500</small>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={!message.trim() || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </form>
    </div>
  );
};

RequestForm.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default RequestForm;