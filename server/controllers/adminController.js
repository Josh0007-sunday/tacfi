import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import User from '../models/User.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: 'Admin already exists' });

    const admin = await Admin.create({ name, email, password });
    const token = generateToken(admin._id);

    res.status(201).json({ success: true, data: { admin: admin.toJSON(), token } });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, message: 'Missing credentials' });

    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const valid = await admin.comparePassword(password);
    if (!valid) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const token = generateToken(admin._id);
    res.status(200).json({ success: true, data: { admin: admin.toJSON(), token } });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Verify a manual deposit for a user and update balance
export const verifyManualDeposit = async (req, res) => {
  try {
    const { userId } = req.params;
    const { depositId } = req.body;

    if (!depositId) return res.status(400).json({ success: false, message: 'depositId is required' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const deposit = user.manualDeposits.id(depositId);
    if (!deposit) return res.status(404).json({ success: false, message: 'Deposit not found' });

    if (deposit.status === 'verified') return res.status(400).json({ success: false, message: 'Deposit already verified' });

    deposit.status = 'verified';
    if (!deposit.isProcessed) {
      user.balance = (user.balance || 0) + (deposit.amount || 0);
      deposit.isProcessed = true;
    }

    await user.save();

    res.status(200).json({ success: true, message: 'Deposit verified', data: { userId: user._id, balance: user.balance } });
  } catch (error) {
    console.error('Verify manual deposit error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// List pending manual deposits grouped by user
export const getPendingDeposits = async (req, res) => {
  try {
    const users = await User.find({ 'manualDeposits.status': 'pending' }).select('name email manualDeposits');

    const pending = users.map(u => ({
      userId: u._id,
      name: u.name,
      email: u.email,
      deposits: u.manualDeposits.filter(d => d.status === 'pending')
    }));

    res.status(200).json({ success: true, data: pending });
  } catch (error) {
    console.error('Get pending deposits error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Users CRUD
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    // allow specific fields
    const allowed = ['name', 'email', 'plan', 'balance'];
    allowed.forEach(field => {
      if (typeof updates[field] !== 'undefined') user[field] = updates[field];
    });

    await user.save();
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Admins management
export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.error('Get admins error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    const admin = await Admin.findByIdAndDelete(adminId);
    if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });
    res.status(200).json({ success: true, message: 'Admin deleted' });
  } catch (error) {
    console.error('Delete admin error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

export default {
  signup,
  login,
  verifyManualDeposit,
  getPendingDeposits,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAdmins,
  deleteAdmin
};
