"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactsPage() {
  const [formState, setFormState] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    email: '',
    mensagem: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Limpa a mensagem de sucesso após 5 segundos
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Limita a mensagem a 155 palavras para consistência
    if (name === 'mensagem') {
      const words = value.split(/\s+/);
      if (words.length > 155) {
        return;
      }
    }
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const validate = () => {
    let newErrors = { nome: '', email: '', mensagem: '' };
    let isValid = true;
    
    if (!formState.nome.trim()) {
      newErrors.nome = 'O nome é obrigatório.';
      isValid = false;
    }
    
    if (!formState.email.trim()) {
      newErrors.email = 'O email é obrigatório.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'O email não é válido.';
      isValid = false;
    }

    if (!formState.mensagem.trim()) {
      newErrors.mensagem = 'A mensagem é obrigatória.';
      isValid = false;
    } else if (formState.mensagem.split(/\s+/).length > 155) {
      newErrors.mensagem = 'A mensagem deve ter no máximo 155 palavras.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Simulação de envio. Em um ambiente real, você usaria uma API de backend aqui.
      console.log("Formulário enviado com sucesso!", formState);
      
      setSuccessMessage('Sua mensagem foi enviada com sucesso!');
      setFormState({ nome: '', email: '', mensagem: '' });
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  };

  return (
    <div id="contato" className="w-full bg-[#F8F9F4]">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-extrabold p-4 text-[#2E7D32] mb-4">
            Fale Conosco
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tem alguma pergunta ou precisa de ajuda? Preencha o formulário ou entre em contato diretamente
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start mt-8">
          {/* Lado esquerdo: Formulário de Contato */}
          <div className="p-8 rounded-2xl shadow-xl border border-gray-100 mb-6 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Envie sua Mensagem</h3>
            {successMessage && (
              <div className="mb-4 bg-green-100 text-green-700 py-3 px-4 rounded-lg flex justify-between items-center transition-opacity duration-300 opacity-100">
                <span>{successMessage}</span>
                <button
                  onClick={() => setSuccessMessage('')}
                  className="text-green-700 hover:text-green-900 ml-2 text-xl font-bold"
                >
                  &times;
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu Nome *"
                  value={formState.nome}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border bg-gray-50 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${errors.nome ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Seu Email *"
                  value={formState.email}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border bg-gray-50 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              <div>
                <textarea
                  name="mensagem"
                  placeholder="Sua Mensagem *"
                  value={formState.mensagem}
                  onChange={handleChange}
                  className={`w-full p-3 h-28 rounded-lg border bg-gray-50 text-gray-800 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent ${errors.mensagem ? 'border-red-500' : 'border-gray-200'}`}
                ></textarea>
                {errors.mensagem && <p className="text-red-500 text-sm mt-1">{errors.mensagem}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#f39c12] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:bg-[#ffb347] focus:outline-none focus:ring-2 focus:ring-[#f39c12]"
              >
                Envie sua Mensagem
              </button>
            </form>
          </div>
          
          {/* Lado direito: Informações de Contato */}
          <div className="flex flex-col h-full justify-between p-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Detalhes de Contato
              </h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <MapPin className="text-[#4CAF50] w-6 h-6 flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">Localização do Escritório</h4>
                    <p className="text-gray-600 text-sm">Cidade de Nampula, Avenida Khankhomba, Nº 455, Moçambique</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="text-[#4CAF50] w-6 h-6 flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">Telefone</h4>
                    <p className="text-gray-600 text-sm">+258 87 987 6543 - Central</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="text-[#4CAF50] w-6 h-6 flex-shrink-0 mr-4 mt-1" />
                  <div>
                    <h4 className="font-bold text-gray-800">Email</h4>
                    <p className="text-gray-600 text-sm">contato@mozagro.co.mz</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mt-6 leading-relaxed text-sm">
                Estamos aqui para responder suas perguntas e ouvir suas sugestões. Sua contribuição é fundamental para o sucesso da comunidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}