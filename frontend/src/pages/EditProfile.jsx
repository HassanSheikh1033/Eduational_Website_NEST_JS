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
    const { name, files } = e.target;
    if (name === 'avatar') {
      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: files[0], // Update the avatar
      }));
      setIsAvatarTouched(true); // Mark avatar as touched
    }
  };

  const changeAvatarHandler = async () => {
    if (!profile.avatar || !(profile.avatar instanceof File)) {
      alert('Please select a valid image file for the avatar.');
      return;
    }

    try {
      if (profile.avatar.size > 5 * 1024 * 1024) {
        alert('File size should be less than 5MB');
        return;
      }

      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(profile.avatar.type)) {
        alert('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
        return;
      }

      const response = await userApi.updateAvatar(user._id, profile.avatar);

      setProfile((prevProfile) => ({
        ...prevProfile,
        avatar: response.avatar,
      }));

      setIsAvatarTouched(false);
      alert('Avatar updated successfully!');
    } catch (error) {
      console.error('Error updating avatar:', error);
      alert('Failed to update avatar. Please try again.');
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
        <div className="relative">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg">
            <img
              src={
                profile.avatar instanceof File
                  ? URL.createObjectURL(profile.avatar)
                  : profile.avatar
                  ? `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/uploads/${profile.avatar}`
                  : '/default-avatar.png'
              }
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>

          <label
            htmlFor="avatar"
            className="absolute bottom-2 right-[34%] bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition cursor-pointer"
          >
            <FaEdit />
          </label>
          <input
            type="file"
            name="avatar"
            id="avatar"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          {isAvatarTouched && (
            <button
              className="absolute top-2 right-[34%] bg-green-500 text-white p-2 rounded-full shadow-lg hover:bg-green-600 transition"
              onClick={changeAvatarHandler}
              title="Save Avatar"
            >
              <FaCheck />
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6">
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
