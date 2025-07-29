import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.png";

export default function Navbar() {
  return (
    <header className="flex w-full items-center justify-between shadow-md bg-white px-10">
      <Link href="/" className="flex items-center w-18 h-auto" aria-label="Ir para a página inicial">
        <Image src={Logo} alt="Logo da Marca" className="w-full h-auto" priority />
      </Link>

      <nav className="hidden md:flex gap-6 text-md font-medium text-gray-600">
        <Link href="#fotos" className="hover:text-blue-600 transition-colors">Fotos</Link>
        <Link href="#comodidades" className="hover:text-blue-600 transition-colors">Comodidades</Link>
        <Link href="#avaliacoes" className="hover:text-blue-600 transition-colors">Avaliações</Link>
        <Link href="#reservar" className="hover:text-blue-600 transition-colors">Reservar</Link>
      </nav>

      <button className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition">
        Contato
      </button>
    </header>
  );
}
