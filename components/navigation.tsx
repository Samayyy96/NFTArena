"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Home, User, ShoppingCart, Sword, Wallet, Settings, LogOut } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

interface NavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
}

interface WalletState {
  isConnected: boolean
  address: string
  balance: string
  username: string | null
  isLoading: boolean
}

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
    balance: "0.00",
    username: null,
    isLoading: true,
  })

  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
    { id: "arena", label: "Arena", icon: Sword },
  ]
  
  const isMetaMaskInstalled = typeof window !== "undefined" && !!window.ethereum?.isMetaMask;

  const updateWalletState = useCallback(async (accounts: string[]) => {
    if (!isMetaMaskInstalled || !window.ethereum) return;

    if (accounts.length === 0) {
      setWallet({ isConnected: false, address: "", balance: "0.00", username: null, isLoading: false });
      return;
    }

    const address = accounts[0];
    const generatedUsername = `Gamer${address.slice(-4)}`;

    try {
      const balanceWei = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"]
      });
      const balanceEth = (parseInt(balanceWei, 16) / Math.pow(10, 18)).toFixed(4);

      setWallet({
        isConnected: true,
        address,
        balance: balanceEth,
        username: generatedUsername,
        isLoading: false,
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
      setWallet(prev => ({ ...prev, isConnected: true, address, username: generatedUsername, isLoading: false }));
    }
  }, [isMetaMaskInstalled]);

  useEffect(() => {
    if (isMetaMaskInstalled && window.ethereum) {
      window.ethereum.request({ method: "eth_accounts" }).then(updateWalletState).catch(console.error);
      window.ethereum.on("accountsChanged", updateWalletState);
      window.ethereum.on("chainChanged", () => window.location.reload());

      return () => {
        window.ethereum?.removeListener("accountsChanged", updateWalletState);
        window.ethereum?.removeListener("chainChanged", () => window.location.reload());
      };
    } else {
      setWallet(prev => ({...prev, isLoading: false}));
    }
  }, [isMetaMaskInstalled, updateWalletState]);

  const connectWallet = async () => {
    // This is the improved section
    if (!isMetaMaskInstalled) {
      // Guide user to install MetaMask instead of showing an alert
      window.open("https://metamask.io/download/", "_blank");
      return;
    }
    
    if (!window.ethereum) return;

    setWallet(prev => ({ ...prev, isLoading: true }));
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      await updateWalletState(accounts);
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setWallet(prev => ({ ...prev, isLoading: false }));
    }
  };

  const disconnectWallet = () => {
     setWallet({ isConnected: false, address: "", balance: "0.00", username: null, isLoading: false });
  };

  const formatAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("hero")}>
             <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Sword className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white hidden sm:block">NFT Arena</span>
          </div>

          <div className="hidden md:flex items-center gap-2 rounded-full bg-black/20 p-1 border border-white/10">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => onNavigate(item.id)}
                className={`transition-all duration-200 px-4 py-2 rounded-full ${
                  activeSection === item.id 
                    ? "bg-blue-500 text-white shadow" 
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {wallet.isConnected ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="h-12 border-white/20 bg-black/30 hover:bg-black/50 text-white flex items-center gap-3">
                    <div className="text-left">
                      <p className="text-sm font-medium">{wallet.username || 'User'}</p> 
                      <p className="text-xs text-gray-400 -mt-0.5">{`${wallet.balance} MONAD`}</p>
                    </div>
                    <Avatar className="w-9 h-9 border-2 border-gray-700">
                      <AvatarImage src={`https://api.dicebear.com/8.x/bottts/svg?seed=${wallet.address}`} />
                      <AvatarFallback className="bg-blue-500">A</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-gray-900 border-gray-700 text-white">
                  <DropdownMenuLabel className="px-3 py-2">
                    <p className="font-medium">{wallet.username || 'User'}</p>
                    <p className="text-xs text-gray-400 -mt-1">{formatAddress(wallet.address)}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onSelect={() => onNavigate('dashboard')} className="focus:bg-gray-800 focus:text-white">
                    <User className="w-4 h-4 mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => {}} className="focus:bg-gray-800 focus:text-white">
                    <Settings className="w-4 h-4 mr-2" /> Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-700" />
                  <DropdownMenuItem onSelect={disconnectWallet} className="text-red-400 focus:bg-red-950 focus:text-red-300">
                    <LogOut className="w-4 h-4 mr-2" /> Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={connectWallet} disabled={wallet.isLoading} className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold hover:scale-105 transition-transform duration-200">
                <Wallet className="w-4 h-4 mr-2" />
                {wallet.isLoading ? "Loading..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}