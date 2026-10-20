import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function Header({ cartCount, onOpenCart }) {
  return (
    <header className="sticky top-0 z-40 bg-adbrowkie-blue px-4 py-3 shadow-md">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.jpg" 
            alt="a.dbrowkie logo" 
            className="w-12 h-12 rounded-full border-2 border-adbrowkie-brown object-cover shadow-sm"
          />
          <div>
            <h1 className="font-bold text-lg text-adbrowkie-brown leading-tight">a.dbrowkie</h1>
            <p className="text-xs text-adbrowkie-brown/80 font-medium">Doceria • IFCE</p>
          </div>
        </div>

        <button 
          onClick={onOpenCart}
          className="relative p-2.5 bg-white/90 rounded-full text-adbrowkie-brown shadow hover:bg-white transition active:scale-95"
        >
          <ShoppingBag size={22} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-adbrowkie-brown text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}