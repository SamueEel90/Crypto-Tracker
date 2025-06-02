import mongoose from 'mongoose';

const apiCredentialsSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  apiKey: { type: String, required: true, unique: true },
  apiSecret: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('ApiCredentials', apiCredentialsSchema);
