"use client"

import { useState } from "react"
import { HeroSection } from "@/components/hero-section"
import { GameDashboard } from "@/components/game-dashboard"
import { Marketplace } from "@/components/marketplace"
import { GamingArena } from "@/components/gaming-arena"
import { NFTGallery } from "@/components/nft-gallery"
import { Navigation } from "@/components/navigation"
import { WalletProvider } from "@/components/wallet-provider"

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return <HeroSection onNavigate={setActiveSection} />
      case "dashboard":
        return <GameDashboard />
      case "marketplace":
        return <Marketplace />
      case "arena":
        return <GamingArena />
      case "gallery":
        return <NFTGallery />
      default:
        return <HeroSection onNavigate={setActiveSection} />
    }
  }

  return (
    <WalletProvider>
      <div className="min-h-screen bg-background particle-bg">
        <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
        <main className="relative">{renderSection()}</main>
      </div>
    </WalletProvider>
  )
}
