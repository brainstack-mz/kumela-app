'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const faqs = [
  {
    question: "Como faço para publicar um produto?",
    answer:
      "Para listar um produto, basta criar uma conta e acessar a área de 'Venda'. Preencha o formulário com detalhes, como nome do produto, preço, localização e imagens de alta qualidade. Em seguida, envie para aprovação.",
  },
  {
    question: "Onde os compradores podem ver meus produtos?",
    answer:
      "Seus produtos serão exibidos na página inicial e nas categorias correspondentes. Os usuários poderão encontrá-los facilmente ao filtrar por tipo de produto ou localização.",
  },
  {
    question: "Como os pagamentos são processados?",
    answer:
      "A nossa plataforma não processa pagamentos diretamente. A negociação e a transação são feitas entre o comprador e o vendedor, usando métodos de pagamento de sua preferência, como M-Pesa, e-Mola ou transferência bancária.",
  },
  {
    question: "É seguro usar a plataforma para negociar?",
    answer:
      "Sim, incentivamos a comunicação direta para que você possa tirar todas as suas dúvidas. A segurança da transação depende das medidas que você e o outro usuário adotarem. Nossa plataforma fornece o ambiente para a conexão segura entre as partes.",
  },
  {
    question: "Posso vender produtos fora de Moçambique?",
    answer:
      "Atualmente, nossa plataforma foi desenhada para conectar produtores e consumidores dentro de Moçambique. Todas as localizações e métodos de contato são focados em facilitar a logística no país.",
  },
  {
    question: "Como faço para entrar em contato com um vendedor?",
    answer:
      "Na página de cada produto, você encontrará um botão para contatar o vendedor. As opções de contato podem incluir número de telefone ou outras formas de comunicação fornecidas pelo próprio vendedor.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // O container principal precisa do 'relative' para o círculo absoluto
    <div className="relative overflow-hidden min-h-screen"> 
      
     
      {/* z-0 garante que ele fique atrás (z-index: 0) */}
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#f99d3e] rounded-full transform translate-x-1/2 translate-y-1/2 opacity-60 z-0"></div>

      {/* Container para o conteúdo principal */}
      {/* z-10 garante que o conteúdo do FAQ fique na frente (z-index: 10) */}
      <div className="relative z-10 p-4 flex flex-col lg:flex-row items-center lg:items-start container mx-auto md:px-8">
        {/* Coluna da Esquerda: Título e Descrição */}
        <div className="flex-1 lg:max-w-[40%] text-center lg:text-left mb-8 lg:mb-0 lg:sticky lg:top-16">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2E7D32] mb-4">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-gray-600 max-w-lg lg:max-w-full mx-auto">
            Encontre respostas para as perguntas mais comuns sobre como comprar, vender e usar nossa plataforma. Se você não encontrar o que procura, sinta-se à vontade para nos contatar.
          </p>
        </div>

        {/* Coluna da Direita: Cards do FAQ */}
        <div className="flex-1 lg:max-w-[60%] w-full pl-0 lg:pl-16 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                // Adicionei bg-white aqui para garantir que os cards sejam opacos
                className={`rounded-2xl border bg-white transition-all duration-300 overflow-hidden 
                ${isOpen ? 'border-[#4CAF50] shadow-xl' : 'border-gray-200 shadow-md'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-${index}`}
                  className="flex items-center w-full p-6 text-left"
                >
                  <div className="flex items-center w-full">
                    <span className="text-xl font-bold text-[#4CAF50] mr-4">{index + 1}.</span>
                    <span className={`text-base font-semibold w-full transition-colors duration-300 ${isOpen ? 'text-[#2E7D32]' : 'text-gray-800'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`h-6 w-6 transform transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#4CAF50]' : 'text-gray-500'
                    }`}
                  />
                </button>
                <div
                  id={`faq-${index}`}
                  role="region"
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 py-4 text-gray-700 text-justify border-t border-gray-200">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}