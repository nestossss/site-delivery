import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Usuario {
  id: string;
  name: string;
  email: string;
  senha: string;
  saldo: string;
}

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    fetch('https://apifakedelivery.vercel.app/users')
      .then(response => response.json())
      .then(data => setUsuario(data[0])); // Usando o primeiro usuário para demonstração
  }, []);

  if (!usuario) return <div className="text-center text-2xl mt-8">Carregando...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-6 text-orange-600">Perfil do Usuário</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
          <p className="text-lg font-semibold bg-orange-50 p-2 rounded">{usuario.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
          <p className="text-lg font-semibold bg-orange-50 p-2 rounded">{usuario.email}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Saldo</label>
          <p className="text-lg font-semibold bg-orange-50 p-2 rounded text-green-600">
            R$ {parseFloat(usuario.saldo).toFixed(2)}
          </p>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
      >
        Editar Perfil
      </motion.button>
    </motion.div>
  );
}
