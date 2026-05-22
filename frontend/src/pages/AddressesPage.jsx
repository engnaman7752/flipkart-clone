import React, { useState, useEffect } from 'react';
import api from '../api/api';
import PageContainer from '../components/PageContainer';

const AddressesPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', phone: '', pincode: '', locality: '', address: '', city: '', state: '', type: 'HOME'
  });

  const fetchAddresses = async () => {
    try {
      const res = await api.get('/users/addresses');
      setAddresses(res.data);
    } catch (err) {
      console.error('Failed to fetch addresses', err);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/users/addresses/${editingId}`, formData);
      } else {
        await api.post('/users/addresses', formData);
      }
      setShowForm(false);
      setEditingId(null);
      fetchAddresses();
    } catch (err) {
      console.error('Failed to save address', err);
    }
  };

  const handleEdit = (addr) => {
    setFormData(addr);
    setEditingId(addr.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this address?')) return;
    try {
      await api.delete(`/users/addresses/${id}`);
      fetchAddresses();
    } catch (err) {
      console.error('Failed to delete address', err);
    }
  };

  const inputClass = "w-full border border-gray-300 p-3 text-[14px] outline-none focus:border-[#2874f0] rounded-sm transition-colors";

  return (
    <PageContainer className="max-w-[1248px]">
      <div className="flex gap-4">
        {/* Main Content */}
        <div className="flex-1 bg-white shadow-sm min-h-[500px]">
          <div className="p-6 sm:p-8">
            <h1 className="text-[18px] font-medium text-[#212121] mb-6">Manage Addresses</h1>

            {!showForm && (
              <button 
                onClick={() => {
                  setFormData({ name: '', phone: '', pincode: '', locality: '', address: '', city: '', state: '', type: 'HOME' });
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="w-full flex items-center gap-3 p-4 border border-gray-200 text-[#2874f0] font-medium hover:bg-gray-50 transition-colors mb-6 rounded-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                ADD A NEW ADDRESS
              </button>
            )}

            {showForm && (
              <div className="bg-[#f5faff] p-6 border border-blue-50 mb-6 rounded-sm">
                <h2 className="text-[14px] font-bold text-[#2874f0] uppercase tracking-wider mb-5">
                  {editingId ? 'Edit Address' : 'Add a New Address'}
                </h2>
                <form onSubmit={handleSave} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className={inputClass} />
                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="10-digit mobile number" required className={inputClass} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" required className={inputClass} />
                    <input type="text" name="locality" value={formData.locality} onChange={handleChange} placeholder="Locality" required className={inputClass} />
                  </div>
                  <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Address (Area and Street)" required className={`${inputClass} h-24 resize-none`} />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City/District/Town" required className={inputClass} />
                    <input type="text" name="state" value={formData.state} onChange={handleChange} placeholder="State" required className={inputClass} />
                  </div>
                  <div className="pt-2">
                    <span className="text-[12px] text-[#878787] block mb-2">Address Type</span>
                    <div className="flex gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="type" value="HOME" checked={formData.type === 'HOME'} onChange={handleChange} className="accent-[#2874f0]" />
                        <span className="text-[14px]">Home (All day delivery)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="type" value="WORK" checked={formData.type === 'WORK'} onChange={handleChange} className="accent-[#2874f0]" />
                        <span className="text-[14px]">Work (Delivery between 10 AM - 5 PM)</span>
                      </label>
                    </div>
                  </div>
                  <div className="pt-6 flex items-center gap-4">
                    <button type="submit" className="bg-[#2874f0] text-white px-8 py-3 rounded-sm font-medium hover:bg-[#1c64d4] transition shadow">SAVE</button>
                    <button type="button" onClick={() => setShowForm(false)} className="text-[#2874f0] font-medium px-4 py-3 hover:bg-gray-50">CANCEL</button>
                  </div>
                </form>
              </div>
            )}

            <div className="border border-gray-200 rounded-sm divide-y divide-gray-100">
              {addresses.map((addr) => (
                <div key={addr.id} className="p-6 hover:bg-gray-50 transition-colors relative group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-gray-100 text-[#878787] text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">{addr.type}</span>
                  </div>
                  <div className="flex items-center gap-4 mb-2">
                    <span className="font-semibold text-[#212121] text-[14px]">{addr.name}</span>
                    <span className="font-semibold text-[#212121] text-[14px]">{addr.phone}</span>
                  </div>
                  <p className="text-[14px] text-[#212121] leading-relaxed max-w-2xl">
                    {addr.address}, {addr.locality}, {addr.city}, {addr.state} - <span className="font-semibold">{addr.pincode}</span>
                  </p>
                  
                  <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative group/menu">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                      </button>
                      <div className="absolute right-0 top-full mt-1 bg-white shadow-lg border border-gray-100 rounded-sm w-32 hidden group-hover/menu:block z-10">
                        <button onClick={() => handleEdit(addr)} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[14px] text-[#212121]">Edit</button>
                        <button onClick={() => handleDelete(addr.id)} className="w-full text-left px-4 py-2 hover:bg-gray-50 text-[14px] text-[#212121]">Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {addresses.length === 0 && !showForm && (
                <div className="p-8 text-center text-[#878787] text-[14px]">No saved addresses found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AddressesPage;
