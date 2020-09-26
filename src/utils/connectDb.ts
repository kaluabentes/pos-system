import mongoose from 'mongoose'

const connection = {
  isConnected: false
}

async function connectDb() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    auth: {
      authSource: 'admin'
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  connection.isConnected = db.connections[0].readyState
}

export default connectDb
