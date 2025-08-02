"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { User, Trophy, Coins, Filter, TrendingUp, Eye, ShoppingCart } from "lucide-react"

interface MarketplaceAccount {
  id: string
  username: string
  level: number
  xp: number
  wins: number
  losses: number
  owner: string
  price: number
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  achievements: string[]
}

export function Marketplace() {
  const [accounts] = useState<MarketplaceAccount[]>([
    {
      id: "1",
      username: "DragonSlayer_Pro",
      level: 25,
      xp: 5200,
      wins: 89,
      losses: 12,
      owner: "0xabc123...def456",
      price: 15.5,
      rarity: "Epic",
      achievements: ["First Blood", "Combo Master", "Arena Champion"],
    },
    {
      id: "2",
      username: "ShadowMaster_X",
      level: 18,
      xp: 3800,
      wins: 67,
      losses: 23,
      owner: "0x789xyz...123abc",
      price: 8.2,
      rarity: "Rare",
      achievements: ["Speed Demon", "Critical Strike"],
    },
    {
      id: "3",
      username: "NightFury_Elite",
      level: 32,
      xp: 7500,
      wins: 124,
      losses: 8,
      owner: "0xdef789...456ghi",
      price: 28.9,
      rarity: "Legendary",
      achievements: ["Undefeated", "Grand Master", "Legend Born", "Perfect Warrior"],
    },
  ])

  const [priceRange, setPriceRange] = useState([0, 50])
  const [levelRange, setLevelRange] = useState([1, 50])
  const [selectedRarity, setSelectedRarity] = useState("all")

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-400 border-gray-400"
      case "Rare":
        return "text-blue-400 border-blue-400"
      case "Epic":
        return "text-purple-400 border-purple-400"
      case "Legendary":
        return "text-orange-500 border-orange-500"
      default:
        return "text-gray-400 border-gray-400"
    }
  }

  return (
    <div className="min-h-screen p-6 pt-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-primary">Account Marketplace</h1>
          <p className="text-muted-foreground">Trade valuable accounts and expand your portfolio</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="browse">Browse Accounts</TabsTrigger>
            <TabsTrigger value="sell">List Account</TabsTrigger>
            <TabsTrigger value="analytics">Market Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range (MONAD)</label>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={50} step={0.1} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{priceRange[0]} MONAD</span>
                      <span>{priceRange[1]} MONAD</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Level Range</label>
                    <Slider value={levelRange} onValueChange={setLevelRange} max={50} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Level {levelRange[0]}</span>
                      <span>Level {levelRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Rarity</label>
                    <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Rarities</SelectItem>
                        <SelectItem value="common">Common</SelectItem>
                        <SelectItem value="rare">Rare</SelectItem>
                        <SelectItem value="epic">Epic</SelectItem>
                        <SelectItem value="legendary">Legendary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sort By</label>
                    <Select defaultValue="price-low">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="level-high">Level: High to Low</SelectItem>
                        <SelectItem value="winrate">Win Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accounts.map((account) => (
                <Card key={account.id} className="hover:scale-105 transition-all duration-300 border">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{account.username}</CardTitle>
                      <Badge variant="outline" className={getRarityColor(account.rarity)}>
                        {account.rarity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback>{account.username.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-muted-foreground">Level {account.level}</p>
                        <p className="text-sm text-muted-foreground">{account.xp} XP</p>
                        <div className="flex gap-2 mt-1">
                          <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                            {account.wins}W
                          </Badge>
                          <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                            {account.losses}L
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Achievements</p>
                      <div className="flex flex-wrap gap-1">
                        {account.achievements.slice(0, 2).map((achievement) => (
                          <Badge key={achievement} variant="secondary" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                        {account.achievements.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{account.achievements.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Current Owner</span>
                        <span className="font-mono text-xs">{account.owner}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-primary">{account.price} MONAD</span>
                        <span className="text-xs text-muted-foreground">≈ ${(account.price * 2.5).toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{account.username} - Detailed Stats</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Combat Stats</h4>
                                <div className="space-y-1 text-sm">
                                  <div className="flex justify-between">
                                    <span>Level:</span>
                                    <span>{account.level}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Total XP:</span>
                                    <span>{account.xp}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Win Rate:</span>
                                    <span>{((account.wins / (account.wins + account.losses)) * 100).toFixed(1)}%</span>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">All Achievements</h4>
                                <div className="space-y-1">
                                  {account.achievements.map((achievement) => (
                                    <Badge key={achievement} variant="secondary" className="text-xs mr-1 mb-1">
                                      {achievement}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-background">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>List Your Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-muted/50 border-l-4 border-secondary">
                  <h4 className="font-semibold mb-2 text-secondary">⚠️ Important Notice</h4>
                  <p className="text-sm text-muted-foreground">
                    Listing your account will mint it as a Soul Bound Token (SBT). Once sold, you will lose access to
                    this fighter identity permanently.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Select Account to List</h3>
                    <Card className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback>SW</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">ShadowWarrior_99</p>
                          <p className="text-sm text-muted-foreground">Level 12 • 2450 XP</p>
                          <p className="text-sm text-muted-foreground">45W / 8L (84.9% WR)</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Set Price</h3>
                    <div className="space-y-2">
                      <Input type="number" placeholder="Enter price in MONAD" className="text-lg" />
                      <p className="text-xs text-muted-foreground">
                        Suggested price range: 5-12 MONAD based on similar accounts
                      </p>
                    </div>
                  </div>
                </div>

                <Button size="lg" className="w-full bg-secondary hover:bg-secondary/90">
                  <Coins className="w-4 h-4 mr-2" />
                  List Account for Sale
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Market Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">1,247 MONAD</div>
                  <p className="text-sm text-muted-foreground">24h trading volume</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-success" />
                    Active Listings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">89</div>
                  <p className="text-sm text-muted-foreground">Accounts for sale</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-secondary" />
                    Avg. Price
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">12.4 MONAD</div>
                  <p className="text-sm text-muted-foreground">Average sale price</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
