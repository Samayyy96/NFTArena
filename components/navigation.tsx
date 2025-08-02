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

interface NavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const navItems = [
    { id: "hero", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "marketplace", label: "Marketplace", icon: ShoppingCart },
    { id: "arena", label: "Arena", icon: Sword },
    { id: "gallery", label: "NFT Gallery", icon: Palette },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sword className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold neon-text">ShadowFighters</span>
            <Badge variant="outline" className="text-gaming-neon border-gaming-neon">
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
                className={activeSection === item.id ? "bg-primary text-primary-foreground" : ""}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Wallet & User Menu */}
          <div className="flex items-center gap-4">
            {/* Wallet Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-gaming-neon animate-pulse"></div>
              <span className="text-sm font-mono">25.7 MONAD</span>
            </div>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">ShadowWarrior_99</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">ShadowWarrior_99</p>
                  <p className="text-xs text-muted-foreground">0xcv1234...5678</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-400">
                  <LogOut className="w-4 h-4 mr-2" />
                  Disconnect
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
