import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="bg-red-600 p-4 text-white">
      <div className="flex justify-between items-center gap-4">
        <div className="flex gap-4">
          <Link href="/" className="font-bold">
            CompreJa
          </Link>
        </div>

        <div className="flex gap-4">
          <Link href="/carrinho" className="font-bold">
            Carrinho
          </Link>
          <Link href="/cadastrar-produtos" className="font-bold">
            Cadastrar produtos
          </Link>
        </div>
      </div>
    </nav>
  );
};
