import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TokenValidationPage from './pages/TokenValidationPage';

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-zinc-700 flex flex-col items-center px-4">
        <header className="my-10 w-full md:max-w-3xl text-center">
          <h1 className="text-4xl font-medium text-white mb-6">Bem-vindo</h1>

          <nav className="bg-sky-600 p-4 rounded-lg shadow-lg flex flex-col md:flex-row justify-center items-center md:space-x-6 space-y-4 md:space-y-0">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg text-white transition-transform duration-300 ${
                  isActive ? 'bg-sky-500' : 'bg-sky-400 hover:bg-sky-500 hover:scale-105 transition-transform duration-300'
                }`
              }
            >
              <FaHome className="inline mr-2" /> Início
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg text-white transition-transform duration-300 ${
                  isActive ? 'bg-sky-500' : 'bg-sky-400 hover:bg-sky-500 hover:scale-105 transition-transform duration-300'
                }`
              }
            >
              Criar Conta
            </NavLink>

            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg text-white transition-transform duration-300 ${
                  isActive ? 'bg-sky-500' : 'bg-sky-400 hover:bg-sky-500 hover:scale-105 transition-transform duration-300'
                }`
              }
            >
              Fazer Login
            </NavLink>

            <NavLink
              to="/validate-token"
              className={({ isActive }) =>
                `px-6 py-2 rounded-lg text-white transition-transform duration-300 ${
                  isActive ? 'bg-sky-500' : 'bg-sky-400 hover:bg-sky-500 hover:scale-105 transition-transform duration-300'
                }`
              }
            >
              Validar Token
            </NavLink>
          </nav>
        </header>

        <main className="w-full md:max-w-3xl text-center">
          <Routes>
            <Route path="/" element={<h2 className="text-white">Escolha uma opção acima.</h2>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/validate-token" element={<TokenValidationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
