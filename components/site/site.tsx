"use client"

import { ScrollProgress } from "@/components/magicui/scroll-progress"

import { Contact, FloatingDock, Footer } from "./contact"
import { Header, Hero } from "./hero"
import { About, Clients, Faq, Process, Services, Stats, VelocityBand, Work } from "./sections"

export function Site() {
  return (
    <>
      <ScrollProgress className="from-brand via-brand-2 to-brand top-[env(safe-area-inset-top,0px)] z-50 h-1" />
      <Header />
      <main>
        <Hero />
        <VelocityBand />
        <Stats />
        <Clients />
        <Work />
        <Services />
        <About />
        <Process />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <FloatingDock />
    </>
  )
}
