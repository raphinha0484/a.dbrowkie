import React, { useState } from 'react';
import { X, Trash2, Send } from 'lucide-react';

export default function CartModal({ isOpen, onClose, cart, onRemoveItem, onClearCart }) {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('Campus IFCE');
  const [paymentMethod, setPaymentMethod] = useState('Pix');

  if (!isOpen) return null;

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  // Insira aqui o WhatsApp da loja a.dbrowkie (DDD + Número)
  const PHONE_NUMBER = '5585999999999'; 

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Formata o texto para o WhatsApp
    const itemsList = cart.map((item, index) => `${index + 1}. ${item.name} - R$ ${item.price.toFixed(2)}`).join('\n');
    const message = `🍫 *NOVO PEDIDO - a.dbrowkie*\n\n` +
      `*Cliente:* ${customerName}\n` +
      `*Local de Entrega:* ${location}\n` +
      `*Pagamento:* ${paymentMethod}\n\n` +
      `*Itens do Pedido:*\n${itemsList}\n\n` +
      `*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-end sm:items-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] flex flex-col shadow-2xl animate-in slide-in-from-bottom duration-200">
        
        {/* Header Modal */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="font-bold text-lg text-adbrowkie-brown">Seu Carrinho</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 text-gray-500">
            <X size={20} />
          </button>
        </div>

        {/* Lista de Itens */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2 my-2">
          {cart.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">Seu carrinho está vazio. Adicione uns brownies!</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                  <div>
                    <p className="font-bold text-xs text-adbrowkie-brown">{item.name}</p>
                    <p className="text-xs text-gray-500">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveItem(index)}
                  className="text-red-400 hover:text-red-600 p-1"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Formulário de Finalização */}
        {cart.length > 0 && (
          <form onSubmit={handleCheckout} className="space-y-3 border-t pt-3">
            <div>
              <label className="block text-xs font-bold text-adbrowkie-brown mb-1">Seu Nome:</label>
              <input 
                type="text" 
                required 
                placeholder="Ex: João do IFCE" 
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full text-xs p-2.5 border rounded-xl focus:outline-none focus:border-adbrowkie-darkBlue"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold text-adbrowkie-brown mb-1">Entrega/Retirada:</label>
                <select 
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-xl bg-white"
                >
                  <option value="Retirada no Campus">Retirar no Campus</option>
                  <option value="Entrega na Sala">Entrega na Sala</option>
                  <option value="Delivery">Delivery / Endereço</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-adbrowkie-brown mb-1">Pagamento:</label>
                <select 
                  value={paymentMethod} 
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full text-xs p-2.5 border rounded-xl bg-white"
                >
                  <option value="Pix">Pix</option>
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão">Cartão</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="font-bold text-sm text-adbrowkie-brown">Total:</span>
              <span className="font-extrabold text-lg text-adbrowkie-brown">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>

            <button 
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition active:scale-95 text-sm"
            >
              <Send size={18} /> Enviar Pedido no WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
}