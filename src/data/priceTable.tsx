// src/data/priceTable.tsx

import { ArrowLeft, ArrowUp, ArrowDown, Minus } from "lucide-react";
import React, { useEffect, useState } from "react";

interface PriceTableProps {
    onClose: () => void;
}

type Product = {
    id: number;
    name: string;
    image: string; // path relative to public/ e.g. "/assets/img/banana.jpg"
    price: string; // exemplo "MT 120 / kg"
    variation: string; // exemplo "+3.2%" ou "-1.0%"
};

const PRODUCTS: Product[] = [
    { id: 1, name: "Banana Prata", image: "/assets/imgs/banana.jpeg", price: "45 MT / kg", variation: "+2.5%" },
    { id: 2, name: "Milho Seco", image: "/assets/imgs/milho.jpeg", price: "120 MT / saco", variation: "-1.2%" },
    { id: 3, name: "Tomate", image: "/assets/imgs/tomate.jpeg", price: "90 MT / kg", variation: "+4.0%" },
    { id: 4, name: "Abacate", image: "/assets/imgs/abacate.jpeg", price: "220 MT / saco", variation: "0.0%" },
    { id: 5, name: "Couve", image: "/assets/imgs/couve.jpeg", price: "220 MT / saco", variation: "+0.8%" },
    { id: 6, name: "Batata Doce", image: "/assets/imgs/batata_doce.jpeg", price: "220 MT / saco", variation: "-3.5%" },
    { id: 7, name: "Manga", image: "/assets/imgs/manga.jpeg", price: "220 MT / saco", variation: "0.0%" },
    { id: 8, name: "Melancia", image: "/assets/imgs/melancia.jpeg", price: "220 MT / saco", variation: "+1.5%" },
];

// Cores base do formulário principal
const PRIMARY_GREEN = "#4CAF50";
const ACCENT_BLUE = "#1976D2";

export default function PriceTable({ onClose }: PriceTableProps) {
    const [province, setProvince] = useState<string | null>(null);
    const [district, setDistrict] = useState<string | null>(null);

    useEffect(() => {
        const storedProvince = localStorage.getItem('province');
        setProvince(storedProvince);
        const storedDistrict = localStorage.getItem('district');
        setDistrict(storedDistrict);
    }, []);

    return (
        // Garante fundo branco e padding
        <div className="h-full bg-white p-4 sm:p-6 overflow-y-auto">
            {/* Botao voltar (UX: Aumenta a area de clique)*/}
            <button
                onClick={onClose}
                className="flex items-center text-gray-600 mb-6 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
            >
                <ArrowLeft className="mr-2" size={18} />
                Voltar ao Formulário
            </button>
            
            <section className="p-0 sm:p-2">
                {/* Header suave */}
                <div className="mb-8 border-b pb-4">
                    <h1 className="text-xl md:text-3xl font-extrabold text-gray-800">
                        Tabela de Preços Agropecuários
                    </h1>
                    <p className="mt-2 text-sm md:text-base text-gray-500">
                        <span className="font-semibold" style={{ color: ACCENT_BLUE }}>
                            {province ? province : 'Nampula'}
                        </span>
                        {" / "}
                        <span className="font-semibold" style={{ color: PRIMARY_GREEN }}>
                            {district ? district : 'Nacala'}
                        </span>
                        {" - "}
                        Preços e variações em relação ao último período de coleta.
                    </p>
                </div>

                {/* Desktop: Table (md+) */}
                <div className="hidden md:block">
                    <div
                        className="rounded-xl overflow-hidden border border-gray-200"
                    >
                        <table className="w-full table-auto">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 w-1/2">
                                        Produto
                                    </th>
                                    {/* Nome/Categoria removido por redundância */}
                                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">
                                        Preço Atual
                                    </th>
                                    <th className="text-right px-6 py-4 text-sm font-semibold text-gray-600">
                                        Variação (24h)
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white divide-y divide-gray-100">
                                {PRODUCTS.map((p, idx) => (
                                    <tr
                                        key={p.id}
                                        // Efeito de hover suave
                                        className={`hover:bg-gray-50 transition duration-150`}
                                    >
                                        {/* Coluna do Produto (Imagem + Nome) */}
                                        <td className="px-6 py-3">
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-200"
                                                >
                                                    <img
                                                        src={p.image}
                                                        alt={p.name}
                                                        className="w-full h-full object-cover"
                                                        loading="lazy"
                                                    />
                                                </div>
                                                <div>
                                                    <div className="text-base font-semibold text-gray-800">
                                                        {p.name}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        Categoria: Grãos/Hortaliças
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Coluna do Preço */}
                                        <td className="px-6 py-3">
                                            <div
                                                className="text-base font-bold"
                                                style={{ color: ACCENT_BLUE }}
                                            >
                                                {p.price}
                                            </div>
                                        </td>

                                        {/* Coluna da Variação (Alinhado à direita) */}
                                        <td className="px-6 py-3 text-right">
                                            <VariationBadge variation={p.variation} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile: Stacked Cards (Otimizado) */}
                <div className="md:hidden space-y-3">
                    {PRODUCTS.map((p) => (
                        <article
                            key={p.id}
                            className="flex items-center gap-4 p-4 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition duration-200"
                            style={{ background: "#ffffff" }}
                        >
                            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                    {/* Nome e Categoria */}
                                    <div>
                                        <div className="text-base font-semibold text-gray-800">
                                            {p.name}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            Produto agrícola
                                        </div>
                                    </div>

                                    {/* Preço e Variação */}
                                    <div className="text-right">
                                        <div className="text-sm font-bold" style={{ color: ACCENT_BLUE }}>
                                            {p.price}
                                        </div>
                                        <div className="mt-1">
                                            <VariationBadge variation={p.variation} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

/* ===== Componente VariationBadge aprimorado (UX de Leitura) ===== */
function VariationBadge({ variation }: { variation: string }) {
    const isPositive = variation.startsWith("+");
    const isNegative = variation.startsWith("-");
    const neutral = !isPositive && !isNegative;

    // Cores mais suaves
    const bg = isPositive ? "rgba(76, 175, 80, 0.1)" : isNegative ? "rgba(244, 67, 54, 0.1)" : "#f5f5f5";
    const color = isPositive ? "#2E7D32" : isNegative ? "#C62828" : "#424242"; // Darker neutral color

    return (
        <span
            className="inline-flex items-center justify-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition duration-150 ease-in-out"
            style={{
                background: bg,
                color,
            }}
        >
            {isPositive && <ArrowUp size={14} className="flex-shrink-0" />}
            {isNegative && <ArrowDown size={14} className="flex-shrink-0" />}
            {neutral && <Minus size={14} className="flex-shrink-0" />}
            <span>{neutral ? "Sem Var." : variation}</span>
        </span>
    );
}