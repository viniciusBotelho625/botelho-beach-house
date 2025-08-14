import Link from "next/link";
import Image from "next/image";
import Logo from "../../../public/logo.png";

export default function Navbar() {
  return (
    <header className="flex w-full h-20 items-center justify-between shadow-md  absolute top-0 px-10 z-40">
      <Link href="/" className="flex items-center w-18 h-18" aria-label="Ir para a página inicial">
        <Image src={Logo} alt="Logo da Marca" className="w-full h-auto" priority />
      </Link>

      <nav className="hidden md:flex gap-6 text-md font-medium text-gray-200">
        <Link href="#fotos" className="hover:text-blue-600 transition-colors">Fotos</Link>
        <Link href="#comodidades" className="hover:text-blue-600 transition-colors">Comodidades</Link>
        <Link href="#avaliacoes" className="hover:text-blue-600 transition-colors">Avaliações</Link>
        <Link href="#reservar" className="hover:text-blue-600 transition-colors">Reservar</Link>
      </nav>
    </header>
  );
}