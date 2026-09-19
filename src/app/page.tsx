import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Products } from "@/components/sections/Products";
import { Process } from "@/components/sections/Process";
import { Logistics } from "@/components/sections/Logistics";
import { Clients } from "@/components/sections/Clients";
import { Operation } from "@/components/sections/Operation";
import { Quote } from "@/components/sections/Quote";
import { About } from "@/components/sections/About";
import { Faq } from "@/components/sections/Faq";
import { MobileCta } from "@/components/sections/MobileCta";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Products />
        <Process />
        <Logistics />
        <Clients />
        <Operation />
        <Quote />
        <About />
        <Faq />
        <MobileCta />
      </main>
      <Footer />
    </>
  );
}
