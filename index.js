const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3000;

let products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Smartphone", price: 499 },
  { id: 3, name: "Headphones", price: 149 },
  { id: 4, name: "Smartwatch", price: 199 }
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});