import express, { Response, Request, NextFunction } from "express";
import cors from "cors";
const asyncHandler = require("express-async-handler");
require("dotenv").config();

import ticketController from "./src/controllers/ticketController";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes

app.post("/api/v1/count", asyncHandler(ticketController.count));

app.get("*", (_, res) => {
  res.status(404);
  res.send({ success: false, message: "Wrong adress" });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  if (error.name === "MongoServerError" && error.code === 11000) {
    //   console.log("The name is already used");
    //   res.send(400).json({ success: false, message: "The name is already used" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
