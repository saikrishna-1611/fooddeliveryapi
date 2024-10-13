import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  isAvailable: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Item = mongoose.model('Item', itemSchema);
export default Item;