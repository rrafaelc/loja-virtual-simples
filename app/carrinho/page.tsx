'use client';
import { useEffect, useState } from 'react';

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState<any[]>([]);

  // Carrega os itens do carrinho do Local Storage ao montar o componente
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  // Função para calcular o valor total do carrinho
  const calcularTotal = () => {
    return carrinho.reduce((total, item) => total + parseFloat(item.preco), 0).toFixed(2);
  };

  // Remove um item do carrinho
  const handleRemoverProduto = (index: number) => {
    const novoCarrinho = carrinho.filter((_, i) => i !== index);
    setCarrinho(novoCarrinho);
    localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">Carrinho de Compras</h1>

        {carrinho.length > 0 ? (
          <div>
            <ul className="space-y-4">
              {carrinho.map((produto, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-4 bg-white border rounded-lg shadow-md"
                >
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">{produto.nome}</h2>
                    <p className="text-gray-600">R$ {produto.preco}</p>
                  </div>

                  {/* Botão de Remover Produto */}
                  <button
                    onClick={() => handleRemoverProduto(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>

            {/* Total do Carrinho */}
            <div className="mt-6 flex justify-between items-center border-t pt-4">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-xl font-semibold">R$ {calcularTotal()}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">Seu carrinho está vazio.</p>
        )}
      </div>
    </main>
  );
}
