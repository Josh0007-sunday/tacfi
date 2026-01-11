import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false
  },
  plan: {
    type: String,
    enum: ['basic', 'pro', 'enterprise', 'free'],
    default: 'free'
  },
  // Balance is a numeric value for simplicity
  balance: {
    type: Number,
    default: 0
  },
  manualDeposits: [{
    amount: {
      type: Number,
      required: true
    },
    transactionHash: {
      type: String
    },
    walletAddress: {
      type: String
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'rejected'],
      default: 'pending'
    },
    isProcessed: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  depositAddress: {
    type: String,
    default: '6tiGkVDyQB6884Lhm3fUnytGRe6CP1zrdkfxn7YXsWCf'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  // When manual deposits change, apply verified deposits to balance
  if (this.isModified('manualDeposits')) {
    this.manualDeposits.forEach(deposit => {
      if (deposit.status === 'verified' && !deposit.isProcessed) {
        this.balance = (this.balance || 0) + (deposit.amount || 0);
        deposit.isProcessed = true;
      }
    });
  }

});

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = mongoose.model('User', userSchema);

export default User;
