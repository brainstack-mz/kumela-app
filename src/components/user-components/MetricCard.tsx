// src/components/MetricCard.tsx
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  icon: LucideIcon;
  bgColor: string;
  link?: string;
}

export default function MetricCard({ title, value, subtext, icon: Icon, bgColor, link }: MetricCardProps) {
  const cardContent = (
    <motion.div
      className="p-6 rounded-2xl shadow-lg transform transition-all duration-300 h-full flex flex-col justify-between"
      style={{ backgroundColor: bgColor, color: 'white' }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white flex-shrink-0">
          <Icon size={24} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm opacity-80 mt-1">{subtext}</p>
      </div>
    </motion.div>
  );

  return link ? <Link href={link} className="block">{cardContent}</Link> : cardContent;
}