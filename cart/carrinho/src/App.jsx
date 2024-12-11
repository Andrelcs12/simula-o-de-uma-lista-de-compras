import React, { useState } from "react";

function App() {
  const navItems = ["Home", "Shop", "About", "My Profile"];
  
  const [produtos, setProdutos] = useState([
    {
      nome: "Batata",
      precoPorKg: 6.99,
      imagem: "batata.jpg", 
      quantidade: 1,
    },
    {
      nome: "Tomate",
      precoPorKg: 4.50,
      imagem: "tomate.jpg",
      quantidade: 1,
    },
    {
      nome: "Cenoura",
      precoPorKg: 3.20,
      imagem: "cenoura.jpg",
      quantidade: 1,
    },
  ]);

  const atualizarQuantidade = (index, quantidade) => {
    const novosProdutos = [...produtos];
    novosProdutos[index].quantidade = quantidade;
    setProdutos(novosProdutos);
  };

  const removerItem = (index) => {
    const novosProdutos = produtos.filter((_, i) => i !== index);
    setProdutos(novosProdutos);
  };

  const subtotal = produtos.reduce((total, produto) => total + produto.precoPorKg * produto.quantidade, 0);
  const taxa = 4;
  const total = (subtotal + taxa).toFixed(2);

  return (
    <div className="font-medium">

              {/* Header */}

      <header className="h-20 flex px-6 sm:px-16 justify-between items-center shadow-lg bg-gray-50">
        <h1 className="text-2xl sm:text-3xl mx-8">LOJA DO DRÉ</h1>
        <nav>
          <ul className="flex gap-4 sm:gap-8 items-center">
            {navItems.map((item) => (
              <li key={item}>
                <a href="#" className="text-2xl sm:text-2xl  hover:text-red-500">
                  {item}
                </a>
              </li>
            ))}
            <li>
              <button className="bg-green-600 text-white ml-6 sm:ml-14 font-bold p-2 px-4 rounded hover:bg-green-500">
                Carrinho ({produtos.length})
              </button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Lista carrinhos */}
      <main className="px-4 sm:px-24 py-10">
        <h1 className="text-2xl sm:text-4xl font-bold mb-8 border-b-2 border-b-slate-950 pb-2">
          Carrinho ({produtos.length} itens)
        </h1>
        <div className="flex flex-col gap-8 sm:flex-row">
          
          {/* Lista de itens */}
          <section className="flex-1 p-6 shadow-xl rounded-md bg-white">
            <h2 className="text-xl font-semibold mb-4">Itens no carrinho</h2>
            <ul className="space-y-6">
              {produtos.map((produto, index) => (
                <li key={index} className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4">
                  <img
                    src={`/images/${produto.imagem}`} 
                    alt={produto.nome}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{produto.nome}</h3>
                    <p className="text-gray-500">R$ {produto.precoPorKg.toFixed(2)} /kg</p>
                    
                    <div className="flex items-center mt-2">
  <button
    onClick={() => atualizarQuantidade(index, Math.max(1, produto.quantidade - 1))}
    className="bg-gray-200 px-4 py-1 text-lg rounded-md hover:bg-gray-300"
  >-</button>
  <input
    type="number"
    value={produto.quantidade}
    min="1"
    readOnly
    className="w-16 text-center border-t border-b h-8 border-gray-200 ml-3"
  />
  <button
    onClick={() => atualizarQuantidade(index, produto.quantidade + 1)}
    className="bg-gray-200 px-4 py-1 text-lg rounded-md hover:bg-gray-300"
  >+</button>
</div>

    </div>
        <div className="flex flex-col items-end">
          <h2 className="text-lg font-semibold mb-6">R$ {(produto.precoPorKg * produto.quantidade).toFixed(2)}</h2>
          <button onClick={() => removerItem(index)} className="text-gray-900 mt-2 text-base flex justify-end rounded-md  hover:text-red-600">Remover item</button></div>
                </li>
              ))}
            </ul>
          </section>

          {/* Resumo da compra */}
          <section className="w-full sm:w-1/3 bg-white p-6 shadow-xl rounded-md">
            <h2 className="text-xl font-semibold mb-4">Resumo do Carrinho</h2>
            <div className="space-y-4">
              <p className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span>R$ {subtotal.toFixed(2)}</span>
              </p>
              <p className="flex justify-between text-lg">
                <span>Taxa</span>
                <span>R$ 4.00</span>
              </p>
              <p className="flex justify-between text-lg font-bold border-t pt-4">
                <span>Total</span>
                <span>R$ {total}</span>
              </p>
            </div>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md mt-6 hover:bg-green-500">Realizar Pagamento</button>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
