import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false; // Track the connection state.

export const connectToDatabase = async (): Promise<void> => {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI as string, {
      // Mongoose 6+ does not require `useNewUrlParser` or `useUnifiedTopology`
    } as ConnectOptions);

    isConnected = db.connections[0].readyState === 1;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Database connection failed');
  }
};
