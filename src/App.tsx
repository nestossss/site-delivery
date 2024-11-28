import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import RestaurantDetail from './pages/RestaurantDetail';
import FoodItems from './pages/FoodItems';
import UserProfile from './pages/UserProfile';
import './index.css';
import './App.css';
import CartPage from './pages/CartPage';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen text-gray-900 font-sans">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 w-full max-w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/foods" element={<FoodItems />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/cart" element={< CartPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

