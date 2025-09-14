import React from "react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, onAddToCart }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md flex flex-col justify-between">
      <h3 className="text-lg font-bold">{name}</h3>
      <p className="text-gray-600 mt-2">₹ 20324234</p>
      <button
        onClick={() => onAddToCart(id)}
        className="mt-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
