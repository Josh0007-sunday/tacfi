import express from 'express';
import { signup, login, verifyManualDeposit, getPendingDeposits, getUsers, getUser, updateUser, deleteUser, getAdmins, deleteAdmin } from '../controllers/adminController.js';
import { protectAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// Protected admin routes
router.get('/deposits/pending', protectAdmin, getPendingDeposits);
router.post('/deposits/:userId/verify', protectAdmin, verifyManualDeposit);

// Users
router.get('/users', protectAdmin, getUsers);
router.get('/users/:userId', protectAdmin, getUser);
router.put('/users/:userId', protectAdmin, updateUser);
router.delete('/users/:userId', protectAdmin, deleteUser);

// Admins
router.get('/admins', protectAdmin, getAdmins);
router.delete('/admins/:adminId', protectAdmin, deleteAdmin);

export default router;
