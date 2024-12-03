import { useState, useRef, FormEvent } from 'react';
import { api } from '../services/api';
import CopyButton from './CopyButton.tsx';

export function LoginForm() {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      setError("Email e senha são obrigatórios!");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/login", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      });

      setToken(response.data.token);
      setError(null);
    } catch (err) {
      setError("Email ou senha incorretos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full min-h-screen bg-zinc-700 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-3xl">
        <h1 className="text-4xl font-medium text-white">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

        <form className="flex flex-col my-6" onSubmit={handleLogin}>
          <label className="font-medium text-white">Email:</label>
          <input
            type="email"
            placeholder="Insira o seu email"
            className="w-full mb-5 p-1 rounded-br-full"
            ref={emailRef}
          />
          <label className="font-medium text-white">Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            className="w-full mb-5 p-1 rounded-br-full"
            ref={passwordRef}
          />
          <input
            type="submit"
            value={loading ? "Carregando..." : "Login"}
            className="cursor-pointer w-full p-2 bg-sky-400 rounded-br-full
            hover:bg-sky-500 hover:scale-105 transition-transform duration-300"
            disabled={loading}
          />
        </form>

        {token && (
          <div className="mt-6">
            <p className="text-white mb-4">Token gerado com sucesso!</p>
            <CopyButton token={token} />
          </div>
        )}
      </main>
    </div>
  );
}
