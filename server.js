import mongoose from "mongoose";
import { app } from "./app.js";
import dotenv from "dotenv";

// initialize the environment variables
dotenv.config();
// access the environment variables
const { DB_HOST, PORT } = process.env; // or process.env.DB_HOST if you dont want to destructure

mongoose
  .connect(DB_HOST, {
    // you can run the mongoose connect without these config properties by passing an empty object {}
    // useNewUrlParser: true, // yet to verify if these config properties are deprecated
    // useCreateIndex: true, //
    // useUnifiedTopology: true, //
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running. Use our API on port: 3000");
    });

    console.log("Database connect successful");
  })
  .catch((error) => {
    console.log(`Server not running. Error message: ${error.message}`);
    process.exit(1); // this terminates the mongoose connection
  });
