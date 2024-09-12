const mongoose = require('mongoose');

const operationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    comment: { type: String },
    date: { type: Date, default: Date.now },
});

const Operation = mongoose.model('Operation', operationSchema);
module.exports = Operation;
