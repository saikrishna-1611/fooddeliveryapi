import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type:String},
  location: { type: String, required: true },
  genre: { type: String, required: true },
  phoneNumber: { type: String, required: true }
}, {
  timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
export default Restaurant;