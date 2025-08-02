"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User, ShoppingCart, Sword, Palette, Wallet, Settings, LogOut } from "lucide-react"
import { useState, useEffect } from "react"


interface NavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
}

interface WalletState {
  isConnected: boolean
  address: string
  balance: string
  isLoading: boolean
}

// Type declaration for window.ethereum
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

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: "",
    balance: "0.0",
    isLoading: false
  })

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
    { id: "arena", label: "Arena", icon: Sword },
    // { id: "gallery", label: "NFT Gallery", icon: Palette },
  ]

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  }

  // Connect to MetaMask
  const connectWallet = async () => {
    if (!isMetaMaskInstalled()) {
      alert("Please install MetaMask to connect your wallet")
      return
    }

    try {
      setWallet(prev => ({ ...prev, isLoading: true }))
      
      // Request account access
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed")
      }
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts"
      })

      if (accounts.length > 0) {
        const address = accounts[0]
        await getBalance(address)
        setWallet(prev => ({ 
          ...prev, 
          isConnected: true, 
          address,
          isLoading: false 
        }))
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error)
      setWallet(prev => ({ ...prev, isLoading: false }))
    }
  }

  // Get balance from MetaMask
  const getBalance = async (address: string) => {
    try {
      // Get balance in Wei
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed")
      }
      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"]
      })

      // Convert Wei to Ether (assuming MONAD has 18 decimals like ETH)
      const balanceEth = (parseInt(balanceWei, 16) / Math.pow(10, 18)).toFixed(2)
      
      setWallet(prev => ({ ...prev, balance: balanceEth }))
    } catch (error) {
      console.error("Error getting balance:", error)
    }
  }

  // Check if already connected on component mount
  useEffect(() => {
    const checkConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          if (!window.ethereum) {
            throw new Error("MetaMask is not installed")
          }
          const accounts = await window.ethereum.request({
            method: "eth_accounts"
          })
          
          if (accounts.length > 0) {
            const address = accounts[0]
            await getBalance(address)
            setWallet(prev => ({ 
              ...prev, 
              isConnected: true, 
              address 
            }))
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()

    // Listen for account changes
    if (isMetaMaskInstalled()) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          setWallet({
            isConnected: false,
            address: "",
            balance: "0.0",
            isLoading: false
          })
        } else {
          // User switched accounts
          const address = accounts[0]
          getBalance(address)
          setWallet(prev => ({ ...prev, address }))
        }
      }

      if (window.ethereum) {
        window.ethereum.on("accountsChanged", handleAccountsChanged)

        // Cleanup
        return () => {
          if (window.ethereum) {
            window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
          }
        }
      }
    }
  }, [])

  // Disconnect wallet
  const disconnectWallet = () => {
    setWallet({
      isConnected: false,
      address: "",
      balance: "0.0",
      isLoading: false
    })
  }

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return ""
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <Sword className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">ShadowFighters</span>
            <Badge variant="outline" className="text-purple-400 border-purple-400 bg-purple-400/10">
              Monad
            </Badge>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={
                  activeSection === item.id 
                    ? "bg-purple-600 text-white hover:bg-purple-700" 
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Wallet & User Menu */}
          <div className="flex items-center gap-4">
            {/* Wallet Status */}
            {wallet.isConnected ? (
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/50">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                <span className="text-sm font-mono text-gray-300">
                  {wallet.isLoading ? "Loading..." : `${wallet.balance} MONAD`}
                </span>
              </div>
            ) : (
              <Button 
                size="sm" 
                onClick={connectWallet}
                disabled={wallet.isLoading}
                className="hidden sm:flex bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Wallet className="w-4 h-4 mr-2" />
                {wallet.isLoading ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}

            {/* User Menu */}
            {wallet.isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-300 hover:text-white hover:bg-gray-800">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-purple-600 text-white">SW</AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:inline">ShadowWarrior_99</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-gray-900 border-gray-700">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium text-white">ShadowWarrior_99</p>
                    <p className="text-xs text-gray-400">{formatAddress(wallet.address)}</p>
                    <p className="text-xs text-purple-400 mt-1">{wallet.balance} MONAD</p>
                  </div>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
                    <Wallet className="w-4 h-4 mr-2" />
                    Wallet Details
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-gray-300 hover:bg-gray-800 hover:text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem className="text-red-400 hover:bg-red-950 hover:text-red-300" onClick={disconnectWallet}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                size="sm" 
                onClick={connectWallet}
                disabled={wallet.isLoading}
                className="sm:hidden bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Wallet className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}