import { useState, useRef, FormEvent } from 'react'
import { api } from '../services/api'

export function RegisterForm() {
  const [successMessage, setSuccessMessage] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)
  const areaCodeRef = useRef<HTMLInputElement | null>(null)
  const numberRef = useRef<HTMLInputElement | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !areaCodeRef.current?.value ||
      !numberRef.current?.value
    ) {
      setError('Todos os campos são obrigatórios!')
      return
    }

    const phone = {
      number: parseInt(numberRef.current?.value || '0'),
      area_code: parseInt(areaCodeRef.current?.value || '0'),
    }

    try {
      const response = await api.post('/register', {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        telephones: [phone],
      })

      console.log(response.data)

      if (nameRef.current) nameRef.current.value = ''
      if (emailRef.current) emailRef.current.value = ''
      if (passwordRef.current) passwordRef.current.value = ''
      if (areaCodeRef.current) areaCodeRef.current.value = ''
      if (numberRef.current) numberRef.current.value = ''

      setSuccessMessage(true)

      setTimeout(() => setSuccessMessage(false), 5000)

      setError(null)
    } catch (err) {
      setError('Erro ao registrar usuário. Tente novamente.')
    }
  }

  return (
    <form className="flex flex-col my-6" onSubmit={handleSubmit}>
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full text-center">
            <p className="text-green-600 font-bold">Usuário registrado com sucesso!</p>
            <button
              onClick={() => setSuccessMessage(false)}
              className="mt-4 p-2 bg-sky-400 text-white rounded-full"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}

      <label className="font-medium text-white">Nome:</label>
      <input
        type="text"
        placeholder="Insira o seu nome completo."
        className="w-full mb-5 p-1 rounded-br-full"
        ref={nameRef}
      />
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
        placeholder="Crie uma senha"
        className="w-full mb-5 p-1 rounded-br-full"
        ref={passwordRef}
      />
      <label className="font-medium text-white flex flex-col">Telefone:</label>

      <div className="flex space-x-2 mb-5">
        <input
          type="text"
          placeholder="DDD"
          className="w-12 p-1 rounded-md"
          ref={areaCodeRef}
        />
        <input
          type="text"
          placeholder="Insira o seu número de telefone"
          className="w-11/12 p-1 rounded-br-full"
          ref={numberRef}
        />
      </div>

      <input
        type="submit"
        value="Registrar"
        className="cursor-pointer w-full p-2 bg-sky-400 rounded-br-full
        hover:bg-sky-500 hover:scale-105 transition-transform duration-300"
      />
    </form>
  )
}
