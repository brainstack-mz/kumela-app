'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Como faço para publicar um produto?",
    answer: "Para listar um produto, basta criar uma conta e acessar a área de 'Venda'. Preencha o formulário com detalhes, como nome do produto, preço, localização e imagens de alta qualidade. Em seguida, envie para aprovação.",
  },
  {
    question: "Onde os compradores podem ver meus produtos?",
    answer: "Seus produtos serão exibidos na página inicial e nas categorias correspondentes. Os usuários poderão encontrá-los facilmente ao filtrar por tipo de produto ou localização.",
  },
  {
    question: "Como os pagamentos são processados?",
    answer: "A nossa plataforma não processa pagamentos diretamente. A negociação e a transação são feitas entre o comprador e o vendedor, usando métodos de pagamento de sua preferência, como M-Pesa, e-Mola ou transferência bancária.",
  },
  {
    question: "É seguro usar a plataforma para negociar?",
    answer: "Sim, incentivamos a comunicação direta para que você possa tirar todas as suas dúvidas. A segurança da transação depende das medidas que você e o outro usuário adotarem. Nossa plataforma fornece o ambiente para a conexão segura entre as partes.",
  },
  {
    question: "Posso vender produtos fora de Moçambique?",
    answer: "Atualmente, nossa plataforma foi desenhada para conectar produtores e consumidores dentro de Moçambique. Todas as localizações e métodos de contato são focados em facilitar a logística no país.",
  },
  {
    question: "Como faço para entrar em contato com um vendedor?",
    answer: "Na página de cada produto, você encontrará um botão para contatar o vendedor. As opções de contato podem incluir número de telefone ou outras formas de comunicação fornecidas pelo próprio vendedor.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-background transition-colors duration-300"> 
      
      {/* Círculo decorativo: Ajustada opacidade para o dark mode */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#f99d3e] rounded-full transform translate-x-1/3 translate-y-1/3 opacity-40 dark:opacity-10 z-0 pointer-events-none transition-opacity duration-500"></div>

      <div className="relative z-10 p-4 py-12 flex flex-col lg:flex-row items-center lg:items-start container mx-auto md:px-8 gap-12">
        
        {/* Coluna da Esquerda: Título e Descrição */}
        <div className="flex-1 lg:max-w-[40%] text-center lg:text-left lg:sticky lg:top-24">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2E7D32] dark:text-green-500 mb-6">
            Perguntas Frequentes
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg lg:max-w-full mx-auto leading-relaxed">
            Encontre respostas para as perguntas mais comuns sobre como comprar, vender e usar nossa plataforma. 
            Se não encontrar o que procura, sinta-se à vontade para nos contatar.
          </p>
        </div>

        {/* Coluna da Direita: Accordion */}
        <div className="flex-1 lg:max-w-[60%] w-full space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden bg-card
                ${isOpen 
                  ? 'border-[#4CAF50] dark:border-green-600 shadow-xl' 
                  : 'border-border shadow-sm'}`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex items-center justify-between w-full p-6 text-left focus:outline-none"
                >
                  <div className="flex items-center pr-4">
                    <span className="text-xl font-bold text-[#4CAF50] dark:text-green-500 mr-4">
                      {(index + 1).toString().padStart(2, '0')}.
                    </span>
                    <span className={`text-base md:text-lg font-semibold transition-colors duration-300 
                      ${isOpen ? 'text-[#2E7D32] dark:text-green-400' : 'text-card-foreground'}`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`h-6 w-6 transform transition-transform duration-300 flex-shrink-0 
                      ${isOpen ? 'rotate-180 text-[#4CAF50]' : 'text-muted-foreground'}`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pt-2 text-muted-foreground text-justify border-t border-border mt-2 mx-6">
                      <div className="py-4">
                        {faq.answer}
                      </div>
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