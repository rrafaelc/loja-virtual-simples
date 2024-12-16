'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [carrinho, setCarrinho] = useState<any[]>([]);

  // Carrega os produtos salvos do Local Storage ao montar o componente
  useEffect(() => {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }

    // Carrega os itens do carrinho
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // Adiciona produto ao carrinho
  const adicionarAoCarrinho = (produto: any) => {
    const novosItensCarrinho = [...carrinho, produto];
    setCarrinho(novosItensCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novosItensCarrinho));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Lista de Produtos</h1>

        {/* Container de Cards responsivo */}
        {produtos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {produtos.map((produto, index) => (
              <div
                key={index}
                className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                {/* Imagem do Produto */}
                <div className="h-56 bg-gray-300 relative">
                  <img
                    src="https://via.placeholder.com/300x300?text=Produto" // Imagem genérica de produto
                    alt={produto.nome}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{produto.nome}</h2>
                  <p className="text-lg text-gray-600 mt-2">R$ {produto.preco}</p>
                </div>

                {/* Botão de Compra com ícone de Carrinho */}
                <div className="p-4 bg-gray-100 text-center">
                  <button
                    onClick={() => adicionarAoCarrinho(produto)}
                    className="flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded-md w-full hover:bg-blue-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="white"
                      className="mr-2"
                    >
                      <path d="M7 4V2H3V4H2V5H3V19C3 19.55 3.45 20 4 20H17C17.55 20 18 19.55 18 19V5H19V4H18V2H14V4H7ZM4 19V5H17V19H4ZM7 4H14V2H7V4Z" />
                    </svg>
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-xl">Nenhum produto cadastrado ainda.</p>
        )}
      </div>

      {/* Ícone de Carrinho de Compras usando SVG */}
      <div className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600">
        <a href="/carrinho">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            fill="white"
            className="transition-transform transform hover:scale-110"
          >
            <path d="M7 4V2H3V4H2V5H3V19C3 19.55 3.45 20 4 20H17C17.55 20 18 19.55 18 19V5H19V4H18V2H14V4H7ZM4 19V5H17V19H4ZM7 4H14V2H7V4Z" />
          </svg>
        </a>
      </div>
    </main>
  );
}
