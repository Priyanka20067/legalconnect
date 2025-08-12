import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in your .env file');
}

let isConnected: boolean = false;

export default async function connectDB() {
  if (isConnected) {
    console.log('MongoDB already connected');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      retryWrites: true,
      w: 'majority',
    });
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}