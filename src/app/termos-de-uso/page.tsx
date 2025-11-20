'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Shield, 
  Users, 
  CreditCard, 
  Truck, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import Link from 'next/link';

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <FileText className="h-12 w-12 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-800">Termos de Uso</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bem-vindo à **KUMELA**. Estes termos regem o uso da nossa plataforma de agricultura em Moçambique.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: Janeiro 2025</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
          >
            {/* 1. Aceitação dos Termos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">1. Aceitação dos Termos</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  Ao acessar e usar a plataforma **KUMELA**, você concorda em cumprir e estar vinculado a estes Termos de Uso. 
                  Se você não concordar com qualquer parte destes termos, não deve usar nossa plataforma.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-blue-800">
                      <strong>Importante:</strong> Estes termos podem ser atualizados periodicamente. 
                      Recomendamos que você revise esta página regularmente.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Descrição do Serviço */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">2. Descrição do Serviço</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  A **KUMELA** é uma plataforma digital que conecta agricultores, vendedores, transportadores e consumidores 
                  em Moçambique, facilitando a comercialização de produtos agrícolas.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">Agricultores</h3>
                    <p className="text-sm text-green-700">Venda seus produtos diretamente</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <Truck className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-orange-800">Transportadores</h3>
                    <p className="text-sm text-orange-700">Ofereça serviços de entrega</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <CreditCard className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800">Consumidores</h3>
                    <p className="text-sm text-blue-700">Compre produtos frescos</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Contas de Usuário */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">3. Contas de Usuário</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  Para usar certas funcionalidades da plataforma, você deve criar uma conta fornecendo informações 
                  precisas e atualizadas.
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span>Você é responsável por manter a confidencialidade de sua conta</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span>Você deve notificar-nos imediatamente sobre qualquer uso não autorizado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span>Uma pessoa só pode ter uma conta por número de telefone</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 4. Condutas Proibidas */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                <h2 className="text-2xl font-semibold text-gray-800">4. Condutas Proibidas</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>É proibido usar a plataforma para:</p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span>Atividades ilegais ou fraudulentas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span>Venda de produtos falsificados ou de qualidade inferior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span>Spam ou comunicações não solicitadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-1" />
                    <span>Tentar hackear ou comprometer a segurança da plataforma</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. Pagamentos e Transações */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">5. Pagamentos e Transações</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  A **KUMELA** facilita transações entre usuários, mas não é responsável por disputas entre compradores e vendedores.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 font-semibold">Importante sobre Pagamentos:</p>
                      <ul className="text-yellow-700 mt-2 space-y-1">
                        <li>• Todos os pagamentos são processados de forma segura</li>
                        <li>• Taxas podem ser aplicadas conforme acordado</li>
                        <li>• Reembolsos seguem nossa política específica</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Limitação de Responsabilidade */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">6. Limitação de Responsabilidade</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  A **KUMELA** não se responsabiliza por danos diretos, indiretos, incidentais ou consequenciais 
                  resultantes do uso da plataforma.
                </p>
                <p>
                  Nossa responsabilidade é limitada ao valor das taxas pagas pelos serviços nos últimos 12 meses.
                </p>
              </div>
            </section>

            {/* 7. Contato */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">7. Contato</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>Para dúvidas sobre estes Termos de Uso, entre em contato conosco:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-gray-600">contato@mozagro.co.mz</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Telefone</p>
                      <p className="text-sm text-gray-600">+258 82 123 4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <MapPin className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Endereço</p>
                      <p className="text-sm text-gray-600">Nampula, Moçambique</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer Oculto pelo Layout, mas o div interno com links é mantido para consistência */}
            <div className="border-t pt-6 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-gray-500">
                  © 2025 **KUMELA**. Todos os direitos reservados.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/politicas-de-privacidade"
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Políticas de Privacidade
                  </Link>
                  <Link
                    href="/"
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Voltar ao Início
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}