import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js"; 

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/thriftstore";

const products = [
  {
    name: "Classic Denim Jacket",
    price: 1299,
    description: "Vintage blue denim jacket, perfect condition. Size M.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Leather Ankle Boots",
    price: 2499,
    description: "Genuine leather boots, comfortable and stylish. Size 42.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Vintage Leather Backpack",
    price: 1899,
    description: "Classic brown leather backpack with multiple compartments.",
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Retro Aviator Sunglasses",
    price: 799,
    description: "Classic aviator style sunglasses with UV protection.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Cotton Crew Neck T-Shirt",
    price: 499,
    description: "Soft cotton t-shirt, multiple colors available. Size L.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Canvas High-Top Sneakers",
    price: 1799,
    description: "Classic canvas sneakers, white with colored accents. Size 43.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Wool Blend Scarf",
    price: 599,
    description: "Warm wool blend scarf, perfect for winter. Multiple patterns.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Leather Crossbody Bag",
    price: 1499,
    description: "Compact leather crossbody bag, adjustable strap.",
    category: "Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Vintage Wristwatch",
    price: 3499,
    description: "Classic analog wristwatch with leather strap. Working condition.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Corduroy Pants",
    price: 999,
    description: "Comfortable corduroy pants, olive green. Size 32.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Canvas Tote Bag",
    price: 399,
    description: "Eco-friendly canvas tote bag, perfect for daily use.",
    category: "Bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Polaroid Camera",
    price: 4499,
    description: "Vintage instant film camera, includes film pack.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Knit Beanie Hat",
    price: 349,
    description: "Warm knitted beanie, unisex design. Multiple colors.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Vintage Typewriter",
    price: 5999,
    description: "Collectible manual typewriter, excellent condition.",
    category: "Collectibles",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Denim Jeans",
    price: 1199,
    description: "Classic straight-fit jeans, dark wash. Size 32x32.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Leather Belt",
    price: 699,
    description: "Genuine leather belt with metal buckle. Adjustable.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Canvas Sneakers",
    price: 1599,
    description: "Comfortable canvas sneakers, perfect for casual wear. Size 42.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Leather Wallet",
    price: 899,
    description: "Classic leather wallet with card slots and cash compartment.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Hooded Sweatshirt",
    price: 1399,
    description: "Comfortable hooded sweatshirt, gray color. Size M.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Leather Messenger Bag",
    price: 2199,
    description: "Professional leather messenger bag, laptop compartment included.",
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Running Shoes",
    price: 2799,
    description: "Lightweight running shoes, excellent cushioning. Size 43.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Cotton Button Shirt",
    price: 899,
    description: "Classic button-down shirt, white. Size L.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Leather Gloves",
    price: 799,
    description: "Warm leather gloves, perfect for winter. Size M.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Canvas Backpack",
    price: 1299,
    description: "Durable canvas backpack with padded straps. Multiple pockets.",
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Vintage Radio",
    price: 3999,
    description: "Retro-style radio, working condition. Great for decoration.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Wool Cardigan",
    price: 1699,
    description: "Warm wool cardigan, beige color. Size M.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=600&fit=crop&q=80",
  },
  {
    name: "Leather Loafers",
    price: 2299,
    description: "Classic leather loafers, brown. Size 42.",
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=600&fit=crop&q=80",
  },
];

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("Data Imported Successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error Seeding Data:", err);
    mongoose.connection.close();
  }
};

seedData();
