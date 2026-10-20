import React from 'react';
import { Plus } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex gap-3 items-center">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-24 h-24 object-cover rounded-xl bg-adbrowkie-blue/20 flex-shrink-0"
      />
      <div className="flex-1 flex flex-col justify-between h-full min-w-0">
        <div>
          <h3 className="font-bold text-adbrowkie-brown text-sm leading-snug truncate">{product.name}</h3>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{product.description}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-extrabold text-adbrowkie-brown text-sm">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-adbrowkie-blue hover:bg-adbrowkie-darkBlue text-adbrowkie-brown p-2 rounded-xl transition shadow-sm active:scale-95 flex items-center gap-1 text-xs font-bold"
          >
            <Plus size={16} /> Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}