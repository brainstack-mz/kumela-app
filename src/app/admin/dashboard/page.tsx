'use client';

import AdminRouteProtector from "@/components/admin-components/AdminRouteProtector";
import ViewContainer from "@/components/user-components/ViewContainer";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

import { Leaf} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  return (
    <AdminRouteProtector>
      <ViewContainer>
        <div className="p-8">
          <h1 className="text-3xl font-bold">Painel do Administrador</h1>
          <p className="mt-2 text-gray-600">
            Bem-vindo(a), {user?.role}! Este é o painel de gerenciamento global do sistema.
          </p>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Card de Anunciar */}
            <Link href="/seller/products/new-ad" passHref>
              <div className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer text-center h-40">
                <Leaf size={40} className="text-[#4CAF50] mb-2"/>
                <span className="text-base font-semibold text-gray-900">Anunciar</span>
                <p className="mt-1 text-xs text-gray-500">Adicione um novo produto.</p>
              </div>
            </Link>
        </div>

        </div>
      </ViewContainer>
    </AdminRouteProtector>
  );
}
