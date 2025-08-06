const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    project: { type: mongoose.Schema.Types.ObjectId, ref:'Project'},
    coverLetter: String,
    proposedPrice: Number,
    status: {type: String, enum: ['pending','accepted', 'rejected'], default: 'pending'},
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Proposal', proposalSchema);