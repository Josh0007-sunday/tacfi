import express from 'express';
import { invest, getInvestments } from '../controllers/botController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/invest', protect, invest);
router.get('/investments', protect, getInvestments);

export default router;
