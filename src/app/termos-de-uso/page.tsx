'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, Shield, Users, CreditCard, Truck, Phone, 
  Mail, MapPin, Calendar, CheckCircle, AlertTriangle, 
  Info, ChevronRight, ArrowUpRight, Scale
} from 'lucide-react';
import Link from 'next/link';

const sections = [
  { id: 'aceitacao', title: '1. Aceitação', icon: CheckCircle },
  { id: 'servico', title: '2. O Serviço', icon: Shield },
  { id: 'contas', title: '3. Contas de Usuário', icon: Users },
  { id: 'proibido', title: '4. Condutas Proibidas', icon: AlertTriangle },
  { id: 'pagamentos', title: '5. Transações', icon: CreditCard },
  { id: 'responsabilidade', title: '6. Responsabilidades', icon: Scale },
  { id: 'contato', title: '7. Contato', icon: Phone },
];

export default function TermsOfUsePage() {
  const [activeSection, setActiveSection] = useState('aceitacao');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* Header Premium */}
      <header className="relative pt-32 pb-20 border-b border-border bg-muted/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2E7D32]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText className="text-[#2E7D32] h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Acordo Legal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
              Termos de <br />
              <span className="text-[#2E7D32] dark:text-green-500">Uso da Plataforma</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Bem-vindo à <strong>KUMELA</strong>. Estes termos regem o acesso e o uso da nossa plataforma de agricultura e logística em Moçambique.
            </p>
            <div className="flex items-center gap-4 mt-8 text-sm text-muted-foreground font-medium">
              <Calendar size={16} />
              <span>Última atualização: Janeiro 2026</span>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-6 px-4">Cláusulas</p>
              {sections.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all duration-300 group ${
                    activeSection === item.id 
                    ? 'bg-[#2E7D32] text-white shadow-lg shadow-green-900/20' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <span className="text-sm font-bold">{item.title}</span>
                  <ChevronRight size={14} className={activeSection === item.id ? 'opacity-100' : 'opacity-0'} />
                </button>
              ))}
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <main className="flex-1 max-w-3xl space-y-24">
            
            {/* 1. Aceitação */}
            <section id="aceitacao" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32]">
                  <CheckCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold">1. Aceitação dos Termos</h2>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-lg font-medium">
                <p>
                  Ao acessar e usar a plataforma <strong>KUMELA</strong>, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nossa plataforma.
                </p>
                <div className="bg-blue-500/5 p-6 rounded-[2rem] border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Info className="h-6 w-6 text-blue-500 mt-1" />
                    <p className="text-foreground italic">
                      <strong>Importante:</strong> Estes termos podem ser atualizados periodicamente para refletir mudanças legais ou melhorias nos serviços.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Descrição */}
            <section id="servico" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-green-500/10 text-green-600">
                  <Shield size={24} />
                </div>
                <h2 className="text-3xl font-bold">2. Descrição do Serviço</h2>
              </div>
              <p className="text-muted-foreground mb-8 text-lg">
                A <strong>KUMELA</strong> é uma plataforma digital que conecta o ecossistema agrícola moçambicano:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Agricultores', desc: 'Venda direta sem intermediários', icon: Users, color: 'text-green-500', bg: 'bg-green-500/5' },
                  { title: 'Logística', desc: 'Transportadores e fretes', icon: Truck, color: 'text-orange-500', bg: 'bg-orange-500/5' },
                  { title: 'Consumidores', desc: 'Acesso a produtos frescos', icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-500/5' }
                ].map((item, i) => (
                  <div key={i} className={`p-6 rounded-[2rem] ${item.bg} border border-border text-center group transition-transform hover:scale-105`}>
                    <item.icon className={`mx-auto mb-4 h-8 w-8 ${item.color}`} />
                    <h4 className="font-black text-foreground mb-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Condutas Proibidas */}
            <section id="proibido" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
                  <AlertTriangle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-red-600 dark:text-red-500">4. Condutas Proibidas</h2>
              </div>
              <div className="p-8 rounded-[2.5rem] bg-card border border-border shadow-sm">
                <p className="font-bold text-foreground mb-6">É estritamente proibido usar a plataforma para:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Atividades fraudulentas',
                    'Venda de produtos sem qualidade',
                    'Spam ou comunicações abusivas',
                    'Comprometer a segurança do código'
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-muted/50 rounded-2xl">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-sm font-semibold text-muted-foreground">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. Pagamentos */}
            <section id="pagamentos" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                  <CreditCard size={24} />
                </div>
                <h2 className="text-3xl font-bold">5. Pagamentos e Transações</h2>
              </div>
              <div className="p-8 rounded-[2rem] bg-yellow-500/5 border-l-4 border-yellow-500">
                <div className="flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0" />
                  <div className="space-y-4">
                    <p className="text-foreground font-medium">A KUMELA facilita transações, mas não é responsável por disputas entre as partes.</p>
                    <ul className="text-sm text-muted-foreground space-y-2 font-medium">
                      <li>• Pagamentos seguros via M-Pesa e sistemas locais</li>
                      <li>• Taxas de serviço transparentes</li>
                      <li>• Reembolsos sob análise técnica</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Contato */}
            <section id="contato" className="scroll-mt-32 pt-12 pb-10">
              <div className="p-10 md:p-16 rounded-[3rem] bg-foreground text-background relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black mb-6">Suporte Jurídico</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-background/80 font-medium">
                    <div className="flex items-center gap-3 bg-background/10 p-4 rounded-2xl">
                      <Mail size={20} className="text-[#2E7D32]" />
                      <span>contato@kumela.org</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/10 p-4 rounded-2xl">
                      <Phone size={20} className="text-[#2E7D32]" />
                      <span>+258 82 123 4567</span>
                    </div>
                  </div>
                  <Link 
                    href="mailto:contato@kumela.org"
                    className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg"
                  >
                    Falar com Atendimento <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      <footer className="container mx-auto px-6 py-12 border-t border-border mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-muted-foreground font-medium">
            © 2026 <strong className="text-foreground font-black tracking-tighter">KUMELA.</strong>
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/politicas-de-privacidade" className="hover:text-[#2E7D32] transition-colors">Privacidade</Link>
            <Link href="/" className="hover:text-[#2E7D32] transition-colors">Início</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}