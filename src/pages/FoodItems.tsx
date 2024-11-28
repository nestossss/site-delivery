import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface Food {
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

export default function FoodItems() {
  const [foods, setFoods] = useState<Food[]>([]);
  const { cart, addToCart, removeFromCart }= useCart();

  useEffect(() => {
    fetch('https://apifakedelivery.vercel.app/foods')
      .then(response => response.json())
      .then(data => setFoods(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-orange-600"
      >
        Explore Nosso Cardápio Delicioso
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.map((food, index) => (
          <motion.div
            key={food.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img 
                src={food.image} 
                alt={food.name} 
                className="h-full w-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/300x200?text=Imagem+Indisponível';
                }}
              />
              <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 rounded-bl-lg">
                <span className="text-yellow-300 mr-1">★</span>
                <span className="font-medium">{food.rating}</span>
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{food.name}</h2>
              <p className="text-gray-600 mb-2 line-clamp-2">{food.description}</p>
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-lg text-orange-600">R$ {food.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500">{food.time}</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-orange-600 font-medium">Entrega grátis</span>
                <span className="text-sm text-gray-500">Tempo de entrega: {food.time}</span>
              </div>
              <button 
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
                onClick={() => {
                  let cartItem = cart.findIndex( (item) => item.id == food.id )
                  console.log(cart, cartItem)
                  if(cartItem != -1)
                    return removeFromCart(food.id);
                  else return addToCart({ id: food.id, name: food.name, price: food.price});
                }}
              >
                {cart.findIndex((item) => item.id == food.id) == -1? "Adicionar ao carrinho": "Remover do carrinho"}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
