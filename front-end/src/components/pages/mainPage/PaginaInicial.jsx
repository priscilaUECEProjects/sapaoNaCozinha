export default function PaginaInicial({usuario}) {
  return (
    <div className='flex flex-col gap-4 items-center justify-center min-h-screen bg-pearl text-center font-bold text-[var(--color-dark-green)]'>
      <h1 className="text-4xl sm:text-5xl">Bem vindo, {usuario.NOME}! </h1>
      <p className="text-lg sm:text-2xl">Guarde, organize e calcule suas receitas incríveis de forma prática e acessível. <br/>Sua cozinha, suas regras!</p>
    </div>
  )
}
