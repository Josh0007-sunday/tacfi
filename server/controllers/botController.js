import BotInvestment from '../models/BotInvestment.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// @desc    Create a new investment
// @route   POST /api/bot/invest
// @access  Private
const invest = async (req, res) => {
  const { tokenId, amount } = req.body;
  const userId = req.user.id;

  if (!tokenId || !amount) {
    return res.status(400).json({ message: 'Please provide tokenId and amount' });
  }

  if (isNaN(amount) || Number(amount) <= 0) {
    return res.status(400).json({ message: 'Investment amount must be a positive number' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const investmentAmount = Number(amount);

    const user = await User.findById(userId).session(session);

    if (!user) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.balance < investmentAmount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    user.balance -= investmentAmount;
    await user.save({ session });

    const investment = new BotInvestment({
      user: userId,
      tokenId,
      amount: investmentAmount,
      plan: user.plan || 'free', // Save the user's current plan
    });
    await investment.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: 'Investment successful',
      investment,
      balance: user.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Investment error:', error);
    res.status(500).json({ message: 'Server error during investment' });
  }
};

// @desc    Get all investments for a user
// @route   GET /api/bot/investments
// @access  Private
const getInvestments = async (req, res) => {
  try {
    const investments = await BotInvestment.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      investments,
    });
  } catch (error) {
    console.error('Error fetching investments:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { invest, getInvestments };
