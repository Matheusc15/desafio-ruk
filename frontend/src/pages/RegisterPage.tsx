import { RegisterForm } from '../components/RegisterForm'

export default function RegisterPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-700 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-3xl">
        <h1 className="text-4xl font-medium text-white">Registrar usuário</h1>
        <RegisterForm />
      </main>
    </div>
  )
}