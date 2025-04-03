import mongoose from "mongoose";

// lib/conn.js
const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;

const encodedPassword = encodeURIComponent(MONGODB_PASSWORD);
const encodedUsername = encodeURIComponent(MONGODB_USERNAME); //somewhere I have my global username set to irona so its was not working
const databaseName = "Blog-db";

const connectionStr = `mongodb+srv://${encodedUsername}:${encodedPassword}@blog-nextjs.aukjku0.mongodb.net/${databaseName}?retryWrites=true&w=majority&appName=blog-nextjs`;

export async function connect() {
  try {
    await mongoose.connect(connectionStr);
    mongoose.connection.once("open", () => {
      console.log("MongoDB connected");
    });
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      process.exit(1);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}
