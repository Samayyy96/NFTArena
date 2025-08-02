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

  // Check if MetaMask is installed
  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window !== "undefined") {
        setIsMetaMaskInstalled(!!window.ethereum?.isMetaMask)
      }
    }
    
    checkMetaMask()
    
    // Check for already connected accounts
    if (window.ethereum) {
      window.ethereum.request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0])
          }
        })
        .catch(console.error)
    }
  }, [])

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setWalletError("")
        } else {
          setWalletAddress("")
        }
      }

      const handleChainChanged = () => {
        // Reload the page when chain changes
        window.location.reload()
      }

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
      setWalletError("MetaMask is not installed")
      return
    }

    setIsConnecting(true)
    setWalletError("")

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      })

      if (accounts.length > 0) {
        setWalletAddress(accounts[0])
      }
    } catch (error: any) {
      if (error.code === 4001) {
        setWalletError("Connection rejected by user")
      } else {
        setWalletError("Failed to connect wallet")
      }
      console.error("Error connecting to MetaMask:", error)
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = async () => {
    setIsDisconnecting(true)
    
    try {
      // Clear local state immediately
      setWalletAddress("")
      setWalletError("")
      
      // Method 1: Try to revoke permissions (newer MetaMask versions)
      if (window.ethereum && window.ethereum.request) {
        try {
          await window.ethereum.request({
            method: "wallet_revokePermissions",
            params: [{ eth_accounts: {} }]
          })
        } catch (revokeError) {
          try {
            await window.ethereum.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }]
            })
          } catch (requestError) {
            console.log("Please manually disconnect from MetaMask extension")
          }
        }
      }
      
      // Clear any stored wallet data in localStorage if you're using it
      if (typeof window !== "undefined") {
        localStorage.removeItem("walletConnected")
        localStorage.removeItem("walletAddress")
      }
      
    } catch (error) {
      console.error("Error during disconnect:", error)
      setWalletAddress("")
      setWalletError("")
    } finally {
      setIsDisconnecting(false)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const onSplineLoad = () => {
    setSplineLoaded(true)
  }

  const onSplineError = (error: any) => {
    console.error("Spline loading error:", error)
    setSplineLoaded(false)
  }

  // Fallback background component
  const FallbackBackground = () => (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(120,119,198,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:100px_100px] opacity-20" />
    </div>
  )

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        {isClient ? (
          <Suspense fallback={<FallbackBackground />}>
            <Spline
              scene="/scene.splinecode"
              onLoad={onSplineLoad}
              onError={onSplineError}
              className="w-full h-full object-cover"
            />
          </Suspense>
        ) : (
          <FallbackBackground />
        )}
        
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />
        
        {/* Loading fallback background - shown when Spline hasn't loaded */}
        {(!splineLoaded || !isClient) && <FallbackBackground />}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-16 mt-10">
          <Badge variant="outline" className="mb-8 text-primary border-primary/50 bg-primary/20 backdrop-blur-sm px-4 py-2 text-sm font-medium">
            {walletAddress ? (
              <span className="flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Connected: {formatAddress(walletAddress)}
              </span>
            ) : (
               "Connect your wallet to begin"
            )}
          </Badge>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent drop-shadow-lg">
              NFT Arena
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl mt-4 text-white/90 font-normal leading-relaxed drop-shadow-md">
              PvP Gaming Platform
            </span>
          </h1>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16 max-w-5xl mx-auto">
          <div className="group bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:bg-black/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                <Users className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">10,000+</div>
            <p className="text-xs sm:text-sm text-white/70">Active Players</p>
          </div>
          
          <div className="group bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:bg-black/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-1">$2.5M+</div>
            <p className="text-xs sm:text-sm text-white/70">Total Volume</p>
          </div>
          
          <div className="group bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:bg-black/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center group-hover:bg-yellow-500/30 transition-colors">
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-1">50,000+</div>
            <p className="text-xs sm:text-sm text-white/70">Battles Completed</p>
          </div>
          
          <div className="group bg-black/30 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 text-center hover:bg-black/40 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-center mb-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <Zap className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-1">5,000+</div>
            <p className="text-xs sm:text-sm text-white/70">NFT Assets</p>
          </div>
        </div>

        {/* Wallet Error Display */}
        {walletError && (
          <div className="mb-8 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg max-w-md mx-auto">
            <div className="flex items-center gap-2 text-red-300">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{walletError}</span>
            </div>
          </div>
        )}

        {/* ===== MODIFIED CTA SECTION ===== */}
        <div className="mb-20 flex flex-col items-center gap-6">
          {!walletAddress ? (
            // --- Disconnected State ---
            <>
              {/* Primary Action */}
              {isMetaMaskInstalled ? (
                <Button
                  size="lg"
                  className="w-full max-w-xs sm:max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  {isConnecting ? "Connecting..." : "Connect Wallet & Play"}
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="w-full max-w-xs sm:max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  onClick={() => window.open("https://metamask.io/download/", "_blank")}
                >
                  Install MetaMask
                </Button>
              )}

              {/* Secondary Actions */}
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-black/20 backdrop-blur-sm transition-all duration-300"
                  onClick={() => onNavigate("arena")}
                >
                  Enter Practice Arena
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-black/20 backdrop-blur-sm transition-all duration-300"
                  onClick={() => onNavigate("marketplace")}
                >
                  Explore Marketplace
                </Button>
              </div>
            </>
          ) : (
            // --- Connected State ---
            <>
              {/* Primary Action */}
              <Button
                size="lg"
                className="w-full max-w-xs sm:max-w-sm bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                onClick={() => onNavigate("arena")}
              >
                Enter Arena
              </Button>

              {/* Secondary Actions */}
              <div className="flex flex-wrap justify-center items-center gap-4">
                 <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-black/20 backdrop-blur-sm transition-all duration-300"
                    onClick={() => onNavigate("dashboard")}
                >
                    Enter Dashboard
                </Button>
                 <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 bg-black/20 backdrop-blur-sm transition-all duration-300"
                    onClick={() => onNavigate("marketplace")}
                >
                    Explore Marketplace
                </Button>
                <Button
                  variant="ghost"
                  className="text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  onClick={disconnectWallet}
                  disabled={isDisconnecting}
                >
                  {isDisconnecting ? "Disconnecting..." : "Disconnect"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}