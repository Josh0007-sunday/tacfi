import BotInvestment from '../models/BotInvestment.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

const PLAN_RATES = {
  free: 0.0001,
  basic: 0.001,
  pro: 0.01,
  enterprise: 0.1,
};

const updateBalances = async () => {
  console.log('Starting balance update process...');

  try {
    const activeInvestments = await BotInvestment.find({ isActive: true }).populate('user');

    if (activeInvestments.length === 0) {
      console.log('No active investments found. Nothing to update.');
      return;
    }

    console.log(`Found ${activeInvestments.length} active investments.`);

    for (const investment of activeInvestments) {
      const user = investment.user;

      if (!user) {
        console.warn(`Investment ${investment._id} has no associated user. Skipping.`);
        continue;
      }

      const plan = investment.plan || 'free';
      const rate = PLAN_RATES[plan];

      if (rate === undefined) {
        console.warn(`Investment ${investment._id} has an unknown plan: "${plan}". Skipping.`);
        continue;
      }

      const earnings = investment.amount * rate;

      const session = await BotInvestment.startSession();
      session.startTransaction();

      try {
        // Update investment's earnings
        investment.earnings = (investment.earnings || 0) + earnings;
        await investment.save({ session });

        // Update user's balance
        const updatedUser = await User.findByIdAndUpdate(
          user._id,
          { $inc: { balance: earnings } },
          { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();

        if (updatedUser) {
          console.log(`Updated balance for user ${user._id}. New balance: ${updatedUser.balance}. Earnings: ${earnings}`);
        } else {
          console.error(`Failed to update balance for user ${user._id}.`);
        }
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Error during transaction for user ${user._id}:`, error);
      }
    }

    console.log('Balance update process finished.');
  } catch (error) {
    console.error('An error occurred during the balance update process:', error);
  }
};

export { updateBalances };
