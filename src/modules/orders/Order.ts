import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
      id: mongoose.Schema.Types.ObjectId,
      category: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  }
})

export default mongoose.models.Order || mongoose.model('Order', OrderSchema)
