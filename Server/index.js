const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const userRoutes = require("./routes/userRoutes.js");
const productRoutes = require("./routes/productRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const checkoutRoutes = require("./routes/checkoutRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");


dotenv.config();
// const Cart = require("./Models/Cart.js");

const app = express();
app.use(express.json());



const corsOptions = {
  origin: "https://fashora-app.vercel.app/",
  credentials: true,
   methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));


const PORT = process.env.PORT ;

//connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to Feshora API");
});

//API routes

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
