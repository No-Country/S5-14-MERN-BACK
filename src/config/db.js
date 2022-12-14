import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const url = `${connection.connection.host} : ${connection.connection.port}`;
    console.log(`MongoDB connected on: ${url}`);
  } catch (e) {
    console.log(`error ${e.message}`);
    process.exit(1);
  }
};

export default connectDB;
