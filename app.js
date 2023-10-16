import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { Server, Socket } from "socket.io";
import socket from "./utils/socket.js";
import connectMongoDBSession from "connect-mongodb-session";

import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import productRoute from "./routes/product.js";
import cartRoute from "./routes/cart.js";
import orderRoute from "./routes/order.js";
import chatRoute from "./routes/chat.js";
import commentRoute from "./routes/comment.js";

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
dotenv.config();

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

// API Routes
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);

app.use("/chat", chatRoute);
app.use("/comment", commentRoute);

//Handling Error
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

//Connect mongo session
const MongoDBStore = connectMongoDBSession(session);
const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  collection: "session",
});

// Express Session
app.use(
  session({
    secret: "Hello World",
    cookie: {
      path: "/",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: store,
    resave: true,
    saveUninitialized: true,
  })
);

// Connect Mongoose
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect success");
  } catch (error) {
    throw error;
  }
};

const server = app.listen(port, () => {
  connect();
  console.log("Connected to port 5000");
});

const io = new Server(server);
socket(io);
