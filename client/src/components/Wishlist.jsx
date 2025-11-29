import React from "react";
import { useWishlist } from "../context/WishlistContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  if (wishlist.length === 0)
    return <h3 style={{ padding: "2rem" }}>Your wishlist is empty 💖</h3>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Wishlist</h2>
      {wishlist.map((item) => (
        <div
          key={item._id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem 0",
            width: "400px",
          }}
        >
          <span>{item.name}</span>
          <span>₹{item.price}</span>
          <button onClick={() => removeFromWishlist(item._id)}>Remove</button>
        </div>
      ))}
      <button
        onClick={clearWishlist}
        style={{ marginTop: "1rem", background: "black", color: "white" }}
      >
        Clear Wishlist
      </button>
    </div>
  );
};

export default Wishlist;
