// node_modules dependencies
import express from "express";
import path from 'path'
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

// Import routes
import authRoutes from "./routes/auth.js";
import customerRoutes from "./routes/customers.js";
import productsRoutes from "./routes/products.js";


// ExpressInitConfig
const app = express();

// Middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public/upload')));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productsRoutes);



app.listen(8800, () => {
  console.log("API working!");
});