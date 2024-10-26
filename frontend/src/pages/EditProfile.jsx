import React, { useState } from 'react';
import { useUser } from '../context/userContext'; 
import { userApi } from '../api/userApi'; 

export default function EditProfile() {
  const { user } = useUser();

  const [profile, setProfile] = useState({
    name: user?.name || '', 
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    avatar: '',
  });


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar') {
      setProfile((prevProfile) => ({ ...prevProfile, avatar: files[0] }));
    } else {
      setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    }
  };


  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update user profile details excluding the avatar
    try {
      const { name, email, password, avatar } = profile;
      const updateUserDto = { username: name, email, password };
      
      // Update the user's profile data
      await userApi.update(user._id, updateUserDto);
      
      // If avatar is selected, update the avatar separately
      if (profile.avatar) {
        await userApi.updateAvatar(user._id, avatar);
      }

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Profile Update Error:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Update Your Profile
        </h2>

        {/* Avatar Holder */}
        <div className="flex justify-center mb-6">
          <div
            className="relative w-28 h-28 rounded-full bg-gray-200 border-4 border-blue-500 cursor-pointer hover:opacity-75"
            onClick={handleAvatarClick}
          >
            {profile.avatar ? (
              <img
                src={URL.createObjectURL(profile.avatar)}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center text-gray-500 text-xl">
                +
              </span>
            )}
            <input
              type="file"
              id="avatarInput"
              name="avatar"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
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
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="confirmPassword">
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

