"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Sword, Shield, Zap, Clock, Users, AlertTriangle, Play, Trophy } from "lucide-react"

export function GamingArena() {
  const [isStakedBattle, setIsStakedBattle] = useState(false)
  const [stakeAmount, setStakeAmount] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [countdown, setCountdown] = useState(0)

  const startBattle = () => {
    setIsSearching(true)
    // Simulate matchmaking
    setTimeout(() => {
      setIsSearching(false)
    }, 3000)
  }

  const confirmStake = () => {
    if (isStakedBattle && stakeAmount) {
      setCountdown(10)
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            startBattle()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      startBattle()
    }
  }

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2">Combat Arena</h1>
          <p className="text-muted-foreground">Engage in strategic competitions and prove your skill</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Battle Setup */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sword className="w-5 h-5 text-primary" />
                  Competition Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Battle Type Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-background/50">
                  <div className="space-y-1">
                    <h3 className="font-semibold">Competition Type</h3>
                    <p className="text-sm text-muted-foreground">
                      {isStakedBattle
                        ? "Engage in high-stakes competitions with token rewards"
                        : "Participate in practice competitions for skill enhancement"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${!isStakedBattle ? "text-primary" : "text-muted-foreground"}`}>
                      Free Competition
                    </span>
                    <Switch checked={isStakedBattle} onCheckedChange={setIsStakedBattle} />
                    <span className={`text-sm ${isStakedBattle ? "text-secondary" : "text-muted-foreground"}`}>
                      Staked Competition
                    </span>
                  </div>
                </div>

                {/* Stake Amount Input */}
                {isStakedBattle && (
                  <div className="space-y-4 p-4 rounded-lg bg-secondary/10 border border-secondary/30">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-secondary" />
                      <h3 className="font-semibold text-secondary">Staked Competition Setup</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stake Amount (MONAD)</label>
                      <Input
                        type="number"
                        placeholder="Enter stake amount..."
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="text-lg"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Min: 0.1 MONAD</span>
                        <span>Your Balance: 25.7 MONAD</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-secondary/20 border border-secondary">
                      <p className="text-sm font-medium text-secondary mb-1">⚠️ STAKE WARNING</p>
                      <p className="text-xs text-muted-foreground">
                        Both players must stake {stakeAmount || "X"} MONAD tokens. Winner takes all (
                        {(Number.parseFloat(stakeAmount || "0") * 2).toFixed(1)} MONAD total). This action cannot be
                        undone.
                      </p>
                    </div>
                  </div>
                )}

                {/* Battle Button */}
                <div className="text-center">
                  {countdown > 0 ? (
                    <div className="space-y-4">
                      <div className="text-6xl font-bold text-secondary animate-pulse">{countdown}</div>
                      <p className="text-secondary">Confirming stake transaction...</p>
                    </div>
                  ) : isSearching ? (
                    <div className="space-y-4">
                      <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-primary">Finding worthy opponent...</p>
                    </div>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="lg"
                          className={`px-12 py-6 text-xl ${
                            isStakedBattle
                              ? "bg-secondary hover:bg-secondary/90"
                              : "bg-primary hover:bg-primary/90 text-background"
                          }`}
                          disabled={isStakedBattle && !stakeAmount}
                        >
                          <Play className="w-6 h-6 mr-2" />
                          {isStakedBattle ? `Stake ${stakeAmount || "0"} MONAD & Compete` : "Enter Free Competition"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {isStakedBattle ? "Confirm Staked Competition" : "Enter Competition Arena"}
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            {isStakedBattle ? (
                              <>
                                You are about to stake <strong>{stakeAmount} MONAD</strong> tokens. Your opponent will
                                also stake the same amount. Winner takes all (
                                {(Number.parseFloat(stakeAmount || "0") * 2).toFixed(1)} MONAD total).
                                <br />
                                <br />
                                <strong className="text-secondary">This action cannot be undone.</strong>
                              </>
                            ) : (
                              "You are about to enter a free practice competition. You'll earn XP based on your performance."
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={confirmStake}>
                            {isStakedBattle ? "Confirm Stake" : "Enter Arena"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>

                {/* Auto-signing Notice */}
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Efficient Gameplay Enabled</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Transactions during competition will be processed automatically for a seamless experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Active Fighter */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Your Competitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">ShadowWarrior_99</h3>
                    <p className="text-muted-foreground">Level 12 • 2450 XP</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        45W
                      </Badge>
                      <Badge variant="outline" className="text-red-400 border-red-400">
                        8L
                      </Badge>
                      <Badge variant="outline" className="text-primary border-primary">
                        84.9% WR
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sword className="w-4 h-4 text-secondary" />
                        <span className="text-sm">Attack: 85</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-secondary" />
                        <span className="text-sm">Defense: 78</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-primary" />
                        <span className="text-sm">Speed: 92</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Arena Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-primary" />
                  Arena Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Online Competitors</span>
                  <span className="font-semibold text-primary">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Active Competitions</span>
                  <span className="font-semibold text-secondary">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Avg. Wait Time</span>
                  <span className="font-semibold">12s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Staked</span>
                  <span className="font-semibold text-secondary">2,847 MONAD</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Battles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  Recent Competitions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">DK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">DragonKnight</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                      Victory
                    </Badge>
                    <p className="text-xs text-muted-foreground">+50 XP</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">SM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">SwordMaster</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                      Defeat
                    </Badge>
                    <p className="text-xs text-muted-foreground">+15 XP</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">NB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">NightBlade</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                      Victory
                    </Badge>
                    <p className="text-xs text-muted-foreground">+2.5 MONAD</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Top Competitors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { rank: 1, name: "LegendSlayer", level: 45, wins: 234 },
                  { rank: 2, name: "ShadowEmperor", level: 42, wins: 198 },
                  { rank: 3, name: "VoidMaster", level: 38, wins: 167 },
                  { rank: 4, name: "ShadowWarrior_99", level: 12, wins: 45 },
                ].map((fighter) => (
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 rounded bg-muted/30">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        fighter.rank === 1
                          ? "bg-primary text-background"
                          : fighter.rank === 2
                            ? "bg-gray-400 text-background"
                            : fighter.rank === 3
                              ? "bg-orange-400 text-background"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {fighter.rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{fighter.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Lv.{fighter.level} • {fighter.wins}W
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
