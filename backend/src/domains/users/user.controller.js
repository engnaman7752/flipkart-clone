const userService = require('./user.service');

const getProfile = async (req, res) => {
  try {
    const profile = await userService.getUserProfile(req.user.id);
    if (!profile) return res.status(404).json({ error: 'User not found' });
    res.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const profile = await userService.updateUserProfile(req.user.id, req.body);
    res.json(profile);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAddresses = async (req, res) => {
  try {
    const addresses = await userService.getAddresses(req.user.id);
    res.json(addresses);
  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addAddress = async (req, res) => {
  try {
    // Basic validation
    const { name, phone, pincode, locality, address, city, state } = req.body;
    if (!name || !phone || !pincode || !locality || !address || !city || !state) {
      return res.status(400).json({ error: 'All address fields are required' });
    }

    const newAddress = await userService.addAddress(req.user.id, req.body);
    res.status(201).json(newAddress);
  } catch (error) {
    console.error('Error adding address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAddress = await userService.updateAddress(req.user.id, id, req.body);
    if (!updatedAddress) return res.status(404).json({ error: 'Address not found' });
    res.json(updatedAddress);
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAddress = await userService.deleteAddress(req.user.id, id);
    if (!deletedAddress) return res.status(404).json({ error: 'Address not found' });
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    console.error('Error deleting address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
};
