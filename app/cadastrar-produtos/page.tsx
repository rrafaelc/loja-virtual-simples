'use client';
import { useEffect, useState } from 'react';

export default function CadastrarProdutos() {
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [produtos, setProdutos] = useState<any>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Carrega os produtos salvos do Local Storage ao montar o componente
  useEffect(() => {
    const produtosSalvos = localStorage.getItem('produtos');
    if (produtosSalvos) {
      setProdutos(JSON.parse(produtosSalvos));
    }
  }, []);

  const handleRemoverProduto = (index: number) => {
    const novaLista = produtos.filter((_, i) => i !== index);
    setProdutos(novaLista);
    localStorage.setItem('produtos', JSON.stringify(novaLista));
  };

  const handleAdicionarProduto = () => {
    if (nome.trim() && preco) {
      const novoProduto = { nome, preco };
      let novaLista;

      if (editIndex !== null) {
        // Atualiza o produto existente
        novaLista = produtos.map((produto: any, index: number) =>
          index === editIndex ? novoProduto : produto,
        );
        setEditIndex(null);
      } else {
        // Adiciona um novo produto
        novaLista = [...produtos, novoProduto];
      }

      // Atualiza o estado e salva no Local Storage
      setProdutos(novaLista);
      localStorage.setItem('produtos', JSON.stringify(novaLista));

      setNome('');
      setPreco('');
    }
  };

  const handleEditarProduto = (index: number) => {
    const produto = produtos[index];
    setNome(produto.nome);
    setPreco(produto.preco);
    setEditIndex(index);
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Cadastrar Produtos</h1>

      {/* Formulário */}
      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Nome do Produto</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Digite o nome"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-gray-700">Preço</label>
        <input
          type="number"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Digite o preço"
        />
      </div>

      <button
        onClick={handleAdicionarProduto}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
      >
        {editIndex !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
      </button>

      {/* Lista de Produtos */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Produtos Cadastrados:</h2>
        {produtos.length > 0 ? (
          <ul className="space-y-2">
            {produtos.map((produto, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-2 border-b border-gray-300"
              >
                <div>
                  <span className="font-medium">{produto.nome}</span>
                  <span className="text-gray-600"> - R$ {produto.preco}</span>
                </div>
                <div>
                  <button
                    onClick={() => handleEditarProduto(index)}
                    className="mr-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-md"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleRemoverProduto(index)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-md"
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">Nenhum produto cadastrado ainda.</p>
        )}
      </div>
    </div>
  );
}
