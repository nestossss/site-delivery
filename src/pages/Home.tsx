import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Restaurant {
  id: string;
  name: string;
  rating: string;
  image: string;
  description: string;
}

export default function Home() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    fetch('https://apifakedelivery.vercel.app/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8 text-center text-orange-600"
      >
        Descubra Restaurantes Incríveis
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {restaurants.map((restaurant, index) => (
          <motion.div
            key={restaurant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/restaurant/${restaurant.id}`} className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative" style={{ height: '200px' }}>
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/300x200?text=Imagem+Indisponível';
                  }}
                />
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 py-1 rounded-bl-lg">
                  <span className="text-yellow-300 mr-1">★</span>
                  <span className="font-medium">{restaurant.rating}</span>
                </div>
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">{restaurant.name}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{restaurant.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-orange-600 font-medium">Entrega grátis</span>
                  <span className="text-sm text-gray-500">30-40 min</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
