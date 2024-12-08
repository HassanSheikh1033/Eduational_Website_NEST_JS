import React, { useState, useEffect } from 'react';
import { useUser } from '../context/userContext';
import { userApi } from '../api/userApi';
import { useParams } from 'react-router-dom';
import { FaEdit, FaCheck } from 'react-icons/fa';

export default function EditProfile() {
  const { user } = useUser();
  const { id } = useParams();

  const [profile, setProfile] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await userApi.getById(id);
        setProfile({
          name: data.username || '',
          email: data.email || '',
          avatar: data.avatar || '',
          password: '',
          confirmPassword: '',
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('Failed to fetch profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: files ? files[0] : value,
    }));
  };

  const changeAvatarHandler = async () => {
    if (profile.avatar instanceof File) {
      try {
        const formData = new FormData();
        formData.append('avatar', profile.avatar);
  
        await userApi.updateAvatar(user._id, formData);
        setIsAvatarTouched(false);
        alert('Avatar updated successfully!');
      } catch (error) {
        console.error('Error updating avatar:', error);
        
        alert(`Failed to update avatar. ${error.response?.data?.message || 'Please try again.'}`);
      }
    } else {
      alert('Please select a valid image file for the avatar.');
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = profile;

    if (password && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      const updateUserDto = { username: name, email };
      if (password) updateUserDto.password = password;

      await userApi.update(user._id, updateUserDto);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile Update Error:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Update Your Profile
        </h2>

        {/* Avatar Section */}
        <div className="avatar_wrapper">
          <div className="profile_avatar_l profile_avatar app_transition">
            <img
              src={
                profile.avatar instanceof File
                  ? URL.createObjectURL(profile.avatar)
                  : `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/uploads/${profile.avatar}`
              }
              alt=""
              className="rounded-full w-full h-full object-cover"
            />
          </div>

          {/* Form to update Avatar */}
          <form className="avatar-form">
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
              <FaEdit />
            </label>
          </form>
          {isAvatarTouched && (
            <button className="profile_avatar-btn" onClick={changeAvatarHandler}>
              <FaCheck />
            </button>
          )}
        </div>

        {/* Rest of the Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={profile.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
