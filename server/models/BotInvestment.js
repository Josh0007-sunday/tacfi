import mongoose from 'mongoose';

const botInvestmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tokenId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  earnings: {
    type: Number,
    default: 0,
  },
  plan: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const BotInvestment = mongoose.model('BotInvestment', botInvestmentSchema);

export default BotInvestment;
