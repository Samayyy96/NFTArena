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
    <div className="min-h-screen p-6 pt-24 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 text-white">Combat Arena</h1>
          <p className="text-gray-400">Engage in strategic competitions and prove your skill</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Battle Setup */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800 border-blue-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sword className="w-5 h-5 text-blue-400" />
                  Competition Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Battle Type Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-700">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-white">Competition Type</h3>
                    <p className="text-sm text-gray-400">
                      {isStakedBattle
                        ? "Engage in high-stakes competitions with token rewards"
                        : "Participate in practice competitions for skill enhancement"}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm ${!isStakedBattle ? "text-blue-400" : "text-gray-400"}`}>
                      Free Competition
                    </span>
                    <Switch checked={isStakedBattle} onCheckedChange={setIsStakedBattle} />
                    <span className={`text-sm ${isStakedBattle ? "text-yellow-400" : "text-gray-400"}`}>
                      Staked Competition
                    </span>
                  </div>
                </div>

                {/* Stake Amount Input */}
                {isStakedBattle && (
                  <div className="space-y-4 p-4 rounded-lg bg-yellow-900/20 border border-yellow-500/30">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-400" />
                      <h3 className="font-semibold text-yellow-400">Staked Competition Setup</h3>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-300">Stake Amount (MONAD)</label>
                      <Input
                        type="number"
                        placeholder="Enter stake amount..."
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        className="text-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>Min: 0.1 MONAD</span>
                        <span>Your Balance: 25.7 MONAD</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-yellow-900/30 border border-yellow-500">
                      <p className="text-sm font-medium text-yellow-400 mb-1">⚠️ STAKE WARNING</p>
                      <p className="text-xs text-gray-300">
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
                      <div className="text-6xl font-bold text-yellow-400 animate-pulse">{countdown}</div>
                      <p className="text-yellow-400">Confirming stake transaction...</p>
                    </div>
                  ) : isSearching ? (
                    <div className="space-y-4">
                      <div className="animate-spin w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full mx-auto"></div>
                      <p className="text-blue-400">Finding worthy opponent...</p>
                    </div>
                  ) : (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="lg"
                          className={`px-12 py-6 text-xl ${
                            isStakedBattle
                              ? "bg-yellow-600 hover:bg-yellow-700 text-black"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                          disabled={isStakedBattle && !stakeAmount}
                        >
                          <Play className="w-6 h-6 mr-2" />
                          {isStakedBattle ? `Stake ${stakeAmount || "0"} MONAD & Compete` : "Enter Free Competition"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">
                            {isStakedBattle ? "Confirm Staked Competition" : "Enter Competition Arena"}
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300">
                            {isStakedBattle ? (
                              <>
                                You are about to stake <strong>{stakeAmount} MONAD</strong> tokens. Your opponent will
                                also stake the same amount. Winner takes all (
                                {(Number.parseFloat(stakeAmount || "0") * 2).toFixed(1)} MONAD total).
                                <br />
                                <br />
                                <strong className="text-yellow-400">This action cannot be undone.</strong>
                              </>
                            ) : (
                              "You are about to enter a free practice competition. You'll earn XP based on your performance."
                            )}
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={confirmStake}
                            className={isStakedBattle ? "bg-yellow-600 hover:bg-yellow-700 text-black" : "bg-blue-600 hover:bg-blue-700 text-white"}
                          >
                            {isStakedBattle ? "Confirm Stake" : "Enter Arena"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>

                {/* Auto-signing Notice */}
                <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/30">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-sm font-medium text-blue-400">Efficient Gameplay Enabled</span>
                  </div>
                  <p className="text-xs text-gray-300">
                    Transactions during competition will be processed automatically for a seamless experience.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Active Fighter */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Your Competitor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-blue-400">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" />
                    <AvatarFallback className="bg-gray-700 text-white">SW</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white">ShadowWarrior_99</h3>
                    <p className="text-gray-400">Level 12 • 2450 XP</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        45W
                      </Badge>
                      <Badge variant="outline" className="text-red-400 border-red-400">
                        8L
                      </Badge>
                      <Badge variant="outline" className="text-blue-400 border-blue-400">
                        84.9% WR
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sword className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Attack: 85</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">Defense: 78</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">Speed: 92</span>
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
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5 text-blue-400" />
                  Arena Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Online Competitors</span>
                  <span className="font-semibold text-blue-400">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Active Competitions</span>
                  <span className="font-semibold text-yellow-400">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Avg. Wait Time</span>
                  <span className="font-semibold text-white">12s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-400">Total Staked</span>
                  <span className="font-semibold text-yellow-400">2,847 MONAD</span>
                </div>
              </CardContent>
            </Card>

            {/* Recent Battles */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Clock className="w-5 h-5 text-gray-400" />
                  Recent Competitions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-gray-700">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gray-600 text-white">DK</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white">DragonKnight</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                      Victory
                    </Badge>
                    <p className="text-xs text-gray-400">+50 XP</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-gray-700">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gray-600 text-white">SM</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white">SwordMaster</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                      Defeat
                    </Badge>
                    <p className="text-xs text-gray-400">+15 XP</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-gray-700">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-gray-600 text-white">NB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-white">NightBlade</span>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                      Victory
                    </Badge>
                    <p className="text-xs text-gray-400">+2.5 MONAD</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Trophy className="w-5 h-5 text-blue-400" />
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
                  <div key={fighter.rank} className="flex items-center gap-3 p-2 rounded bg-gray-700">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        fighter.rank === 1
                          ? "bg-blue-400 text-black"
                          : fighter.rank === 2
                            ? "bg-gray-400 text-black"
                            : fighter.rank === 3
                              ? "bg-orange-400 text-black"
                              : "bg-gray-600 text-gray-400"
                      }`}
                    >
                      {fighter.rank}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{fighter.name}</p>
                      <p className="text-xs text-gray-400">
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