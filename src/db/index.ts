import mongoose from "mongoose";

if (!process.env.MONGODB_URL) {
  throw new Error("MONGO DB URL is not defined in an environment variable");
}

console.log("Connecting to MongoDB");
mongoose.connect(process.env.MONGODB_URL)
