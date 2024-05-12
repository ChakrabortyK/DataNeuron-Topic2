import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import bodyParser from "body-parser";
//SERVER INITIALIZATIONS
dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//ERROR HANDLER
const errorMdw = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;
  err.errors = err.errors || "Invalid Input";

  return res.status(err.statusCode).json({
    success: false,
    // from: "middleware",
    message: err.message,
    errors: err.errors,
  });
};

//ROUTES IMPORT
import userRoutes from "./routes/userRoute.js";

//USING ROUTES
app.get("/", async (req, res) => {
  res.send("Hello World");
});
app.use("/api/v1/users", userRoutes);

app.use(errorMdw);
//CONNECTION TO DATABASE
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️   Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
