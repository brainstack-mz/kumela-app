"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { User, Lock, Save, X } from "lucide-react";
import UnifiedDashboardHeader from "@/components/shared/UnifiedDashboardHeader";

export default function Profile() {
  const { user, login } = useAuth();
  const { theme } = useTheme();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    numero: user?.numero || "",
    province: user?.province || "",
    district: user?.district || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const getUserDisplayName = () => {
    return user?.name || user?.numero || "Usuário";
  };

  if (!user) {
    router.push("/public/login");
    return null;
  }

  const handleSave = () => {
    const updatedUser = {
      ...user,
      ...formData,
    };
    login(updatedUser);
    alert("Informações atualizadas com sucesso!");
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    console.log("Alterar senha:", passwordData);
    alert("Senha alterada com sucesso!");
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: "Administrador",
      buyer: "Cliente",
      seller: "Vendedor",
      shipper: "Transportador",
    };
    return labels[role] || role;
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <UnifiedDashboardHeader title="Dashboard do Vendedor" />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Meu Perfil
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie suas informações pessoais e segurança
            </p>
          </div>

          {/* Informações do Perfil */}
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md mb-6`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <User className="w-6 h-6" />
                Informações Pessoais
              </h3>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Editar
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Nome Completo
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Seu nome completo"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {formData.name || "Não informado"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Número de Telefone
                </label>
                <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {formData.numero}
                </p>
                <p className="text-xs text-gray-500 mt-1">O número de telefone não pode ser alterado</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tipo de Conta
                </label>
                <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  {getRoleLabel(user.role)}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Província
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Sua província"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {formData.province || "Não informado"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Distrito
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Seu distrito"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    {formData.district || "Não informado"}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                  >
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user?.name || "",
                        numero: user?.numero || "",
                        province: user?.province || "",
                        district: user?.district || "",
                      });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    <X className="w-5 h-5" />
                    Cancelar
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Alterar Senha */}
          <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl p-6 shadow-md`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Segurança
              </h3>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Alterar Senha
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Senha Atual <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nova Senha <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite sua nova senha"
                  />
                  <p className="text-xs text-gray-500 mt-1">Mínimo de 6 caracteres</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Confirmar Nova Senha <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Confirme sua nova senha"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleChangePassword}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    <Save className="w-5 h-5" />
                    Salvar Nova Senha
                  </button>
                  <button
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                  >
                    <X className="w-5 h-5" />
                    Cancelar
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Clique em "Alterar Senha" para modificar sua senha de acesso.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

