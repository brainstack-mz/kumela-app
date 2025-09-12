"use client";

import React from "react";
import Hero from "@/components/universal-components/Hero";
import Produts from "@/components/universal-components/Products";
import ContactsPage from "@/components/universal-components/contact";
import Faq from "@/components/universal-components/Faq";
import ScrollToTopButton from "@/components/universal-components/ScrollToTopButton";
import Video from "@/components/universal-components/Viedeo";

export default function HomePage() {
  return (
    <div className="relative w-full overflow-hidden  bg-[#e9f1f2] ">
      
      <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#f99d3e] rounded-full transform translate-x-1/2 translate-y-1/2 opacity-60"></div>

      {/* Conteúdo principal da página */}
      <div className="relative z-1">
     <section className="w-full mt-[1px] md:mt-[18px]">
  <Hero />
</section>

        {/* Esta é a linha que adiciona a margem */}
        <section id="Produts" className="mt-0 md:mt-0">
          <Produts />
        </section>
        <section id="faq" className="py-0 md:py-0">
          <Video />
        </section>

        <section id="contact" className="py-0 md:py-0">
          <ContactsPage />
        </section>

        <section id="faq" className="py-10 md:py-18">
          <Faq />
        </section>
      </div>

      <ScrollToTopButton />
    </div>
  );
}
