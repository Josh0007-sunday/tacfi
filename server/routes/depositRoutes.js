import express from 'express';
import { handleWebhook, recordManualDeposit } from '../controllers/depositController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/webhook', handleWebhook);

router.use(protect);

router.post('/manual', recordManualDeposit);

export default router;
