import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.683a3.7 3.7 0 011.055.485 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0 3.704 3.704 0 014.11 0 1.704 1.704 0 001.89 0A3.7 3.7 0 0118 12.683V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 10-2 0v1h-1V6a1 1 0 10-2 0v1H8V6zm10 8.868a3.704 3.704 0 01-4.055-.036 1.704 1.704 0 00-1.89 0 3.704 3.704 0 01-4.11 0 1.704 1.704 0 00-1.89 0A3.7 3.7 0 012 14.868V17a1 1 0 001 1h14a1 1 0 001-1v-2.132zM9 3a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm3 0a1 1 0 011-1h.01a1 1 0 110 2H13a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
          FoodDelivery
        </Link>
        <nav className="hidden md:flex space-x-4">
          <NavLink to="/">Início</NavLink>
          <NavLink to="/foods">Cardápio</NavLink>
          <NavLink to="/profile">Perfil</NavLink>
          <NavLink to="/cart">
            Carrinho
            {cartItemsCount > 0 && (
              <span className="ml-2 bg-white text-orange-500 rounded-full px-2 py-1 text-xs font-bold">
                {cartItemsCount}
              </span>
            )}
          </NavLink>
        </nav>
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-orange-400 py-2 w-full"
        >
          <NavLink to="/" onClick={() => setIsOpen(false)}>Início</NavLink>
          <NavLink to="/foods" onClick={() => setIsOpen(false)}>Cardápio</NavLink>
          <NavLink to="/profile" onClick={() => setIsOpen(false)}>Perfil</NavLink>
          <NavLink to="/cart" onClick={() => setIsOpen(false)}>
            Carrinho
            {cartItemsCount > 0 && (
              <span className="ml-2 bg-white text-orange-500 rounded-full px-2 py-1 text-xs font-bold">
                {cartItemsCount}
              </span>
            )}
          </NavLink>
        </motion.div>
      )}
    </header>
  );
}

function NavLink({ to, children, onClick }: { to: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      to={to}
      className="block py-2 px-4 text-white hover:bg-orange-600 rounded transition duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

