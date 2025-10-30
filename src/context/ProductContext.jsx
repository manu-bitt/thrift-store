import React, { createContext, useContext, useState, useEffect } from 'react';

// Sample product data with placeholder image URLs
const sampleProducts = [
  {
    id: 1,
    title: "Vintage Denim Jacket",
    description: "Classic blue denim jacket from the 90s, perfect condition",
    price: 89.99,
    images: [
      "https://levi.in/cdn/shop/files/6bf78008b77807ca8888a80a02e518b4.jpg?v=1740740507",
      "https://levi.in/cdn/shop/files/fa1a7deb0d9c087fad2734c4d3f1123c.jpg?v=1740740507",
      "https://levi.in/cdn/shop/files/8e13a4f01eab2496a1fd553d28b2240f.jpg?v=1740740507"
    ],
    condition: "Excellent",
    year: 1995,
    lowestAsk: 79.99,
    highestBid: 99.99,
    totalSales: 15,
    sizes: ["M", "L"],
    category: "clothing",
    brand: "Levi's",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 2,
    title: "Retro Sneakers",
    description: "Vintage running shoes in great condition",
    price: 129.99,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1983f2e1-0271-479c-bada-6176a571fa4f/NIKE+VOMERO+18.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/845727d1-ba37-418a-a382-23d421ac82c8/NIKE+VOMERO+18.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2946648c-e96e-490a-a1e8-284c2a5fa653/NIKE+VOMERO+18.png"
    ],
    condition: "Good",
    year: 1998,
    lowestAsk: 119.99,
    highestBid: 139.99,
    totalSales: 8,
    sizes: ["42", "43"],
    category: "shoes",
    brand: "Nike",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 3,
    title: "Classic Watch",
    description: "Vintage watch from the 70s, still working perfectly",
    price: 45.99,
    images: [
      "https://shop.timexindia.com/cdn/shop/files/TW2Y02200_363x.jpg?v=1740484984",
      "https://shop.timexindia.com/cdn/shop/files/TW2Y02200_E_363x.jpg?v=1740484984",
      "https://shop.timexindia.com/cdn/shop/files/TW2Y02200_B_363x.jpg?v=1740484984"
    ],
    condition: "Very Good",
    year: 1975,
    lowestAsk: 39.99,
    highestBid: 49.99,
    totalSales: 12,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Timex",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 4,
    title: "Designer Sunglasses",
    description: "Stylish sunglasses with UV protection",
    price: 79.99,
    images: [
      "https://india.ray-ban.com/media/catalog/product/0/r/0rb8097926748p21_1.png",
      "https://india.ray-ban.com/media/catalog/product/0/r/0rb8097926748p21shadlt_3.png",
      "https://india.ray-ban.com/media/catalog/product/0/r/0rb8097926748p21shadcfr_6.png"
    ],
    condition: "Like New",
    year: 2023,
    lowestAsk: 69.99,
    highestBid: 89.99,
    totalSales: 5,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Ray-Ban",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 5,
    title: "Luxury T-Shirt",
    description: "Premium cotton t-shirt with gradient design",
    price: 149.99,
    images: [
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-gradient-cotton-t-shirt--HQY42WFSB904_PM1_Worn%20view.png?wid=2400&hei=2400",
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-gradient-cotton-t-shirt--HQY42WFSB904_PM2_Front%20view.png?wid=4096&hei=4096",
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-gradient-cotton-t-shirt--HQY42WFSB904_PM1_Cropped%20worn%20view.png?wid=2400&hei=2400"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 139.99,
    highestBid: 159.99,
    totalSales: 3,
    sizes: ["S", "M", "L", "XL"],
    category: "clothing",
    brand: "Louis Vuitton",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 6,
    title: "Leather Boots",
    description: "Classic leather boots with durable construction",
    price: 199.99,
    images: [
      "https://cdn-images.farfetch-contents.com/25/11/02/63/25110263_55294336_1000.jpg",
      "https://cdn-images.farfetch-contents.com/25/11/02/63/25110263_55294366_1000.jpg",
      "https://cdn-images.farfetch-contents.com/25/11/02/63/25110263_55294359_1000.jpg"
    ],
    condition: "Excellent",
    year: 2023,
    lowestAsk: 189.99,
    highestBid: 209.99,
    totalSales: 7,
    sizes: ["40", "41", "42", "43", "44"],
    category: "shoes",
    brand: "Dr. Martens",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 7,
    title: "Air Jordan 1 Low",
    description: "Classic Air Jordan 1 Low sneakers in pristine condition",
    price: 179.99,
    images: [
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/022bd9c4-6eb9-41b7-969d-85d8b9f0a030/AIR+JORDAN+1+LOW.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/bb412710-c08a-4d06-87b0-6859e55f3794/AIR+JORDAN+1+LOW.png",
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/77081e9a-f6c7-4bd9-84c4-061c36cbee41/AIR+JORDAN+1+LOW.png"
    ],
    condition: "Like New",
    year: 2024,
    lowestAsk: 169.99,
    highestBid: 189.99,
    totalSales: 12,
    sizes: ["40", "41", "42", "43", "44"],
    category: "shoes",
    brand: "Nike",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 8,
    title: "Designer Sneakers",
    description: "Luxury designer sneakers with premium materials",
    price: 299.99,
    images: [
      "https://cdn-images.farfetch-contents.com/15/62/45/04/15624504_28291154_1000.jpg",
      "https://cdn-images.farfetch-contents.com/15/62/45/04/15624504_28288460_1000.jpg",
      "https://cdn-images.farfetch-contents.com/15/62/45/04/15624504_28291158_1000.jpg"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 289.99,
    highestBid: 309.99,
    totalSales: 5,
    sizes: ["41", "42", "43", "44", "45"],
    category: "shoes",
    brand: "Luxury Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 9,
    title: "Green Sneakers",
    description: "Stylish green sneakers with modern design",
    price: 159.99,
    images: [
      "https://assets.ajio.com/medias/sys_master/root/20241230/aa0B/67729563c148fa1b30690c2d/-473Wx593H-469689787-green-MODEL.jpg",
      "https://assets.ajio.com/medias/sys_master/root/20241230/2W1d/677294f40f47f80c872b0986/-473Wx593H-469689787-green-MODEL3.jpg",
      "https://assets.ajio.com/medias/sys_master/root/20241230/6klG/67729831c148fa1b306919b0/-473Wx593H-469689787-green-MODEL5.jpg"
    ],
    condition: "Excellent",
    year: 2024,
    lowestAsk: 149.99,
    highestBid: 169.99,
    totalSales: 8,
    sizes: ["40", "41", "42", "43"],
    category: "shoes",
    brand: "Fashion Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 10,
    title: "Casual Graphic T-Shirt",
    description: "Stylish graphic t-shirt with modern design",
    price: 49.99,
    images: [
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410521526010/1FdZD7EhOs-410521526010_1_1.jpg",
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410521526010/J0adJUw_Zj-410521526010_2_1.jpg",
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410521526010/Hg0reTpPz2-410521526010_3_1.jpg"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 44.99,
    highestBid: 54.99,
    totalSales: 15,
    sizes: ["S", "M", "L", "XL"],
    category: "clothing",
    brand: "Fashion Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 11,
    title: "Lacoste Polo T-Shirt",
    description: "Classic Lacoste polo t-shirt with iconic crocodile logo",
    price: 89.99,
    images: [
      "https://www.lacoste.in/media/catalog/product/t/h/th3837_70v_24.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=900&width=900&canvas=900:900",
      "https://www.lacoste.in/media/catalog/product/t/h/th3837_70v_22.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=900&width=900&canvas=900:900",
      "https://www.lacoste.in/media/catalog/product/t/h/th3837_70v_31.jpg?optimize=medium&bg-color=255,255,255&fit=bounds&height=900&width=900&canvas=900:900"
    ],
    condition: "Like New",
    year: 2024,
    lowestAsk: 79.99,
    highestBid: 99.99,
    totalSales: 10,
    sizes: ["S", "M", "L", "XL", "XXL"],
    category: "clothing",
    brand: "Lacoste",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 12,
    title: "Hugo Boss Premium T-Shirt",
    description: "Premium cotton t-shirt from Hugo Boss with elegant design",
    price: 129.99,
    images: [
      "https://images.hugoboss.com/is/image/boss/hbeu50538958_102_350?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1744818904000&wid=1440&hei=2182&fmt=webp",
      "https://images.hugoboss.com/is/image/boss/hbeu50538958_102_100?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1744818904000&wid=1440&hei=2182&fmt=webp",
      "https://images.hugoboss.com/is/image/boss/hbeu50538958_102_360?$re_fullPageZoom$&qlt=85&fit=crop,1&align=1,1&bgcolor=ebebeb&lastModified=1744818904000&wid=1440&hei=2182&fmt=webp"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 119.99,
    highestBid: 139.99,
    totalSales: 7,
    sizes: ["S", "M", "L", "XL"],
    category: "clothing",
    brand: "Hugo Boss",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 13,
    title: "Rolex Submariner Hulk",
    description: "Luxury Rolex Submariner Date watch with green dial and bezel",
    price: 24999.99,
    images: [
      "https://cdn11.bigcommerce.com/s-eie9lsi1uc/images/stencil/1280x1280/products/105445/2467857/rolex-submariner-116610lv-hulk-mens-watch-131__79130.1741880519.jpg?c=1",
      "https://cdn11.bigcommerce.com/s-eie9lsi1uc/images/stencil/1280x1280/products/105445/2467859/rolex-submariner-date-hulk-oystersteel-men-s-watch-116610lv-112__23720.1741880519.jpg?c=1",
      "https://cdn11.bigcommerce.com/s-eie9lsi1uc/images/stencil/1920w/products/105445/2467860/rolex-submariner-date-hulk-oystersteel-men-s-watch-116610lv-114__04738.1741880519.jpg?c=1"
    ],
    condition: "Like New",
    year: 2023,
    lowestAsk: 23999.99,
    highestBid: 25999.99,
    totalSales: 3,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Rolex",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 14,
    title: "Audemars Piguet Royal Oak",
    description: "Premium Audemars Piguet Royal Oak watch with stainless steel case",
    price: 34999.99,
    images: [
      "https://cdn-jnbkl.nitrocdn.com/DSyXimFVbLZsDRQHgxpswYJEIlNbdghE/assets/images/optimized/rev-5ab57b1/luxurysouq.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/07/Audemars-Piguet-Royal-Oak-15407St.Oo_.1220St.01.jpg.webp",
      "https://cdn-jnbkl.nitrocdn.com/DSyXimFVbLZsDRQHgxpswYJEIlNbdghE/assets/images/optimized/rev-5ab57b1/luxurysouq.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/07/Audemars-Piguet-Royal-Oak-15407St.Oo_.1220St.01-1.jpg.webp",
      "https://cdn-jnbkl.nitrocdn.com/DSyXimFVbLZsDRQHgxpswYJEIlNbdghE/assets/images/optimized/rev-5ab57b1/luxurysouq.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/07/Audemars-Piguet-Royal-Oak-15407St.Oo_.1220St.01-2.jpg.webp"
    ],
    condition: "New",
    year: 2023,
    lowestAsk: 33999.99,
    highestBid: 35999.99,
    totalSales: 2,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Audemars Piguet",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 15,
    title: "Patek Philippe Nautilus",
    description: "Exclusive Patek Philippe Nautilus watch with elegant design",
    price: 44999.99,
    images: [
      "https://luxurysouq.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/07/Patek-Philippe-Nautilus-57121A-001.png.webp",
      "https://luxurysouq.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/07/Patek-Philippe-Nautilus-57121A-001-3.png.webp",
      "https://luxurysouq.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2023/07/Patek-Philippe-Nautilus-57121A-001-1.png.webp"
    ],
    condition: "New",
    year: 2023,
    lowestAsk: 43999.99,
    highestBid: 45999.99,
    totalSales: 1,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Patek Philippe",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 16,
    title: "Louis Vuitton Embellished Souvenir Blouson",
    description: "Luxury Louis Vuitton jacket with embellished details",
    price: 3999.99,
    images: [
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-embellished-souvenir-blouson--HTB31WRAO900_PM1_Worn%20view.png?wid=2400&hei=2400",
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-embellished-souvenir-blouson--HTB31WRAO900_PM2_Front%20view.png?wid=2400&hei=2400",
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-embellished-souvenir-blouson--HTB31WRAO900_PM1_Cropped%20worn%20view.png?wid=2400&hei=2400"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 3899.99,
    highestBid: 4099.99,
    totalSales: 2,
    sizes: ["S", "M", "L", "XL"],
    category: "clothing",
    brand: "Louis Vuitton",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 17,
    title: "Designer Leather Jacket",
    description: "Premium leather jacket with modern design",
    price: 1299.99,
    images: [
      "https://www.net-a-porter.com/variants/images/29419655932641979/in/w2000_q60.jpg",
      "https://www.net-a-porter.com/variants/images/29419655932641979/ou/w2000_q60.jpg",
      "https://www.net-a-porter.com/variants/images/29419655932641979/cu/w2000_q60.jpg"
    ],
    condition: "Like New",
    year: 2023,
    lowestAsk: 1199.99,
    highestBid: 1399.99,
    totalSales: 5,
    sizes: ["S", "M", "L"],
    category: "clothing",
    brand: "Luxury Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 18,
    title: "Classic Denim Jacket",
    description: "Timeless denim jacket with comfortable fit",
    price: 299.99,
    images: [
      "https://www.net-a-porter.com/variants/images/23471478575798049/in/w2000_q60.jpg",
      "https://www.net-a-porter.com/variants/images/23471478575798049/bk/w2000_q60.jpg",
      "https://www.net-a-porter.com/variants/images/23471478575798049/cu/w2000_q60.jpg"
    ],
    condition: "Excellent",
    year: 2023,
    lowestAsk: 279.99,
    highestBid: 319.99,
    totalSales: 8,
    sizes: ["S", "M", "L", "XL"],
    category: "clothing",
    brand: "Fashion Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 19,
    title: "Louis Vuitton LV Waimea L Sunglasses",
    description: "Luxury sunglasses with iconic LV monogram details",
    price: 499.99,
    images: [
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-waimea-l-sunglasses--Z1583E_PM2_Front%20view.png?wid=2400&hei=2400",
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-waimea-l-sunglasses--Z1583E_PM1_Closeup%20view.png?wid=2400&hei=2400",
      "https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-waimea-l-sunglasses--Z1583E_PM1_Cropped%20worn%20view.png?wid=2400&hei=2400"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 479.99,
    highestBid: 519.99,
    totalSales: 2,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Louis Vuitton",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 20,
    title: "Designer Aviator Sunglasses",
    description: "Classic aviator style sunglasses with premium materials",
    price: 299.99,
    images: [
      "https://himalayaoptical.com/cdn/shop/products/0BE4293__380687_030A_1024x1024.jpg?v=1670838590",
      "https://himalayaoptical.com/cdn/shop/products/0BE4293__380687_090A_1024x1024.jpg?v=1670838590",
      "https://himalayaoptical.com/cdn/shop/files/8056597044776_4_1024x1024.jpg?v=1725255755"
    ],
    condition: "Like New",
    year: 2023,
    lowestAsk: 279.99,
    highestBid: 319.99,
    totalSales: 4,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Luxury Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 21,
    title: "Gucci GG1460S Sunglasses",
    description: "Classic Gucci sunglasses with signature GG logo",
    price: 399.99,
    images: [
      "https://lozuri.com/cdn/shop/files/processed-1ad3a0658007fcd9c5f67c60be14777ddb4e2841976a732f246f7087705f7592-1717422373764.jpg?format=webp&v=1717422384&width=768",
      "https://lozuri.com/cdn/shop/files/processed-9df4658efc21e605e917c03478fd5ff6065bc15067abf92cd19cc8f07b3c9845-1717422375935.jpg?format=webp&v=1717422384&width=768",
      "https://lozuri.com/cdn/shop/files/processed-a48f53cf4aca620ba6d6d36a759a07e03dab461e7d6e5cda24d9e315c3ffe6ac-1717422380364.jpg?format=webp&v=1717422384&width=768"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 379.99,
    highestBid: 419.99,
    totalSales: 3,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Gucci",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 22,
    title: "Louis Vuitton Christopher MM Backpack",
    description: "Luxury backpack with monogram canvas and leather trim",
    price: 2499.99,
    images: [
      "https://www.henrykstudio.com/cdn/shop/files/Untitled-1_0003_louis-vuitton-christopher-mm-a05-bags--M23764_PM2_Frontview_490x@2x.progressive.jpg?v=1705572307",
      "https://www.henrykstudio.com/cdn/shop/files/Untitled-1_0002_louis-vuitton-christopher-mm-a05-bags--M23764_PM1_Backview_490x@2x.progressive.jpg?v=1705572307",
      "https://www.henrykstudio.com/cdn/shop/files/Untitled-1_0001_louis-vuitton-christopher-mm-a05-bags--M23764_PM1_Interiorview_490x@2x.progressive.jpg?v=1705572307"
    ],
    condition: "New",
    year: 2024,
    lowestAsk: 2399.99,
    highestBid: 2599.99,
    totalSales: 1,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Louis Vuitton",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 23,
    title: "Designer Leather Backpack",
    description: "Premium leather backpack with modern design and multiple compartments",
    price: 899.99,
    images: [
      "https://www.henrykstudio.com/cdn/shop/files/7_4cb03650-613f-4e74-9d40-ad4d60680117_490x@2x.progressive.jpg?v=1701155411",
      "https://www.henrykstudio.com/cdn/shop/files/2_88f3036a-8b2c-489c-ad92-5edbb8199cab_490x@2x.progressive.jpg?v=1701155363",
      "https://www.henrykstudio.com/cdn/shop/files/5_cd956a28-0935-4650-8527-b8b596fb372d_490x@2x.progressive.jpg?v=1701155363"
    ],
    condition: "Like New",
    year: 2023,
    lowestAsk: 849.99,
    highestBid: 949.99,
    totalSales: 4,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Luxury Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  },
  {
    id: 24,
    title: "Fashion Backpack",
    description: "Stylish backpack with trendy design and practical features",
    price: 299.99,
    images: [
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410475120001/OKcJQCWZx-410475120001_1.jpg",
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410475120001/Olb_ABZn4K-410475120001_4.jpg",
      "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000410475120001/S7mMkRAJp-410475120001_5.jpg"
    ],
    condition: "Excellent",
    year: 2023,
    lowestAsk: 279.99,
    highestBid: 319.99,
    totalSales: 6,
    sizes: ["One Size"],
    category: "accessories",
    brand: "Fashion Brand",
    lastUpdated: "2024-04-21",
    stock: 1
  }
];

const ProductContext = createContext(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // For now, we'll use our sample data
      setProducts(sampleProducts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshProducts = () => {
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading, error, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
}; 