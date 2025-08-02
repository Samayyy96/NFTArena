"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Sword, Trophy, ArrowRightLeft, Plus, Check, X } from "lucide-react"

interface FighterID {
  id: string
  username: string
  address: string
  xp: number
  level: number
  wins: number
  losses: number
  isActive: boolean
}

export function GameDashboard() {
  const [fighterIDs, setFighterIDs] = useState<FighterID[]>([
    {
      id: "1",
      username: "ShadowWarrior_99",
      address: "0xcv1234...5678",
      xp: 2450,
      level: 12,
      wins: 45,
      losses: 8,
      isActive: true,
    },
    {
      id: "2",
      username: "NightBlade_X",
      address: "0xab9876...4321",
      xp: 1200,
      level: 8,
      wins: 23,
      losses: 12,
      isActive: false,
    },
  ])

  const [newUsername, setNewUsername] = useState("")
  const [isChecking, setIsChecking] = useState(false)
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null)

  const checkUsernameAvailability = async () => {
    if (!newUsername) return
    setIsChecking(true)
    // Simulate API call
    setTimeout(() => {
      setIsAvailable(Math.random() > 0.5)
      setIsChecking(false)
    }, 1000)
  }

  const switchFighterID = (id: string) => {
    setFighterIDs((prev) =>
      prev.map((fighter) => ({
        ...fighter,
        isActive: fighter.id === id,
      })),
    )
  }

  const activeFighter = fighterIDs.find((f) => f.isActive)

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Fighter Command Center</h1>
          <p className="text-muted-foreground">Manage your identities, track progress, and dominate the arena</p>
        </div>

        <Tabs defaultValue="identities" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="identities">My Fighter IDs</TabsTrigger>
            <TabsTrigger value="mapping">Address Mapping</TabsTrigger>
            <TabsTrigger value="create">Create New ID</TabsTrigger>
          </TabsList>

          <TabsContent value="identities" className="space-y-6">
            {/* Active Fighter Overview */}
            {activeFighter && (
              <Card className="bg-gradient-to-r from-gray-100 to-gray-300 border-gray-400">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-blue-500" />
                    Active Fighter
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16 border-2 border-blue-500">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>{activeFighter.username.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-2xl font-bold">{activeFighter.username}</h3>
                        <p className="text-muted-foreground">
                          Level {activeFighter.level} • {activeFighter.xp} XP
                        </p>
                        <div className="flex gap-4 mt-2">
                          <Badge variant="outline" className="text-green-400 border-green-400">
                            {activeFighter.wins}W
                          </Badge>
                          <Badge variant="outline" className="text-red-400 border-red-400">
                            {activeFighter.losses}L
                          </Badge>
                          <Badge variant="outline" className="text-blue-500 border-blue-500">
                            {((activeFighter.wins / (activeFighter.wins + activeFighter.losses)) * 100).toFixed(1)}% WR
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Wallet Address</p>
                      <p className="font-mono text-lg">{activeFighter.address}</p>
                      <Progress value={(activeFighter.xp % 200) / 2} className="w-48 mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">
                        {activeFighter.xp % 200}/200 XP to next level
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Fighter IDs Carousel */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fighterIDs.map((fighter) => (
                <Card
                  key={fighter.id}
                  className={`transition-all duration-300 hover:scale-105 cursor-pointer ${
                    fighter.isActive ? "ring-2 ring-primary bg-primary/10" : "hover:bg-card/80"
                  }`}
                  onClick={() => switchFighterID(fighter.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{fighter.username}</CardTitle>
                      {fighter.isActive && <Badge className="bg-blue-500 text-background">Active</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-mono text-sm">{fighter.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sword className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">
                          Level {fighter.level} • {fighter.xp} XP
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-green-400">{fighter.wins} Wins</span>
                        <span className="text-red-400">{fighter.losses} Losses</span>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                          disabled={fighter.isActive}
                        >
                          {fighter.isActive ? "Active" : "Switch ID"}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          Trade ID
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mapping" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Address Mapping Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fighterIDs.map((fighter) => (
                    <div key={fighter.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>{fighter.username.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span className="font-mono text-sm">{fighter.address}</span>
                      </div>
                      <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{fighter.username}</span>
                        {fighter.isActive && (
                          <Badge variant="outline" className="text-blue-500 border-blue-500">
                            Active
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Fighter Identity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Choose Username</label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter unique username..."
                      value={newUsername}
                      onChange={(e) => {
                        setNewUsername(e.target.value)
                        setIsAvailable(null)
                      }}
                      className="flex-1"
                    />
                    <Button onClick={checkUsernameAvailability} disabled={!newUsername || isChecking} variant="outline">
                      {isChecking ? "Checking..." : "Check"}
                    </Button>
                  </div>
                  {isAvailable !== null && (
                    <div
                      className={`flex items-center gap-2 text-sm ${isAvailable ? "text-green-400" : "text-red-400"}`}
                    >
                      {isAvailable ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      {isAvailable ? "Username available!" : "Username already taken"}
                    </div>
                  )}
                </div>

                <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-blue-500">
                  <h4 className="font-semibold mb-2">Fighter ID Benefits:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Unique identity across the Monad ecosystem</li>
                    <li>• Tradeable as Soul Bound Token (SBT)</li>
                    <li>• XP and achievements tied to username</li>
                    <li>• Cross-game compatibility</li>
                  </ul>
                </div>

                <Button className="w-full" disabled={!isAvailable} size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Fighter ID (0.1 MONAD)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
