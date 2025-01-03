import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the TypeScript interface for the User document
export interface IUser extends Document {
  name: string;
  email: string;
}

// Create the Mongoose schema
const UserSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Export the Mongoose model
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
