import Link from "next/link";

export default function Navbar() {
  return (
    <header className="flex w-full h-20 items-center justify-between shadow-md  absolute top-0 px-10 z-40 bg-transparent">
      <nav className="hidden md:flex gap-6 text-md font-medium text-gray-200 mx-auto">
        <Link href="#fotos" className="hover:text-blue-600 transition-colors">
          Fotos
        </Link>
        <Link
          href="#comodidades"
          className="hover:text-blue-600 transition-colors"
        >
          Comodidades
        </Link>
        <Link
          href="#avaliacoes"
          className="hover:text-blue-600 transition-colors"
        >
          Avaliações
        </Link>
        <Link
          href="#reservar"
          className="hover:text-blue-600 transition-colors"
        >
          Reservar
        </Link>
      </nav>
    </header>
  );
}
