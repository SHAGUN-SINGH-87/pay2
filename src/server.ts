import dotenv from "dotenv";
import express from "express";
import payload from "payload";
import config from "./payload.config";

dotenv.config();

const start = async () => {
  const app = express();
  app.use(express.json());

  await payload.init({
    config,
  });

  app.listen(5000, () => {
    console.log("Payload server running on port 5000");
  });
};

start();