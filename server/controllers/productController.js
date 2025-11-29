import Product from "../models/Product.js";


export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const addProduct = async (req, res) => {
  try {
    const { name, price, description, category, image } = req.body;

    if (!name || !price || !image) {
      return res.status(400).json({ message: "Name, price, and image are required" });
    }

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Add product error:", err);
    res.status(500).json({ message: "Server error while adding product" });
  }
};
