'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { MapPin, Phone, Mail, LucideIcon } from "lucide-react";

interface FormState {
  nome: string;
  numero: string;
  mensagem: string;
}

interface FormErrors {
  nome: string;
  numero: string;
  mensagem: string;
}

export default function ContactsPage() {
  const [formState, setFormState] = useState<FormState>({
    nome: '',
    numero: '',
    mensagem: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    nome: '',
    numero: '',
    mensagem: '',
  });

  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'mensagem') {
      const words = value.trim().split(/\s+/);
      if (words.length > 155 && value.length > formState.mensagem.length) {
        return;
      }
    }
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = { nome: '', numero: '', mensagem: '' };
    let isValid = true;
    
    if (!formState.nome.trim()) {
      newErrors.nome = 'O nome é obrigatório.';
      isValid = false;
    }
    
    if (!formState.numero.trim()) {
      newErrors.numero = 'O número de telefone é obrigatório.';
      isValid = false;
    } else {
      const phoneRegex = /^(82|83|84|85|86|87|88)\d{7}$/;
      if (!phoneRegex.test(formState.numero.trim())) {
        newErrors.numero = 'Número inválido (9 dígitos começando com 82-88).';
        isValid = false;
      }
    }

    if (!formState.mensagem.trim()) {
      newErrors.mensagem = 'A mensagem é obrigatória.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setSuccessMessage('Sua mensagem foi enviada com sucesso!');
      setFormState({ nome: '', numero: '', mensagem: '' });
    }
  };

  return (
    <section id="contato" className="w-full bg-background py-12 transition-colors duration-300">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold text-[#2E7D32] dark:text-green-500 mb-4">
            Fale Conosco
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tem alguma pergunta ou precisa de ajuda? Preencha o formulário ou entre em contato diretamente.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          {/* Formulário */}
          <div className="p-8 rounded-2xl shadow-xl border border-border bg-card">
            <h3 className="text-2xl font-bold text-card-foreground mb-6">Envie sua Mensagem</h3>
            
            {successMessage && (
              <div className="mb-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 py-3 px-4 rounded-lg flex justify-between items-center">
                <span>{successMessage}</span>
                <button onClick={() => setSuccessMessage('')} className="text-xl font-bold">&times;</button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu Nome *"
                  value={formState.nome}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border bg-muted text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all ${errors.nome ? 'border-red-500' : 'border-border'}`}
                />
                {errors.nome && <p className="text-red-500 text-sm">{errors.nome}</p>}
              </div>

              <div className="space-y-1">
                <input
                  type="tel"
                  name="numero"
                  placeholder="Seu Número de Telefone *"
                  value={formState.numero}
                  onChange={handleChange}
                  className={`w-full p-3 rounded-lg border bg-muted text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all ${errors.numero ? 'border-red-500' : 'border-border'}`}
                />
                {errors.numero && <p className="text-red-500 text-sm">{errors.numero}</p>}
              </div>

              <div className="space-y-1">
                <textarea
                  name="mensagem"
                  placeholder="Sua Mensagem *"
                  value={formState.mensagem}
                  onChange={handleChange}
                  className={`w-full p-3 h-28 rounded-lg border bg-muted text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary/20 outline-none transition-all ${errors.mensagem ? 'border-red-500' : 'border-border'}`}
                ></textarea>
                {errors.mensagem && <p className="text-red-500 text-sm">{errors.mensagem}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-3 px-6 rounded-lg shadow-lg active:scale-[0.98] transition-all"
              >
                Envie sua Mensagem
              </button>
            </form>
          </div>
          
          {/* Informações de Contato */}
          <div className="flex flex-col h-full justify-between p-2">
            <div>
              <h3 className="text-2xl font-bold text-card-foreground mb-8">
                Detalhes de Contato
              </h3>
              <div className="space-y-8">
                <ContactInfo 
                  icon={MapPin} 
                  title="Localização do Escritório" 
                  content="Cidade de Nampula, Avenida Khankhomba, Nº 455, Moçambique" 
                />
                <ContactInfo 
                  icon={Phone} 
                  title="Telefone" 
                  content="+258 87 987 6543 - Central" 
                />
                <ContactInfo 
                  icon={Mail} 
                  title="Email" 
                  content="contato@kumela.org" 
                />
              </div>
              <p className="text-muted-foreground mt-10 leading-relaxed">
                Estamos aqui para responder suas perguntas e ouvir suas sugestões. Sua contribuição é fundamental para o sucesso da comunidade.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Sub-componente com tipagem para evitar repetição e erros */
interface ContactInfoProps {
  icon: LucideIcon;
  title: string;
  content: string;
}

function ContactInfo({ icon: Icon, title, content }: ContactInfoProps) {
  return (
    <div className="flex items-start">
      <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 mr-4">
        <Icon className="text-[#4CAF50] dark:text-green-500 w-6 h-6 flex-shrink-0" />
      </div>
      <div>
        <h4 className="font-bold text-card-foreground">{title}</h4>
        <p className="text-muted-foreground text-sm">{content}</p>
      </div>
    </div>
  );
}