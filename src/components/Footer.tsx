import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-orange-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">FoodDelivery</h3>
            <p className="text-sm">Comida deliciosa entregue na sua porta.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:underline">Início</Link></li>
              <li><Link to="/foods" className="hover:underline">Cardápio</Link></li>
              <li><Link to="/profile" className="hover:underline">Perfil</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Fale Conosco</h4>
            <p className="text-sm">Email: suporte@fooddelivery.com</p>
            <p className="text-sm">Telefone: (123) 456-7890</p>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2023 FoodDelivery. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
