import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-orange-600"
      >
        Seu Carrinho
      </motion.h1>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Seu carrinho está vazio.</p>
          <p className="text-gray-600">Adicione alguns itens deliciosos ao seu carrinho!</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center mb-4 pb-4 border-b last:border-b-0">
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Quantidade: {item.quantity}</p>
                  <p className="text-orange-600 font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                >
                  Remover
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Total:</h2>
            <p className="text-2xl font-bold text-orange-600">R$ {total.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={clearCart}
              className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200"
            >
              Limpar Carrinho
            </button>
            <button className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200">
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
}

