import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface Restaurante {
  id: string;
  name: string;
  rating: string;
  image: string;
  description: string;
}

interface Comida {
  id: string;
  name: string;
  price: number;
  time: string;
  delivery: number;
  rating: number;
  image: string;
  restaurantId: string;
  description: string;
}

export default function DetalhesRestaurante() {
  const { id } = useParams<{ id: string }>();
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [comidas, setComidas] = useState<Comida[]>([]);
  const { cart, addToCart, removeFromCart } = useCart();

  useEffect(() => {
    fetch('https://apifakedelivery.vercel.app/restaurants')
      .then(response => response.json())
      .then(data => setRestaurante(data.find((r: Restaurante) => r.id === id) || null));

    fetch('https://apifakedelivery.vercel.app/foods')
      .then(response => response.json())
      .then(data => setComidas(data.filter((f: Comida) => f.restaurantId === id)));
  }, [id]);

  if (!restaurante) return <div className="text-center text-2xl mt-8">Carregando...</div>;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
      >
        <div className="relative h-64">
          <img 
            src={restaurante.image} 
            alt={restaurante.name} 
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://via.placeholder.com/300x200?text=Imagem+Indisponível';
            }}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
            <h1 className="text-3xl font-bold mb-2 text-white">{restaurante.name}</h1>
            <div className="flex items-center text-white">
              <span className="text-yellow-300 mr-1">★</span>
              <span className="font-medium">{restaurante.rating}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">{restaurante.description}</p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-orange-600 font-medium">Entrega grátis</span>
            <span className="text-gray-500">30-40 min</span>
          </div>
        </div>
      </motion.div>

      <h2 className="text-2xl font-bold mb-6 text-orange-600">Cardápio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {comidas.map((comida, index) => (
          <motion.div
            key={comida.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="relative h-48">
              <img 
                src={comida.image} 
                alt={comida.name} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300x200?text=Imagem+Indisponível';
                }}
              />
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 rounded-bl-lg">
                <span className="text-yellow-300 mr-1">★</span>
                <span className="font-medium">{comida.rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{comida.name}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">{comida.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-orange-600">R$ {comida.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">{comida.time}</span>
              </div>
              <button 
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
                onClick={() => {
                  let cartItem = cart.findIndex( (item) => item.id == comida.id )
                  console.log(cart, cartItem)
                  if(cartItem != -1)
                    return removeFromCart(comida.id);
                  else return addToCart({ id: comida.id, name: comida.name, price: comida.price});
                }}
              >
                {cart.findIndex((item) => item.id == comida.id) == -1? "Adicionar ao carrinho" : "Remover do carrinho"}
                </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

