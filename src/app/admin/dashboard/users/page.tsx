// ─────────────────────────────────────────────────────────────────────────────
// app/admin/dashboard/users/page.tsx — Gestão de Utilizadores
// Admin pode: ver, criar, suspender, activar, resetar senha, exportar PDF/CSV.
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState, useMemo } from "react";
import { Users, UserPlus, Download, FileText, KeyRound } from "lucide-react";
import {
  SectionHeader, SearchBar, FilterSelect,
  Pagination, PrimaryButton, ConfirmModal, EmptyState,
} from "@/components/ui";
import UsersTable,       { type UserExtended } from "@/components/admin/users/UsersTable";
import UserProfileModal  from "@/components/admin/users/UserProfileModal";
import CreateUserModal   from "@/components/admin/users/CreateUserModal";
import { USERS } from "@/lib/users";

// ─────────────────────────────────────────────
// Preparar dados mockados com campos extras
// ─────────────────────────────────────────────
const USERS_INITIAL: UserExtended[] = USERS
  .filter((u) => u.role !== "admin")
  .map((u, i) => ({
    ...u,
    active:    i !== 2,
    createdAt: new Date(Date.now() - i * 86400000 * 7).toISOString().split("T")[0],
  }));

const ROLE_OPTIONS = [
  { value: "all",     label: "Todos os tipos"  },
  { value: "user",  label: "Agricultor"      },
  { value: "buyer",   label: "Comprador"       },
  { value: "shipper", label: "Transportador"   },
];

const STATUS_OPTIONS = [
  { value: "all",      label: "Todos os estados" },
  { value: "active",   label: "Activos"           },
  { value: "inactive", label: "Suspensos"          },
];

const PER_PAGE = 10;

// ─────────────────────────────────────────────
// Utilitário: exportar lista para CSV
// ─────────────────────────────────────────────
function exportCSV(users: UserExtended[]) {
  const headers = ["Nome", "Telefone", "Tipo", "Distrito", "Província", "Estado", "Registo"];
  const rows = users.map((u) => [
    u.name ?? "—",
    `+258${u.numero}`,
    u.role,
    u.district ?? "—",
    u.province ?? "—",
    u.active ? "Activo" : "Suspenso",
    u.createdAt,
  ]);
  const csv = [headers, ...rows].map((r) => r.join(";")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `utilizadores_kumela_${new Date().toISOString().split("T")[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────
// Utilitário: exportar lista para PDF (via print)
// ─────────────────────────────────────────────
function exportPDF(users: UserExtended[]) {
  const rows = users
    .map(
      (u) =>
        `<tr>
          <td>${u.name ?? "—"}</td>
          <td>+258${u.numero}</td>
          <td>${u.role}</td>
          <td>${u.district ?? "—"}</td>
          <td>${u.active ? "Activo" : "Suspenso"}</td>
          <td>${u.createdAt}</td>
        </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="pt"><head><meta charset="UTF-8">
<title>Utilizadores KUmela</title>
<style>
  body { font-family: Arial, sans-serif; font-size: 11px; padding: 20px; }
  h2   { color: #166534; margin-bottom: 12px; }
  table { width: 100%; border-collapse: collapse; }
  th   { background: #166534; color: #fff; padding: 8px 6px; text-align: left; font-size: 10px; text-transform: uppercase; }
  td   { padding: 6px; border-bottom: 1px solid #e5e7eb; }
  tr:nth-child(even) td { background: #f0fdf4; }
  p    { color: #6b7280; font-size: 10px; margin-top: 12px; }
</style>
</head><body>
  <h2>🌾 KUmela — Lista de Utilizadores</h2>
  <table>
    <thead><tr><th>Nome</th><th>Telefone</th><th>Tipo</th><th>Distrito</th><th>Estado</th><th>Registo</th></tr></thead>
    <tbody>${rows}</tbody>
  </table>
  <p>Exportado em ${new Date().toLocaleDateString("pt-PT")} · Total: ${users.length} utilizadores</p>
</body></html>`;

  const win = window.open("", "_blank");
  if (win) { win.document.write(html); win.document.close(); win.print(); }
}

// ─────────────────────────────────────────────
// Página
// ─────────────────────────────────────────────
export default function AdminUsersPage() {
  const [users,      setUsers]      = useState<UserExtended[]>(USERS_INITIAL);
  const [search,     setSearch]     = useState("");
  const [roleFil,    setRoleFil]    = useState("all");
  const [statusFil,  setStatusFil]  = useState("all");
  const [page,       setPage]       = useState(1);
  const [viewUser,   setViewUser]   = useState<UserExtended | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [exportMenu, setExportMenu] = useState(false);

  // Modais de confirmação
  const [confirm, setConfirm] = useState<{
    type:   "suspend" | "activate" | "reset";
    numero: string;
    name:   string;
  } | null>(null);

  // Filtrar utilizadores
  const filtered = useMemo(() => users.filter((u) => {
    const matchSearch = (u.name ?? "").toLowerCase().includes(search.toLowerCase()) ||
                        u.numero.includes(search) ||
                        (u.district ?? "").toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFil   === "all" || u.role === roleFil;
    const matchStatus = statusFil === "all" ||
                        (statusFil === "active"   &&  u.active) ||
                        (statusFil === "inactive" && !u.active);
    return matchSearch && matchRole && matchStatus;
  }), [users, search, roleFil, statusFil]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // Acções sobre utilizadores
  const suspendUser  = (numero: string) => setUsers((prev) => prev.map((u) => u.numero === numero ? { ...u, active: false } : u));
  const activateUser = (numero: string) => setUsers((prev) => prev.map((u) => u.numero === numero ? { ...u, active: true  } : u));
  const resetPass    = (numero: string) => {
    // Em produção: chamada à API — aqui apenas simulamos
    alert(`Senha resetada para o utilizador +258${numero}. Nova senha provisória enviada por SMS.`);
  };

  // Criar novo utilizador
  const createUser = (form: { name: string; numero: string; password: string; role: string; province: string; district: string }) => {
    setUsers((prev) => [
      ...prev,
      {
        ...form,
        active:    true,
        createdAt: new Date().toISOString().split("T")[0],
      } as UserExtended,
    ]);
  };

  // Contadores
  const counts = {
    total:    users.length,
    active:   users.filter((u) => u.active).length,
    users:  users.filter((u) => u.role === "user").length,
    shippers: users.filter((u) => u.role === "shipper").length,
    buyers:   users.filter((u) => u.role === "buyer").length,
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">

      {/* ── Cabeçalho ── */}
      <SectionHeader
        title="Utilizadores"
        subtitle={`${counts.total} utilizadores registados na plataforma`}
      >
        {/* Exportar */}
        <div className="relative">
          <PrimaryButton
            icon={Download}
            variant="gray"
            size="sm"
            onClick={() => setExportMenu(!exportMenu)}
          >
            Exportar
          </PrimaryButton>
          {exportMenu && (
            <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-[#0D1F10] border border-gray-200 dark:border-green-900/40 rounded-xl shadow-xl z-30 overflow-hidden">
              <button
                onClick={() => { exportCSV(filtered); setExportMenu(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors min-h-[44px]"
              >
                <Download size={15} className="text-green-600" />
                Exportar CSV
              </button>
              <button
                onClick={() => { exportPDF(filtered); setExportMenu(false); }}
                className="w-full flex items-center gap-2.5 px-4 py-3 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors min-h-[44px]"
              >
                <FileText size={15} className="text-red-500" />
                Exportar PDF
              </button>
            </div>
          )}
        </div>

        {/* Criar utilizador */}
        <PrimaryButton
          icon={UserPlus}
          size="sm"
          onClick={() => setCreateOpen(true)}
        >
          Novo Utilizador
        </PrimaryButton>
      </SectionHeader>

      {/* ── Resumo rápido ── */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {[
          { label: "Total",           value: counts.total,    color: "text-gray-900 dark:text-white",           bg: "bg-white dark:bg-[#0D1F10]"           },
          { label: "Activos",         value: counts.active,   color: "text-green-700 dark:text-green-400",      bg: "bg-green-50 dark:bg-green-900/10"     },
          { label: "Agricultores",    value: counts.users,  color: "text-emerald-700 dark:text-emerald-400",  bg: "bg-emerald-50 dark:bg-emerald-900/10" },
          { label: "Compradores",     value: counts.buyers,   color: "text-blue-700 dark:text-blue-400",        bg: "bg-blue-50 dark:bg-blue-900/10"       },
          { label: "Transportadores", value: counts.shippers, color: "text-orange-700 dark:text-orange-400",   bg: "bg-orange-50 dark:bg-orange-900/10"   },
        ].map((c) => (
          <div key={c.label} className={`${c.bg} rounded-xl p-4 border border-gray-100 dark:border-green-900/30`}>
            <p className={`text-2xl font-black ${c.color}`}>{c.value}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{c.label}</p>
          </div>
        ))}
      </div>

      {/* ── Filtros ── */}
      <div className="flex flex-wrap gap-3 items-center">
        <SearchBar
          value={search}
          onChange={(v) => { setSearch(v); setPage(1); }}
          placeholder="Pesquisar por nome, número ou distrito…"
        />
        <FilterSelect
          value={roleFil}
          onChange={(v) => { setRoleFil(v); setPage(1); }}
          options={ROLE_OPTIONS}
          label="Tipo"
        />
        <FilterSelect
          value={statusFil}
          onChange={(v) => { setStatusFil(v); setPage(1); }}
          options={STATUS_OPTIONS}
          label="Estado"
        />
      </div>

      {/* ── Tabela ── */}
      {paginated.length === 0 ? (
        <EmptyState
          icon={Users}
          title="Nenhum utilizador encontrado"
          description="Ajuste os filtros ou crie um novo utilizador."
          action={
            <PrimaryButton icon={UserPlus} size="sm" onClick={() => setCreateOpen(true)}>
              Criar Utilizador
            </PrimaryButton>
          }
        />
      ) : (
        <UsersTable
          users={paginated}
          onView={setViewUser}
          onSuspend={(n) => {
            const u = users.find((x) => x.numero === n);
            if (u) setConfirm({ type: "suspend", numero: n, name: u.name ?? n });
          }}
          onActivate={(n) => {
            const u = users.find((x) => x.numero === n);
            if (u) setConfirm({ type: "activate", numero: n, name: u.name ?? n });
          }}
          onResetPass={(n) => {
            const u = users.find((x) => x.numero === n);
            if (u) setConfirm({ type: "reset", numero: n, name: u.name ?? n });
          }}
        />
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={setPage}
        total={filtered.length}
        perPage={PER_PAGE}
      />

      {/* ── Modal de perfil ── */}
      <UserProfileModal
        user={viewUser}
        onClose={() => setViewUser(null)}
        onSuspend={(n) => { suspendUser(n);  setViewUser(null); }}
        onActivate={(n) => { activateUser(n); setViewUser(null); }}
        onResetPass={(n) => { resetPass(n);   setViewUser(null); }}
      />

      {/* ── Modal de criar utilizador ── */}
      <CreateUserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={createUser}
      />

      {/* ── Modal de confirmação ── */}
      <ConfirmModal
        open={confirm !== null}
        title={
          confirm?.type === "suspend"  ? `Suspender ${confirm.name}?`          :
          confirm?.type === "activate" ? `Activar ${confirm.name}?`            :
                                         `Resetar senha de ${confirm?.name}?`
        }
        description={
          confirm?.type === "suspend"
            ? "O utilizador perderá o acesso à plataforma temporariamente."
            : confirm?.type === "reset"
            ? "Uma senha provisória será gerada e enviada por SMS ao utilizador."
            : undefined
        }
        confirmLabel={
          confirm?.type === "suspend"  ? "Suspender"     :
          confirm?.type === "activate" ? "Activar"       :
                                          "Resetar Senha"
        }
        danger={confirm?.type === "suspend"}
        onConfirm={() => {
          if (!confirm) return;
          if (confirm.type === "suspend")  suspendUser(confirm.numero);
          if (confirm.type === "activate") activateUser(confirm.numero);
          if (confirm.type === "reset")    resetPass(confirm.numero);
          setConfirm(null);
        }}
        onCancel={() => setConfirm(null)}
      />
    </div>
  );
}