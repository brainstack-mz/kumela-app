"use client";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function PriceTable({ onClose }: { onClose: () => void }) {
    const [province, setProvince] = useState("Nampula");
    const [district, setDistrict] = useState("Nacala");

    useEffect(() => {
        setProvince(localStorage.getItem('province') || "Nampula");
        setDistrict(localStorage.getItem('district') || "Nacala");
    }, []);

    const PRODUCTS = [
        { id: 1, name: "Banana Prata", price: "45 MT", var: "+2.5%" },
        { id: 2, name: "Milho Seco", price: "120 MT", var: "-1.2%" },
        { id: 3, name: "Tomate", price: "90 MT", var: "+4.0%" },
        { id: 4, name: "Abacate", price: "220 MT", var: "0.0%" },
    ];

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="p-6 flex justify-between items-center border-b border-gray-100">
                <div>
                    <h1 className="text-xl font-black text-gray-800">Preços de Referência</h1>
                    <p className="text-xs text-gray-400 font-bold uppercase">{province} / {district}</p>
                </div>
                <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                    <X size={20} className="text-gray-600" />
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[10px] uppercase text-gray-400 font-bold tracking-widest">
                            <th className="pb-4 pl-2">Produto</th>
                            <th className="pb-4 text-right">Preço</th>
                            <th className="pb-4 text-center">Tendência</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {PRODUCTS.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-4 font-bold text-sm text-gray-800 pl-2">{p.name}</td>
                                <td className="py-4 text-right font-black text-gray-900">{p.price}</td>
                                <td className="py-4 text-center">
                                    <span className={`text-[10px] font-bold px-2 py-1 rounded-lg ${p.var.startsWith('+') ? 'text-green-600 bg-green-50' : p.var.startsWith('-') ? 'text-red-600 bg-red-50' : 'text-gray-600 bg-gray-100'}`}>
                                        {p.var}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}