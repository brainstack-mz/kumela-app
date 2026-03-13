'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Smartphone, 
  Mail, 
  Phone, 
  MapPin,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Info,
  Users,
  CreditCard,
  FileText
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
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
              <Shield className="h-12 w-12 text-green-600" />
              <h1 className="text-4xl font-bold text-gray-800">Políticas de Privacidade</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Sua privacidade é fundamental para nós. Saiba como coletamos, usamos e protegemos suas informações.
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>Última atualização: Janeiro 2026</span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
          >
            {/* 1. Introdução */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">1. Introdução</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  A <strong>KUMELA</strong> está comprometida em proteger sua privacidade e dados pessoais. Esta política explica 
                  como coletamos, usamos, armazenamos e protegemos suas informações quando você usa nossa plataforma.
                </p>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <p className="text-green-800">
                      <strong>Nosso Compromisso:</strong> Nunca vendemos seus dados pessoais para terceiros. 
                      Suas informações são usadas apenas para melhorar nossos serviços.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Informações que Coletamos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">2. Informações que Coletamos</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>Coletamos diferentes tipos de informações para fornecer nossos serviços:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Smartphone className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold text-blue-800">Informações Pessoais</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-blue-700">
                      <li>• Nome completo</li>
                      <li>• Número de telefone</li>
                      <li>• Endereço de email</li>
                      <li>• Localização (província, distrito)</li>
                      <li>• Endereço físico</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <h3 className="font-semibold text-purple-800">Informações de Uso</h3>
                    </div>
                    <ul className="space-y-2 text-sm text-purple-700">
                      <li>• Histórico de transações</li>
                      <li>• Produtos visualizados</li>
                      <li>• Preferências de busca</li>
                      <li>• Tempo de uso da plataforma</li>
                      <li>• Dispositivo e navegador</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. Como Usamos suas Informações */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">3. Como Usamos suas Informações</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>Utilizamos suas informações para:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800">Serviços</h3>
                    <p className="text-sm text-green-700">Fornecer e melhorar nossos serviços</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg text-center">
                    <CreditCard className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-orange-800">Transações</h3>
                    <p className="text-sm text-orange-700">Processar pagamentos e entregas</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Mail className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800">Comunicação</h3>
                    <p className="text-sm text-blue-700">Enviar atualizações importantes</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Compartilhamento de Informações */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Lock className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">4. Compartilhamento de Informações</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, exceto nas seguintes situações:
                </p>
                <ul className="space-y-3 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span><strong>Prestadores de serviços:</strong> Empresas que nos ajudam a operar a plataforma (processamento de pagamentos, entrega)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span><strong>Obrigação legal:</strong> Quando exigido por lei ou para proteger nossos direitos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span><strong>Consentimento:</strong> Quando você nos dá permissão explícita</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. Segurança dos Dados */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">5. Segurança dos Dados</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  Implementamos medidas de segurança robustas para proteger suas informações:
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-yellow-800 font-semibold">Medidas de Segurança:</p>
                      <ul className="text-yellow-700 mt-2 space-y-1">
                        <li>• Criptografia SSL/TLS para todas as comunicações</li>
                        <li>• Senhas criptografadas com hash seguro</li>
                        <li>• Acesso restrito aos dados pessoais</li>
                        <li>• Monitoramento contínuo de segurança</li>
                        <li>• Backup regular dos dados</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 6. Seus Direitos */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">6. Seus Direitos</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>Você tem os seguintes direitos sobre seus dados pessoais:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-green-600" />
                      <span><strong>Acesso:</strong> Solicitar uma cópia dos seus dados</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-green-600" />
                      <span><strong>Correção:</strong> Corrigir informações incorretas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span><strong>Exclusão:</strong> Solicitar a remoção dos dados</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span><strong>Portabilidade:</strong> Transferir dados para outro serviço</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-green-600" />
                      <span><strong>Oposição:</strong> Opor-se ao processamento</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span><strong>Retirada:</strong> Retirar consentimento a qualquer momento</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 7. Cookies e Tecnologias Similares */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Database className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">7. Cookies e Tecnologias Similares</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  Usamos cookies e tecnologias similares para melhorar sua experiência na plataforma:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span><strong>Cookies essenciais:</strong> Necessários para o funcionamento da plataforma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span><strong>Cookies de análise:</strong> Para entender como você usa nossa plataforma</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-1" />
                    <span><strong>Cookies de preferências:</strong> Para lembrar suas configurações</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* 8. Retenção de Dados */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">8. Retenção de Dados</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir os propósitos 
                  descritos nesta política ou conforme exigido por lei.
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Períodos típicos de retenção:</strong><br/>
                    • Dados da conta: Enquanto sua conta estiver ativa<br/>
                    • Dados de transação: 7 anos (conforme legislação)<br/>
                    • Dados de marketing: Até você retirar o consentimento
                  </p>
                </div>
              </div>
            </section>

            {/* 9. Alterações nesta Política */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Info className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">9. Alterações nesta Política</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>
                  Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos você sobre 
                  mudanças significativas através da plataforma ou por email.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                    <p className="text-blue-800">
                      <strong>Recomendação:</strong> Revise esta política regularmente para estar ciente 
                      de como protegemos suas informações.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 10. Contato */}
            <section>
              <div className="flex items-center gap-3 mb-4">
                <Phone className="h-6 w-6 text-green-600" />
                <h2 className="text-2xl font-semibold text-gray-800">10. Contato</h2>
              </div>
              <div className="pl-9 space-y-4 text-gray-700">
                <p>Para questões sobre privacidade ou exercer seus direitos, entre em contato:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-semibold">Email</p>
                      <p className="text-sm text-gray-600">privacidade@mozagro.co.mz</p>
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
                  © 2025 <strong>KUMELA</strong>. Todos os direitos reservados.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/termos-de-uso"
                    className="text-green-600 hover:text-green-700 text-sm font-medium"
                  >
                    Termos de Uso
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