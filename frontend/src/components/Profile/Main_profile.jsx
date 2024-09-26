import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth1 } from '../Authentication/LoginContest';
import './MainProfile.css'; // Import the CSS file for styling

export const Main_profile = () => {
  const { isLoggedIn1, setIsLoggedIn1 } = useAuth1();
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    gender: '',
    birthday: '',
    profilePicture: '',
  });
  const [isProfileExists, setIsProfileExists] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn1) {
      navigate('/Login');
      return;
    }

    // Fetching the logged-in user's email
    axios.get('http://localhost:4000/auth', { withCredentials: true })
      .then((response) => {
        const data = response.data;
        if (data.valid) {
          setEmail(data.email);
          // Check if the profile exists for this email
          checkUserProfile(data.email);
        } else {
          setIsLoggedIn1(false);
          navigate('/Login');
        }
      })
      .catch(err => {
        console.error(err);
        navigate('/Login');
      });
  }, [isLoggedIn1, navigate, setIsLoggedIn1]);

  // Function to check if the profile exists
  const checkUserProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/profile/${email}`);
      if (response.data) {
        setProfile(response.data);
        setIsProfileExists(true);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/profile', {
        email,
        ...profile,
        birthday: profile.birthday, // Make sure to send the date as is
      });

      alert(response.data.message); // Show success message
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  return (
    <div className="profile-container">
    <div className="profile-header">
      <div className="profile-welcome">
        {email ? (
          <p className="welcome-message">Logged in as: <strong>{email}</strong></p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="profile-actions">
        {isProfileExists && (
          <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  
    <div className="profile-content">
      {isProfileExists ? (
        <div className="profile-details">
          <h2 className="profile-heading">Your Profile</h2>
          <div className="profile-info">
            <div className="profile-item">
              <span className="profile-label">Name:</span>
              <span className="profile-value">{profile.name}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Phone:</span>
              <span className="profile-value">{profile.phone}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Address:</span>
              <span className="profile-value">{profile.address}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Gender:</span>
              <span className="profile-value">{profile.gender}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Birthday:</span>
              <span className="profile-value">{formatDate(profile.birthday)}</span>
            </div>
            <div className="profile-item">
              <span className="profile-label">Profile Picture:</span>
              <img src={profile.profilePicture} alt="Profile" className="profile-picture" />
            </div>
          </div>
        </div>
      ) : (
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2 className="form-heading">Create Profile</h2>
          <div className="form-group">
            <label className="form-label">Name:</label>
            <input type="text" name="name" value={profile.name} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">Phone:</label>
            <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">Address:</label>
            <input type="text" name="address" value={profile.address} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">Gender:</label>
            <select name="gender" value={profile.gender} onChange={handleChange} className="form-select" required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Birthday:</label>
            <input type="date" name="birthday" value={profile.birthday} onChange={handleChange} className="form-input" required />
          </div>
          <div className="form-group">
            <label className="form-label">Profile Picture URL:</label>
            <input type="text" name="profilePicture" value={profile.profilePicture} onChange={handleChange} className="form-input" />
          </div>
          <button type="submit" className="submit-button">Create Profile</button>
        </form>
      )}
     {isEditing && (
  <form className="profile-form" onSubmit={handleSubmit}>
    <h2 className="form-heading">Edit Profile</h2>
    <div className="form-group">
      <label className="form-label">Name:</label>
      <input type="text" name="name" value={profile.name} onChange={handleChange} className="form-input" required />
    </div>
    <div className="form-group">
      <label className="form-label">Phone:</label>
      <input type="text" name="phone" value={profile.phone} onChange={handleChange} className="form-input" required />
    </div>
    <div className="form-group">
      <label className="form-label">Address:</label>
      <input type="text" name="address" value={profile.address} onChange={handleChange} className="form-input" required />
    </div>
    <div className="form-group">
      <label className="form-label">Gender:</label>
      <select name="gender" value={profile.gender} onChange={handleChange} className="form-select" required>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>
    <div className="form-group">
      <label className="form-label">Birthday:</label>
      <input type="date" name="birthday" value={profile.birthday} onChange={handleChange} className="form-input" required />
    </div>
    <div className="form-group">
      <label className="form-label">Profile Picture URL:</label>
      <input type="text" name="profilePicture" value={profile.profilePicture} onChange={handleChange} className="form-input" />
    </div>
    <button type="submit" className="submit-button">Update Profile</button>
    <button type="button" onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
  </form>
)}
</div>
</div>
  );
};
