'use client';

import ViewContainer from "@/components/user-components/ViewContainer";
import { useAuth } from "@/context/AuthContext";

export default function BuyerDashboard() {
  const { user } = useAuth();
  
  return (
    <ViewContainer>
      <div className="p-8">
        <h1 className="text-3xl font-bold">Painel do Comprador</h1>
        <p className="mt-2 text-gray-600">
          Bem-vindo(a), {user?.email}! Explore os produtos e acompanhe seus pedidos.
        </p>
      </div>
    </ViewContainer>
  );
}
