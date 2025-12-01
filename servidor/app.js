import dotenv from "dotenv";
import express from "express";
dotenv.config();
const app = express();
import router from "./src/routes.js";

app.use(express.json())

app.use("/",router);

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})