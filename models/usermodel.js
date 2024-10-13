import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  age: { type: Number, required: true },
  pincode: { type: String, required: true },
  role: { type: String, enum: ['user', 'owner'], default: 'user' },
  password: { type: String, required: true, minlength: 8 },
  previousOrders: { type: [mongoose.Schema.Types.ObjectId], ref: 'Order' },
  favourites: { type: [String], default: [] }
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;