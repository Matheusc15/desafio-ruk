import React, { useState } from 'react';
import { api } from '../services/api';

const TokenValidationPage = () => {
  const [token, setToken] = useState('');
  const [userData, setUserData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToken(e.target.value);
  };

  const handleValidateToken = async () => {
    if (!token) {
      setError('Por favor, insira um token.');
      return;
    }

    try {
      const response = await api.get('/search', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setError(null); 
    } catch (err) {
      setError('Token inválido ou expirado.'); 
      setUserData(null);  
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-700 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-3xl text-center">
        <h1 className="text-4xl font-medium text-white mb-6">Validar Token</h1>

        <div className="my-6">
          <label className="font-medium text-white">Token JWT:</label>
          <input
            type="text"
            value={token}
            onChange={handleTokenChange}
            placeholder="Insira o seu token"
            className="w-full mb-5 p-1 rounded-br-full"
          />

          <button
            onClick={handleValidateToken}
            className="cursor-pointer w-full p-2 bg-sky-400 rounded-br-full
            hover:bg-sky-500 hover:scale-105 transition-transform duration-300"
          >
            Validar Token
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {userData && (
          <div className="mt-5 p-5 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-medium">Dados do Usuário</h2>
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Telefone(s):</strong></p>
            <ul>
              {userData.telephones.map((phone: any, index: number) => (
                <li key={index}>{`(${phone.area_code}) ${phone.number}`}</li>
              ))}
            </ul>
            <p><strong>Criado em:</strong> {new Date(userData.created_at).toLocaleString()}</p>
            <p><strong>Modificado em:</strong> {new Date(userData.modified_at).toLocaleString()}</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TokenValidationPage;
