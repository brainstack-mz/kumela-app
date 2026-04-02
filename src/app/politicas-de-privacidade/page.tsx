'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Lock, Eye, Database, Smartphone, Mail, Phone, 
  MapPin, Calendar, CheckCircle, AlertTriangle, Info, 
  Users, CreditCard, ChevronRight, ArrowUpRight
} from 'lucide-react';
import Link from 'next/link';

const sections = [
  { id: 'introducao', title: '1. Introdução', icon: Info },
  { id: 'coleta', title: '2. Informações Coletadas', icon: Database },
  { id: 'uso', title: '3. Uso das Informações', icon: Users },
  { id: 'compartilhamento', title: '4. Compartilhamento', icon: Lock },
  { id: 'seguranca', title: '5. Segurança dos Dados', icon: Shield },
  { id: 'direitos', title: '6. Seus Direitos', icon: CheckCircle },
  { id: 'cookies', title: '7. Cookies', icon: Database },
  { id: 'retencao', title: '8. Retenção de Dados', icon: Calendar },
  { id: 'alteracoes', title: '9. Alterações', icon: Info },
  { id: 'contato', title: '10. Contato', icon: Phone },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('introducao');

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
      {/* Header Premium - Sem ofuscar o usuário */}
      <header className="relative pt-32 pb-20 border-b border-border bg-muted/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2E7D32]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-6">
              <Shield className="text-[#2E7D32] h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Documentação Oficial</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
              Políticas de <br />
              <span className="text-[#2E7D32] dark:text-green-500">Privacidade</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
              Sua privacidade é fundamental para nós. Saiba como coletamos, usamos e protegemos suas informações na plataforma <strong>KUMELA</strong>.
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
          
          {/* Sidebar de Navegação Inteligente */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-6 px-4">Sumário</p>
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

          {/* Conteúdo Principal com as cláusulas originais */}
          <main className="flex-1 max-w-3xl space-y-24">
            
            {/* 1. Introdução */}
            <section id="introducao" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-[#2E7D32]/10 text-[#2E7D32] dark:text-green-500">
                  <Info size={24} />
                </div>
                <h2 className="text-3xl font-bold">1. Introdução</h2>
              </div>
              <div className="space-y-6 text-muted-foreground leading-relaxed text-lg">
                <p>
                  A <strong>KUMELA</strong> está comprometida em proteger sua privacidade e dados pessoais. Esta política explica 
                  como coletamos, usamos, armazenamos e protegemos suas informações quando você usa nossa plataforma.
                </p>
                <div className="bg-[#2E7D32]/5 p-6 rounded-[2rem] border-l-4 border-[#2E7D32]">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-[#2E7D32] mt-1" />
                    <p className="text-foreground font-medium italic">
                      <strong>Nosso Compromisso:</strong> Nunca vendemos seus dados pessoais para terceiros. 
                      Suas informações são usadas apenas para melhorar nossos serviços.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Informações Coletadas */}
            <section id="coleta" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-500">
                  <Database size={24} />
                </div>
                <h2 className="text-3xl font-bold">2. Informações que Coletamos</h2>
              </div>
              <p className="text-muted-foreground mb-8 text-lg">Coletamos diferentes tipos de informações para fornecer nossos serviços:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[2rem] bg-blue-500/5 border border-blue-500/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Smartphone className="h-6 w-6 text-blue-600" />
                    <h3 className="text-xl font-bold">Pessoais</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground font-medium">
                    <li>• Nome completo</li>
                    <li>• Número de telefone</li>
                    <li>• Endereço de email</li>
                    <li>• Localização (província, distrito)</li>
                    <li>• Endereço físico</li>
                  </ul>
                </div>
                <div className="p-8 rounded-[2rem] bg-purple-500/5 border border-purple-500/10">
                  <div className="flex items-center gap-3 mb-6">
                    <Eye className="h-6 w-6 text-purple-600" />
                    <h3 className="text-xl font-bold">Uso</h3>
                  </div>
                  <ul className="space-y-3 text-muted-foreground font-medium">
                    <li>• Histórico de transações</li>
                    <li>• Produtos visualizados</li>
                    <li>• Preferências de busca</li>
                    <li>• Tempo de uso da plataforma</li>
                    <li>• Dispositivo e navegador</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 3. Como Usamos */}
            <section id="uso" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
                  <Users size={24} />
                </div>
                <h2 className="text-3xl font-bold">3. Como Usamos</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { title: 'Serviços', desc: 'Melhorar nossa plataforma', icon: CheckCircle, color: 'text-green-500' },
                  { title: 'Transações', desc: 'Processar pagamentos', icon: CreditCard, color: 'text-orange-500' },
                  { title: 'Comunicação', desc: 'Enviar atualizações', icon: Mail, color: 'text-blue-500' }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-card border border-border text-center group hover:border-[#2E7D32] transition-colors">
                    <item.icon className={`mx-auto mb-4 h-8 w-8 ${item.color}`} />
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Segurança */}
            <section id="seguranca" className="scroll-mt-32">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-red-500/10 text-red-500">
                  <Shield size={24} />
                </div>
                <h2 className="text-3xl font-bold">5. Segurança dos Dados</h2>
              </div>
              <div className="p-8 rounded-[2rem] bg-yellow-500/5 border-l-4 border-yellow-500">
                <div className="flex gap-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 shrink-0" />
                  <div>
                    <h4 className="font-bold text-foreground mb-4">Medidas de Proteção Implementadas:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-muted-foreground font-medium text-sm">
                      <li>• Criptografia SSL/TLS em tudo</li>
                      <li>• Senhas com hash seguro</li>
                      <li>• Acesso restrito interno</li>
                      <li>• Monitoramento 24/7</li>
                      <li>• Backups regulares</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. Contato Profissional */}
            <section id="contato" className="scroll-mt-32 pt-12">
              <div className="p-10 md:p-16 rounded-[3rem] bg-foreground text-background relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black mb-6">Questões sobre privacidade?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 text-background/80 font-medium">
                    <div className="flex items-center gap-3 bg-background/10 p-4 rounded-2xl">
                      <Mail size={20} className="text-[#2E7D32]" />
                      <span>privacidade@kumela.org</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/10 p-4 rounded-2xl">
                      <Phone size={20} className="text-[#2E7D32]" />
                      <span>+258 82 123 4567</span>
                    </div>
                    <div className="flex items-center gap-3 bg-background/10 p-4 rounded-2xl col-span-full">
                      <MapPin size={20} className="text-[#2E7D32]" />
                      <span>Nampula, Moçambique</span>
                    </div>
                  </div>
                  <Link 
                    href="mailto:privacidade@kumela.org"
                    className="inline-flex items-center gap-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-900/20"
                  >
                    Falar com o Encarregado <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

      {/* Footer Minimalista */}
      <footer className="container mx-auto px-6 py-12 border-t border-border mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-sm text-muted-foreground font-medium">
            © 2026 <strong className="text-foreground">KUMELA</strong>. Todos os direitos reservados.
          </p>
          <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/termos-de-uso" className="hover:text-[#2E7D32] transition-colors">Termos de Uso</Link>
            <Link href="/" className="hover:text-[#2E7D32] transition-colors">Início</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}