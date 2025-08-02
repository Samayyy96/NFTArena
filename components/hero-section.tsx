"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sword, Shield, Coins, Users, TrendingUp, Award, Zap, Wallet, AlertCircle } from "lucide-react"
import { useState, useEffect, lazy, Suspense } from "react"

// Lazy load Spline component to avoid SSR conflicts
const Spline = lazy(() => import('@splinetool/react-spline').then(module => ({ default: module.default })))

interface HeroSectionProps {
  onNavigate: (section: string) => void
}

// MetaMask types
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, callback: (...args: any[]) => void) => void
      removeListener: (event: string, callback: (...args: any[]) => void) => void
    }
  }
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletError, setWalletError] = useState<string>("")
  const [isDisconnecting, setIsDisconnecting] = useState(false)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure component only renders Spline on client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check if MetaMask is installed and for existing connections
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsMetaMaskInstalled(!!window.ethereum.isMetaMask)
      
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          }
        })
        .catch(console.error)
    }
  }, [])

  // Handle wallet account and network changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        setWalletAddress(accounts.length > 0 ? accounts[0] : "")
        if (accounts.length > 0) setWalletError("")
      }
      const handleChainChanged = () => window.location.reload()

      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum?.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const connectWallet = async () => {
    if (!window.ethereum) {
      setWalletError("MetaMask is not installed. Please install it to continue.")
      return
    }
    setIsConnecting(true)
    setWalletError("")
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
      }
    } catch (error: any) {
      setWalletError(error.code === 4001 ? "Connection rejected by user." : "Failed to connect wallet.")
      console.error("MetaMask connection error:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    setIsDisconnecting(true)
    setWalletAddress("")
    setWalletError("")
    setIsDisconnecting(false)
  }

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

  // A fallback background for when Spline is loading or on the server
  const FallbackBackground = () => (
    <div className="absolute inset-0 bg-gray-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#1b6cfd33,transparent)]" />
    </div>
  )

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gray-950 text-white">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        {isClient ? (
          <Suspense fallback={<FallbackBackground />}>
            <Spline
              scene="/scene.splinecode" // Make sure this path is correct
              onLoad={() => setSplineLoaded(true)}
              className="w-full h-full object-cover"
            />
          </Suspense>
        ) : (
          <FallbackBackground />
        )}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        {!splineLoaded && <FallbackBackground />}
      </div>

      {/* Content Layer */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-7xl mx-auto px-4 py-20 text-center">
        
        {/* Header Section */}
        <div className="w-full max-w-4xl mb-16">
           <Badge variant="outline" className="mb-6 border-blue-400/50 bg-blue-900/30 text-blue-300 backdrop-blur-md px-4 py-2 text-sm font-medium">
            {walletAddress ? `Connected: ${formatAddress(walletAddress)}` : "Connect Your Wallet to Begin"}
          </Badge>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter leading-tight drop-shadow-2xl">
            <span className="bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-transparent">
              NFT Arena
            </span>
          </h1>
          <p className="mt-4 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto">
            The premier PvP gaming platform where skill meets strategy and true asset ownership.
          </p>
        </div>

        {/* Enhanced Stats Grid is now commented out as requested */}
        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-5xl w-full">
          {[
            { icon: Users, color: "cyan-400", value: "10,000+", label: "Active Players" },
            { icon: TrendingUp, color: "green-400", value: "$2.5M+", label: "Total Volume" },
            { icon: Award, color: "yellow-400", value: "50,000+", label: "Battles Won" },
            { icon: Zap, color: "blue-400", value: "5,000+", label: "NFT Assets" }
          ].map((stat, index) => (
            <div key={index} className="group bg-black/40 backdrop-blur-md border border-white/10 rounded-xl p-4 text-center hover:bg-black/50 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-center mb-3">
                <div className={`w-12 h-12 bg-${stat.color}/10 rounded-full flex items-center justify-center group-hover:bg-${stat.color}/20 transition-colors`}>
                  <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                </div>
              </div>
              <div className={`text-2xl font-bold text-${stat.color} mb-1`}>{stat.value}</div>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div> 
        */}

        {/* Wallet Error Display */}
        {walletError && (
          <div className="mb-8 p-3 bg-red-900/50 backdrop-blur-sm border border-red-500/30 rounded-lg max-w-md mx-auto flex items-center gap-2 text-red-300">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium">{walletError}</span>
          </div>
        )}

        {/* Call to Action Section */}
        <div className="flex flex-col items-center gap-4">
          {!walletAddress ? (
            <>
              <Button size="lg" className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 h-14 text-lg font-semibold shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40" onClick={connectWallet} disabled={isConnecting}>
                <Wallet className="w-5 h-5 mr-2" />
                {isConnecting ? "Connecting..." : (isMetaMaskInstalled ? "Connect Wallet & Play" : "Install MetaMask")}
              </Button>
              <div className="flex gap-4 mt-2">
                <Button variant="ghost" className="text-gray-400 hover:text-cyan-300" onClick={() => onNavigate("arena")}>Practice First</Button>
                <Button variant="ghost" className="text-gray-400 hover:text-cyan-300" onClick={() => onNavigate("marketplace")}>Explore Marketplace</Button>
              </div>
            </>
          ) : (
            <>
              <Button size="lg" className="w-full max-w-xs bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 h-14 text-lg font-semibold shadow-2xl shadow-blue-500/20 transition-all duration-300 hover:scale-105 hover:shadow-blue-500/40" onClick={() => onNavigate("arena")}>
                <Sword className="w-5 h-5 mr-2" />
                Enter Arena
              </Button>
              <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                <Button variant="ghost" className="text-gray-400 hover:text-cyan-300" onClick={() => onNavigate("dashboard")}>Dashboard</Button>
                <Button variant="ghost" className="text-gray-400 hover:text-cyan-300" onClick={() => onNavigate("marketplace")}>Marketplace</Button>
                <Button variant="ghost" className="text-gray-500 hover:text-red-400" onClick={disconnectWallet} disabled={isDisconnecting}>
                  {isDisconnecting ? "..." : "Disconnect"}
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}