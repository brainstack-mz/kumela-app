"use client";

import React, { useEffect, useState } from "react";
import { LoginSliderProps } from "@/types/login";

const LoginSlider = ({ slides }: LoginSliderProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      5000
    );
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={s.image}
            alt="Slide"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-40 flex items-end justify-center p-8 pb-20">
            <h2 className={`text-3xl font-bold ${s.className}`}>{s.text}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoginSlider;
