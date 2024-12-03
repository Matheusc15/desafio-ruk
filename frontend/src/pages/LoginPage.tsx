import { LoginForm } from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="w-full min-h-screen bg-zinc-700 flex justify-center px-4">
      <main className="my-10 w-full md:max-w-3xl">
        <h1 className="text-4xl font-medium text-white"></h1>
        <LoginForm/>
      </main>
    </div>
  )
}