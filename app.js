import express from "express";
import db from "./app/models/index.js";
import cors from "cors";
import bodyParser from "body-parser";
import barangRoute from "./app/routes/barangRoute.js";
import userRoute from "./app/routes/userRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

db.mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected...");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(bodyParser.json());

// Route
app.use(barangRoute);
app.use(userRoute);
// Mengizinkan akses ke direktori 'public'
app.use("/public", express.static("public"));

app.listen(process.env.PORT, () => {
  console.log(`Server berjalan di http://localhost:${process.env.PORT}`);
});

export default app;
