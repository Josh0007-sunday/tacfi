import User from '../models/User.js';

export const handleWebhook = async (req, res) => {
  try {
    const { customerDetails, amount } = req.body;

    if (!customerDetails || !customerDetails.email || !amount) {
      return res.status(400).json({
        success: false,
        message: 'Invalid webhook payload',
      });
    }

    const user = await User.findOne({ email: customerDetails.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Update the user's balance; coerce legacy balance objects if present
    const currentBalance = (typeof user.balance === 'object') ? (user.balance.usd ?? 0) : (user.balance || 0);
    user.balance = currentBalance + amount;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Webhook processed successfully',
    });
  } catch (error) {
    console.error('Error handling Helio webhook:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while processing webhook',
    });
  }
};

export const recordManualDeposit = async (req, res) => {
  try {
    const { amount, transactionHash, walletAddress } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const newManualDeposit = {
      amount,
      transactionHash,
      walletAddress,
    };

    // Push manual deposit; balance will be updated when deposit is verified
    user.manualDeposits.push(newManualDeposit);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Manual deposit recorded successfully',
    });
  } catch (error) {
    console.error('Error recording manual deposit:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while recording manual deposit',
    });
  }
};

export default {
  handleWebhook,
  recordManualDeposit,
};
