// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/deliveries/page.tsx — Entregas
// Acompanhar entregas + solicitar transportador + registar como transportador
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useState } from "react";
import { Truck, MapPin, Phone, Check, UserPlus } from "lucide-react";
import { SectionHeader, EmptyState, ConfirmModal } from "@/components/ui";
import { myDeliveries, availableTransporters, type Delivery } from "@/data/userData";

const STEP_LABELS: Record<string, string> = {
  waiting:    "À espera de transportador",
  matched:    "Transportador confirmado",
  collected:  "Produto recolhido",
  in_transit: "Em trânsito",
  delivered:  "Entregue",
};

const STEPS_ORDER = ["waiting", "matched", "collected", "in_transit", "delivered"];

function DeliveryProgress({ status }: { status: Delivery["status"] }) {
  const idx = STEPS_ORDER.indexOf(status);
  return (
    <div className="flex items-center gap-1">
      {STEPS_ORDER.map((s, i) => (
        <div key={s} className="flex items-center flex-1">
          <div className={[
            "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black",
            i <= idx
              ? "bg-green-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500",
          ].join(" ")}>
            {i <= idx ? <Check size={10} /> : i + 1}
          </div>
          {i < STEPS_ORDER.length - 1 && (
            <div className={`flex-1 h-0.5 mx-0.5 ${i < idx ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function DeliveriesPage() {
  const [deliveries, setDeliveries] = useState(myDeliveries);
  const [matchId, setMatchId]       = useState<string | null>(null);
  const [showRegister, setShowRegister] = useState(false);
  const [isTransporter, setIsTransporter] = useState(false);

  const requestDelivery = myDeliveries.find((d) => d.status === "waiting");

  const assignTransporter = (deliveryId: string, transporter: typeof availableTransporters[0]) => {
    setDeliveries((prev) => prev.map((d) =>
      d.id === deliveryId
        ? { ...d, status: "matched", transporterName: transporter.name, transporterPhone: transporter.phone, cost: transporter.price }
        : d
    ));
    setMatchId(null);
  };

  return (
<div className="p-4 md:p-6 space-y-6 w-full">
      <SectionHeader title="Entregas" subtitle="Acompanhe e solicite entregas">
        {!isTransporter && (
          <button
            onClick={() => setShowRegister(true)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200 dark:border-green-900/40 bg-white dark:bg-[#0D1F10] text-sm font-semibold text-gray-600 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-700 transition-all min-h-[44px]"
          >
            <UserPlus size={15} className="text-green-600 dark:text-green-400" />
            Ser Transportador
          </button>
        )}
        {isTransporter && (
          <span className="text-xs font-bold bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400 px-3 py-1.5 rounded-full border border-green-200 dark:border-green-800/40">
            ✓ Transportador activo
          </span>
        )}
      </SectionHeader>

      {/* Lista de entregas */}
      {deliveries.length === 0 ? (
        <EmptyState icon={Truck} title="Sem entregas" description="As suas entregas aparecerão aqui." />
      ) : (
        <div className="space-y-4">
          {deliveries.map((d) => (
            <div key={d.id} className="bg-white dark:bg-[#0D1F10] rounded-2xl border border-gray-100 dark:border-green-900/30 p-4 space-y-4">
              {/* Cabeçalho */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{d.productName}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">#{d.id}</p>
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                  d.status === "delivered"  ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" :
                  d.status === "in_transit" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"   :
                  d.status === "waiting"    ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400" :
                                              "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                }`}>
                  {STEP_LABELS[d.status]}
                </span>
              </div>

              {/* Barra de progresso */}
              <DeliveryProgress status={d.status} />

              {/* Origem → Destino */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <MapPin size={12} className="text-green-600 flex-shrink-0" />
                <span className="font-semibold">{d.origin}</span>
                <span>→</span>
                <span className="font-semibold">{d.destination}</span>
                <span className="ml-auto">Prev: {d.estimatedDate}</span>
              </div>

              {/* Transportador */}
              {d.transporterName ? (
                <div className="flex items-center justify-between bg-gray-50 dark:bg-[#0A1A0E] rounded-xl px-3 py-2.5">
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Transportador</p>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{d.transporterName}</p>
                  </div>
                  {d.transporterPhone && (
                    <a
                      href={`tel:+${d.transporterPhone}`}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold hover:bg-green-100 transition-colors min-h-[36px]"
                    >
                      <Phone size={12} /> Ligar
                    </a>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setMatchId(d.id)}
                  className="w-full py-3 rounded-xl bg-green-600 text-white text-sm font-bold hover:bg-green-700 shadow-sm shadow-green-600/20 transition-all min-h-[48px]"
                >
                  🚚 Solicitar Transportador
                </button>
              )}

              {/* Custo */}
              {d.cost > 0 && (
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  Custo de entrega: <span className="font-bold text-gray-700 dark:text-gray-300">{d.cost.toLocaleString("pt-MZ")} MZN</span>
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal de match com transportador */}
      {matchId && (
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div onClick={() => setMatchId(null)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-10 bg-white dark:bg-[#0A1A0E] w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl p-5 shadow-2xl border border-green-100 dark:border-green-900/40">
            <p className="text-base font-black text-gray-900 dark:text-white mb-4">Escolher Transportador</p>
            <div className="space-y-3">
              {availableTransporters.map((t) => (
                <button
                  key={t.id}
                  onClick={() => assignTransporter(matchId, t)}
                  className={[
                    "w-full flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all min-h-[64px]",
                    t.online
                      ? "border-gray-200 dark:border-green-900/40 hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/10"
                      : "border-gray-100 dark:border-green-900/20 opacity-50 cursor-not-allowed",
                  ].join(" ")}
                  disabled={!t.online}
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 flex items-center justify-center font-black text-sm">
                      {t.name.charAt(0)}
                    </div>
                    <span className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-[#0A1A0E] ${t.online ? "bg-green-500" : "bg-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.district} · ⭐ {t.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-gray-900 dark:text-white">{t.price} MZN</p>
                    <p className="text-[10px] text-gray-400">por entrega</p>
                  </div>
                </button>
              ))}
            </div>
            <button onClick={() => setMatchId(null)} className="w-full mt-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors min-h-[48px]">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Modal de registar como transportador */}
      <ConfirmModal
        open={showRegister}
        title="Registar como Transportador?"
        description="Ao confirmar, aparecerá como transportador disponível para outros utilizadores. Pode desactivar a qualquer momento no seu Perfil."
        confirmLabel="Registar"
        onConfirm={() => { setIsTransporter(true); setShowRegister(false); }}
        onCancel={() => setShowRegister(false)}
      />
    </div>
  );
}