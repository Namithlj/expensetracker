import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0.01
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Food & Dining', 'Transportation', 'Entertainment', 'Shopping',
      'Bills & Utilities', 'Healthcare', 'Travel', 'Education',
      'Investment', 'Subscription', 'Personal Care', 'Gifts & Donations',
      'Business', 'Insurance', 'Taxes', 'Other'
    ]
  },
  subCategory: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Credit Card', 'Debit Card', 'Digital Wallet', 'Bank Transfer', 'Other'],
    default: 'Cash'
  },
  tags: [{
    type: String,
    trim: true
  }],
  recurring: {
    type: String,
    enum: ['None', 'Daily', 'Weekly', 'Monthly', 'Yearly'],
    default: 'None'
  },
  recurringEndDate: Date,
  location: {
    address: String,
    latitude: Number,
    longitude: Number
  },
  receiptImage: String,
  notes: String,
  isEssential: {
    type: Boolean,
    default: false
  },
  currency: {
    type: String,
    default: 'USD'
  },
  exchangeRate: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    enum: ['Pending', 'Completed', 'Cancelled'],
    default: 'Completed'
  },
  installment: {
    current: Number,
    total: Number
  }
}, {
  timestamps: true
});

expenseSchema.index({ userId: 1, date: -1 });
expenseSchema.index({ userId: 1, category: 1 });
expenseSchema.index({ userId: 1, amount: -1 });

export default mongoose.model('Expense', expenseSchema);