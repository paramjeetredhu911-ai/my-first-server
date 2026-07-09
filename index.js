const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());

// 1. User Model Schema (Built directly inside)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  age: { type: Number, min: 1 },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.models.User || mongoose.model("User", userSchema);

// 2. CREATE Route (Built directly inside)
app.post("/api/users", async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ message: "Failed to create user", error: error.message });
  }
});

// 3. READ Route (Built directly inside)
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.json({ message: "Day 4 CRUD Server Running" });
});
// Step v: Search Products by Keyword (Must be ABOVE the :id route)
app.get('/products/search', (req, res) => {
    const keyword = req.query.keyword ? req.query.keyword.toLowerCase() : "";
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(keyword));
    res.json(filteredProducts);
});

// Step iii: Get Product by ID
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const product = products.find(p => p.id == productId);
    
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
});

// Step iv: Add a New Product
app.post('/products', (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.status(201).json({ message: "Product added successfully", product: newProduct });
});

// 4. Connect to MongoDB and Start Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(process.env.PORT || 4000, () => {
      console.log("Server running on port 4000");
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });