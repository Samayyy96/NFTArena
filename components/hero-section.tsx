"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sword, Shield, Coins, Users, TrendingUp, Award, Zap } from "lucide-react"

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Enhanced Background with Better Gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.15),transparent_60%)]" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-16">
          <Badge variant="outline" className="mb-8 text-primary border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium">
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              SHADOW FIGHTERS
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 text-muted-foreground font-normal leading-relaxed">
              Professional Gaming Platform
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            The premier Web3 combat platform where skill meets strategy. Build your professional fighter identity,
            participate in competitive staking, and trade valuable gaming assets.
          </p>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-5xl mx-auto">
          <div className="group bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 text-center hover:bg-card/80 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">10,000+</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Active Players</p>
          </div>
          
          <div className="group bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 text-center hover:bg-card/80 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">$2.5M+</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Total Volume</p>
          </div>
          
          <div className="group bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 text-center hover:bg-card/80 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-full flex items-center justify-center group-hover:bg-yellow-500/20 transition-colors">
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1">50,000+</div>
            <p className="text-xs sm:text-sm text-muted-foreground">Battles Completed</p>
          </div>
          
          <div className="group bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-4 sm:p-6 text-center hover:bg-card/80 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">5,000+</div>
            <p className="text-xs sm:text-sm text-muted-foreground">NFT Assets</p>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="mb-20">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate("dashboard")}
            >
              Connect Wallet & Start Playing
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-primary/50 text-primary hover:bg-primary/10 hover:border-primary px-8 py-4 text-base sm:text-lg bg-transparent transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate("arena")}
            >
              Enter Practice Arena
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="w-full sm:w-auto text-muted-foreground hover:text-foreground hover:bg-muted/50 px-8 py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105"
              onClick={() => onNavigate("marketplace")}
            >
              Explore Marketplace
            </Button>
          </div>
        </div>

        {/* Enhanced Value Propositions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <div className="text-center p-6 sm:p-8 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 hover:bg-card/60 transition-all duration-300 hover:scale-105 group">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
              <Sword className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Skill-Based Competition</h3>
            <p className="text-muted-foreground leading-relaxed">
              Master advanced combat mechanics in a fair, competitive environment where skill determines success.
            </p>
          </div>
          
          <div className="text-center p-6 sm:p-8 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 hover:bg-card/60 transition-all duration-300 hover:scale-105 group">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500/20 transition-colors">
              <Coins className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">Strategic Investment</h3>
            <p className="text-muted-foreground leading-relaxed">
              Stake MONAD tokens in competitive matches and earn rewards based on your performance and strategy.
            </p>
          </div>
          
          <div className="text-center p-6 sm:p-8 rounded-xl bg-card/40 backdrop-blur-sm border border-border/50 hover:bg-card/60 transition-all duration-300 hover:scale-105 group">
            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-500/20 transition-colors">
              <Shield className="w-8 h-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-4 text-foreground">True Asset Ownership</h3>
            <p className="text-muted-foreground leading-relaxed">
              Own your progress, trade valuable accounts, and collect unique NFT assets with cross-platform utility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}