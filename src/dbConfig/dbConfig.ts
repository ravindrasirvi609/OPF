import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  try {
    if (!isConnected) {
      const mongoUri = process.env.MONGO_URI;

      if (!mongoUri) {
        throw new Error("MONGO_URI environment variable is not set");
      }

      await mongoose.connect(mongoUri);
      const connection = mongoose.connection;

      connection.on("connected", () => {
        isConnected = true;
        console.log("MongoDB connected successfully");
      });

      connection.on("error", (err) => {
        console.log(
          "MongoDB connection error. Please make sure MongoDB is running. " +
            err
        );
        process.exit();
      });
    } else {
      // Improved: Return a resolved promise for already connected case
      return Promise.resolve();
    }
  } catch (error) {
    console.log("Something goes wrong!");
    console.error(error);
    throw error;
  }
}
