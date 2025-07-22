import mongoose from 'mongoose';

const ipoSchema = new mongoose.Schema({
  company: { type: String, required: true },
  openingDate: { type: Date },
  closingDate: { type: Date },
  listingAt: { type: String },
  listingDate: { type: String },
  issuePrice: { type: Number },
  issueAmountCr: { type: Number },
  blogLink: { type: String }
});

export default mongoose.model('Iposlist', ipoSchema);
