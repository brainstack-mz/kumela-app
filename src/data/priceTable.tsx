import { ArrowLeft } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface PriceTableProps {
    onClose: () => void;
  
}

type Product = {
  id: number;
  name: string;
  image: string; // path relative to public/ e.g. "/assets/img/banana.jpg"
  price: string; // exemplo "MT 120 / kg" ou "-2.5%"
  variation: string; // exemplo "+3.2%" ou "-1.0"
};

const PRODUCTS: Product[] = [
  { id: 1, name: "Banana Prata", image: "/assets/imgs/banana.jpeg", price: "45 MT / kg", variation: "+2.5%" },
  { id: 2, name: "Milho Seco", image: "/assets/imgs/milho.jpeg", price: "120 MT / saco", variation: "-1.2%" },
  { id: 3, name: "Tomate", image: "/assets/imgs/tomate.jpeg", price: "90 MT / kg", variation: "+4.0%" },
  { id: 4, name: "Abacate", image: "/assets/imgs/abacate.jpeg", price: "220 MT / saco", variation: "0.0%" },
  { id: 5, name: "Couve", image: "/assets/imgs/couve.jpeg", price: "220 MT / saco", variation: "0.0%" },
  { id: 6, name: "Batata Doce", image: "/assets/imgs/batata_doce.jpeg", price: "220 MT / saco", variation: "0.0%" },
  { id: 7, name: "Manga", image: "/assets/imgs/manga.jpeg", price: "220 MT / saco", variation: "0.0%" },
  { id: 8, name: "Melancia", image: "/assets/imgs/melancia.jpeg", price: "220 MT / saco", variation: "0.0%" },
];

export default function PriceTable({onClose}: PriceTableProps) {
    const [province, setProvince] = useState<string | null>(null);
    const [district, setDistrict] = useState<string | null>(null);

    useEffect(() => {
        const storedProvince = localStorage.getItem('province');
        setProvince(storedProvince);
        const storedDistrict = localStorage.getItem('district');
        setDistrict(storedDistrict);
    }, []);

    return (
        <div className="h-full bg-white dark:bg-gray-900 p-6 overflow-y-auto">
            {/* Botao voltar*/}
            <button onClick={onClose}
            className="flex items-center text-blue-600 mb-4 hover:text-blue-800 transition">
                <ArrowLeft className="mr-2" size={18} />
                Voltar
            </button>
    <section className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-extrabold" style={{ color: "#0d47a1" }}>
          Tabela de Preços — <span>{province ? province : 'Nampula'}</span> -- <span>{district? district : 'Nacala'}</span></h2>
        <p className="mt-1 text-sm md:text-base text-gray-600">
          Preços atualizados. Variações em relação ao último período.
        </p>
      </div>

      {/* Desktop: table (md+) */}
      <div className="hidden md:block">
        <div
          className="rounded-2xl shadow-lg overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.06)" }}
        >
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left px-6 py-4 bg-gradient-to-r from-[#4caf50] to-[#1976d2] text-white">
                  Produto
                </th>
                <th className="text-left px-6 py-4 bg-[#2e7d32] text-white/90">Nome</th>
                <th className="text-left px-6 py-4 bg-[#0d47a1] text-white/90">Preço</th>
                <th className="text-left px-6 py-4 bg-[#ff9800] text-white/90">Variação</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {PRODUCTS.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`border-t last:border-b hover:bg-[#f5f5f5] transition`}
                >
                  {/* Imagem / thumbnail */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-inner"
                        style={{ background: "#f5f5f5" }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium" style={{ color: "#0d47a1" }}>
                          {p.name}
                        </div>
                        <div className="text-xs text-gray-500">Produto agrícola</div>
                      </div>
                    </div>
                  </td>

                  {/* Nome (redundância proposital para visual) */}
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold" style={{ color: "#1976d2" }}>
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500">Categoria: Grãos / Hortaliças</div>
                  </td>

                  {/* Preço */}
                  <td className="px-6 py-4">
                    <div className="inline-block rounded-full px-4 py-2 text-sm font-semibold"
                      style={{
                        background: "#f5f5f5",
                        color: "#2e7d32",
                        border: "1px solid rgba(34,197,94,0.08)",
                      }}
                    >
                      {p.price}
                    </div>
                  </td>

                  {/* Variação */}
                  <td className="px-6 py-4">
                    <VariationBadge variation={p.variation} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile: stacked cards */}
      <div className="md:hidden space-y-4">
        {PRODUCTS.map((p) => (
          <article
            key={p.id}
            className="flex items-center gap-4 p-4 rounded-2xl shadow-md"
            style={{ background: "#ffffff", border: "1px solid #e8f5e9" }}
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-base font-bold" style={{ color: "#0d47a1" }}>
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500">Produto agrícola</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold" style={{ color: "#1976d2" }}>
                    {p.price}
                  </div>
                  <div className="mt-1">
                    <VariationBadge variation={p.variation} />
                  </div>
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-600">
                Atualização: <span className="font-medium">Hoje</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
    </div>

  );
}

/* ===== VariationBadge component ===== */
function VariationBadge({ variation }: { variation: string }) {
  const isPositive = variation.startsWith("+");
  const isNegative = variation.startsWith("-");
  const neutral = !isPositive && !isNegative;

  const bg = isPositive ? "rgba(76,175,80,0.12)" : isNegative ? "rgba(244,67,54,0.08)" : "#f5f5f5";
  const color = isPositive ? "#2e7d32" : isNegative ? "#c62828" : "#1976d2";

  return (
    <span
      className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium"
      style={{
        background: bg,
        color,
        border: neutral ? "1px solid rgba(0,0,0,0.04)" : undefined,
      }}
    >
      {isPositive && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {isNegative && (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      <span>{variation}</span>
    </span>
  );
}

