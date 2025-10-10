"use client";

import React from "react";
import Hero from "@/components/shared/Hero";
import Produts from "@/components/shared/Products";
import ContactsPage from "@/components/shared/contact";
import Faq from "@/components/shared/Faq";
import ScrollControls from "@/components/shared/ScrollControls";
import Video from "@/components/shared/Viedeo";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden  bg-[#e9f1f2] ">
      
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#f99d3e] rounded-full transform translate-x-1/2 translate-y-1/2 opacity-60"></div>

      {/* Conteúdo principal da página */}
      <div className="relative z-1">
     <section className="w-full mt-[1px]  md:mt-0">
  <Hero />
</section>

        {/* Esta é a linha que adiciona a margem */}
        <section id="Produts" className="mt-0 md:mt-0">
          <Produts />
        </section>
        <section id="video" className="py-0 md:py-0">
          <Video />
        </section>


        <section id="contact" className="py-0 md:py-0">
          <ContactsPage />
        </section>

        <section id="faq" className="py-10 md:py-18">
          <Faq />
        </section>
      </div>

      <ScrollControls />
    </div>
  );
}
