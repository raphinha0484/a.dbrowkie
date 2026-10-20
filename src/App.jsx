import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartModal from './components/CartModal';
import BottomNav from './components/BottomNav';

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: 'Brownie Tradicional',
    description: 'Massa molhadinha com chocolate nobre e casquinha crocante.',
    price: 7.00,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&q=80',
    category: 'Brownies'
  },
  {
    id: 2,
    name: 'Copo da Felicidade de Ninho c/ Nutella',
    description: 'Camadas de brownie, brigadeiro de ninho e Nutella pura.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1570145820259-b5b80c5c8bd0?w=300&q=80',
    category: 'Copos'
  },
  {
    id: 3,
    name: 'Cookie Recheado de Brigadeiro',
    description: 'Cookie de baunilha com gotas de chocolate e recheio cremoso.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=300&q=80',
    category: 'Cookies'
  }
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const categories = ['Todos', 'Brownies', 'Copos', 'Cookies'];

  const filteredProducts = selectedCategory === 'Todos' 
    ? SAMPLE_PRODUCTS 
    : SAMPLE_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-adbrowkie-lightCream shadow-xl relative">
      <Header 
        cartCount={cart.length} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="p-4 space-y-4">
        {/* Banner promocional */}
        <div className="bg-adbrowkie-blue/30 p-4 rounded-2xl border border-adbrowkie-blue/50 text-center">
          <p className="text-xs font-bold text-adbrowkie-brown uppercase tracking-wider">Entregas no Campus IFCE</p>
          <p className="text-sm font-medium text-adbrowkie-brown mt-0.5">Doces artesanais fresquinhos para o seu dia! 🍫✨</p>
        </div>

        {/* Carrossel de Categorias */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                selectedCategory === cat 
                  ? 'bg-adbrowkie-brown text-white' 
                  : 'bg-white text-adbrowkie-brown border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lista de Produtos */}
        <div className="space-y-3">
          <h2 className="font-bold text-base text-adbrowkie-brown">Cardápio</h2>
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart} 
            />
          ))}
        </div>
      </main>

      {/* Modal do Carrinho */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
      />

      {/* Navegação Inferior */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
      />
    </div>
  );
}