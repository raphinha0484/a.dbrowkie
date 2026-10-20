import React from 'react';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, cartCount, onOpenCart }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-6 z-40 max-w-md mx-auto">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-adbrowkie-brown font-bold' : 'text-gray-400'}`}
        >
          <Home size={20} />
          <span className="text-[10px]">Início</span>
        </button>

        <button 
          onClick={() => setActiveTab('categories')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'categories' ? 'text-adbrowkie-brown font-bold' : 'text-gray-400'}`}
        >
          <Grid size={20} />
          <span className="text-[10px]">Categorias</span>
        </button>

        <button 
          onClick={onOpenCart}
          className="flex flex-col items-center gap-1 text-gray-400 relative"
        >
          <ShoppingBag size={20} />
          <span className="text-[10px]">Carrinho</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 right-2 bg-adbrowkie-brown text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        <button 
          onClick={() => setActiveTab('admin')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'admin' ? 'text-adbrowkie-brown font-bold' : 'text-gray-400'}`}
        >
          <User size={20} />
          <span className="text-[10px]">Vendedor</span>
        </button>
      </div>
    </nav>
  );
}