"use client";

import React from "react";
import Hero from "@/components/shared/Hero";
import Produts from "@/components/shared/Products";
import ContactsPage from "@/components/shared/contact";
import Faq from "@/components/shared/Faq";
import ScrollControls from "@/components/shared/ScrollControls";
import Video from "@/components/shared/Video";

export default function HomePage() {
  return (
     <div className="relative w-full overflow-x-hidden bg-[#e9f1f2] ">
 
    

      {/* Conteúdo principal da página */}
      <div className="relative"> 
     <section className="w-full mt-[4px]  md:mt-6">
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

       <section id="faq" className="pt-10 md:pt-18 pb-0">
          <Faq />
        </section>
      </div>

      <ScrollControls />
    </div>
  );
}