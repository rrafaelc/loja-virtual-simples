'use client';
import Image from 'next/image';
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
                  <Image
                    width={300}
                    height={300}
                    src="/produto.jpg"
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
    </main>
  );
}
