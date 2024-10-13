import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  items: [
    {
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'preparing', 'outfordelivery', 'delivered'], default: 'pending' },
  deliveryAddress: { type: String, required: true }
}, {
  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
export default Order;