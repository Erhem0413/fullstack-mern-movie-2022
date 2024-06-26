import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import dotenv from "dotenv"; 
import routes from "./src/routes/index.js";
import { log } from "console";

dotenv.config();

mongoose.set('strictQuery', false);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 3002;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/filmox', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    server.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

  // Энэ код нь Express болон Mongoose-г ашиглан Node.js серверийг тохируулж, MongoDB ашиглан RESTful API үүсгэнэ. Энэ нь дунд програмыг эхлүүлж, API чиглүүлэлтүүдийг холбож, MongoDB-тэй холбогдож, серверийг заасан порт дээр сонсож эхэлдэг.