"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface WalletContextType {
  isConnected: boolean
  address: string | null
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function useWallet() {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}

interface WalletProviderProps {
  children: ReactNode
}

export function WalletProvider({ children }: WalletProviderProps) {
  const [isConnected, setIsConnected] = useState(true) // Simulated connection
  const [address, setAddress] = useState("0xcv1234...5678")
  const [balance, setBalance] = useState(25.7)

  const connect = async () => {
    // Simulate wallet connection
    setIsConnected(true)
    setAddress("0xcv1234...5678")
    setBalance(25.7)
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
    setBalance(0)
  }

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
