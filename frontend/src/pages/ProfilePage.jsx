import React, { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import api from '../api/api';
import PageContainer from '../components/PageContainer';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [profile, setProfile] = useState({ name: '', gender: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/profile');
        setProfile({
          name: res.data.name || '',
          gender: res.data.gender || '',
          email: res.data.email || '',
          phone: res.data.phone || ''
        });
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      await api.put('/users/profile', profile);
      setIsEditing(false);
      // Ideally update authStore user here too
    } catch (err) {
      console.error('Failed to update profile', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="max-w-[1248px]">
      <div className="flex gap-4">
        {/* Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-white p-4 mb-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#2874f0]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            </div>
            <div>
              <div className="text-[12px] text-[#212121]">Hello,</div>
              <div className="text-[16px] font-medium text-[#212121]">{profile.name || user?.name}</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white shadow-sm p-6 sm:p-8 min-h-[500px]">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-[18px] font-medium text-[#212121]">Personal Information</h1>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="text-[14px] font-medium text-[#2874f0]">Edit</button>
            ) : (
              <button onClick={() => setIsEditing(false)} className="text-[14px] font-medium text-[#2874f0]">Cancel</button>
            )}
          </div>

          <div className="max-w-md space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[12px] text-[#878787] font-medium mb-1 block">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange} 
                  disabled={!isEditing}
                  className="w-full border border-gray-300 p-3 text-[14px] outline-none focus:border-[#2874f0] disabled:bg-gray-50 disabled:text-gray-500 rounded-sm"
                />
              </div>
            </div>

            <div>
              <label className="text-[12px] text-[#878787] font-medium mb-3 block">Your Gender</label>
              <div className="flex gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="Male" checked={profile.gender === 'Male'} onChange={handleChange} disabled={!isEditing} className="accent-[#2874f0] w-4 h-4" />
                  <span className="text-[14px] text-[#212121]">Male</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="gender" value="Female" checked={profile.gender === 'Female'} onChange={handleChange} disabled={!isEditing} className="accent-[#2874f0] w-4 h-4" />
                  <span className="text-[14px] text-[#212121]">Female</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="mb-4">
                <h1 className="text-[18px] font-medium text-[#212121]">Email Address</h1>
              </div>
              <input 
                type="email" 
                name="email" 
                value={profile.email} 
                disabled 
                className="w-full border border-gray-300 p-3 text-[14px] outline-none disabled:bg-gray-50 disabled:text-gray-500 rounded-sm"
              />
            </div>

            <div className="pt-6 border-t border-gray-100">
              <div className="mb-4">
                <h1 className="text-[18px] font-medium text-[#212121]">Mobile Number</h1>
              </div>
              <input 
                type="text" 
                name="phone" 
                value={profile.phone} 
                onChange={handleChange} 
                disabled={!isEditing}
                placeholder="Enter 10-digit mobile number"
                className="w-full border border-gray-300 p-3 text-[14px] outline-none focus:border-[#2874f0] disabled:bg-gray-50 disabled:text-gray-500 rounded-sm"
              />
            </div>

            {isEditing && (
              <div className="pt-4">
                <button 
                  onClick={handleSave} 
                  disabled={isLoading}
                  className="bg-[#2874f0] text-white px-10 py-3 rounded-sm font-medium hover:bg-[#1c64d4] transition-colors disabled:opacity-70 shadow"
                >
                  {isLoading ? 'SAVING...' : 'SAVE'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
