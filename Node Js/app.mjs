import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
import productRouter from "./Routes/productRoutes.mjs";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

//Routers
app.use("/product", productRouter);

//MongoDb Connectivity;

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDB Connected Successfully")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}


app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});