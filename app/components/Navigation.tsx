import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="bg-red-600 p-4 text-white">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <Link href="/" className="font-bold">
            CompreJa
          </Link>

          <Link href="/categorias" className="font-bold">
            Categorias
          </Link>

          <Link href="/ofertas" className="font-bold">
            Ofertas
          </Link>
        </div>

        <div className="flex-grow flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar produtos, marcas e muito mais"
            className="w-full max-w-md p-2 rounded-lg"
          />
          <div>Lupa</div>
        </div>

        <div className="flex gap-4">
          <Link href="/carrinho" className="font-bold">
            Carrinho
          </Link>
        </div>
      </div>
    </nav>
  );
};
