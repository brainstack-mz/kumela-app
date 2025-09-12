// components/AdminRouteProtector.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function AdminRouteProtector({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Se não houver um usuário logado, redirecione para a página de login.
    // Esta verificação garante que apenas usuários autenticados acessem a rota.
    if (!user) {
      router.push("/admin/login");
    }
  }, [user, router]);

  // Se o usuário estiver logado, renderize o conteúdo da página.
  if (user) {
    return <>{children}</>;
  }

  // Se não houver usuário logado
  // enquanto o redirecionamento ocorre. Isso melhora a experiência do usuário.
  return (
 <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200"> {/* Fundo mais suave */}
      <div className="relative mb-26">  
         <div className="w-20 h-20 border-4 border-gray-300 rounded-full"></div>  
        <div className="w-20 h-20 border-t-4 border-b-4 border-[#4CAF50] border-solid rounded-full absolute top-0 left-0 animate-spin-slow"></div> {/* Cor mais vibrante e animação mais suave */}
      </div>
      <p className="text-4xl font-semibold text-gray-700 tracking-wide">Carregando...</p> 
    </div>
  );
}