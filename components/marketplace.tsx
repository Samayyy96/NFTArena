"use client"

import { useState, useMemo } from "react"
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
  const [allAccounts] = useState<MarketplaceAccount[]>([
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
    {
      id: "4",
      username: "FireBlade_Knight",
      level: 15,
      xp: 2900,
      wins: 34,
      losses: 16,
      owner: "0x456def...789abc",
      price: 6.8,
      rarity: "Common",
      achievements: ["First Victory", "Combo Starter"],
    },
    {
      id: "5",
      username: "IceQueen_Mystique",
      level: 28,
      xp: 6200,
      wins: 98,
      losses: 15,
      owner: "0x123ghi...456jkl",
      price: 22.3,
      rarity: "Epic",
      achievements: ["Ice Master", "Frozen Heart", "Winter Champion"],
    },
  ])

  const [priceRange, setPriceRange] = useState([0, 50])
  const [levelRange, setLevelRange] = useState([1, 50])
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [sortBy, setSortBy] = useState("price-low")
  const [listingPrice, setListingPrice] = useState("")

  // Filter and sort accounts
  const filteredAndSortedAccounts = useMemo(() => {
    let filtered = allAccounts.filter(account => {
      // Price filter
      if (account.price < priceRange[0] || account.price > priceRange[1]) {
        return false
      }
      
      // Level filter
      if (account.level < levelRange[0] || account.level > levelRange[1]) {
        return false
      }
      
      // Rarity filter
      if (selectedRarity !== "all" && account.rarity.toLowerCase() !== selectedRarity) {
        return false
      }
      
      return true
    })

    // Sort accounts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "level-high":
          return b.level - a.level
        case "winrate":
          const winRateA = a.wins / (a.wins + a.losses)
          const winRateB = b.wins / (b.wins + b.losses)
          return winRateB - winRateA
        default:
          return 0
      }
    })

    return filtered
  }, [allAccounts, priceRange, levelRange, selectedRarity, sortBy])

  // Calculate market analytics
  const marketAnalytics = useMemo(() => {
    const totalVolume = allAccounts.reduce((sum, account) => sum + account.price, 0)
    const activeListings = allAccounts.length
    const avgPrice = totalVolume / activeListings
    
    return {
      volume: totalVolume.toFixed(1),
      listings: activeListings,
      avgPrice: avgPrice.toFixed(1)
    }
  }, [allAccounts])

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

  const handleBuyAccount = (accountId: string) => {
    alert(`Purchasing account ${accountId}. This would integrate with your wallet.`)
  }

  const handleListAccount = () => {
    if (!listingPrice || parseFloat(listingPrice) <= 0) {
      alert("Please enter a valid price")
      return
    }
    alert(`Listing account for ${listingPrice} MONAD. This would create an NFT listing.`)
  }

  const resetFilters = () => {
    setPriceRange([0, 50])
    setLevelRange([1, 50])
    setSelectedRarity("all")
    setSortBy("price-low")
  }

  return (
    <div className="min-h-screen p-6 pt-24 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-blue-400">Account Marketplace</h1>
          <p className="text-gray-400">Trade valuable accounts and expand your portfolio</p>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="browse" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400">Browse Accounts</TabsTrigger>
            <TabsTrigger value="sell" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400">List Account</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white text-gray-400">Market Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            {/* Filters */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Filter className="w-5 h-5" />
                    Filters
                  </CardTitle>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={resetFilters}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    Reset Filters
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Price Range (MONAD)</label>
                    <Slider 
                      value={priceRange} 
                      onValueChange={setPriceRange} 
                      max={50} 
                      step={0.1} 
                      className="w-full" 
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{priceRange[0]} MONAD</span>
                      <span>{priceRange[1]} MONAD</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Level Range</label>
                    <Slider 
                      value={levelRange} 
                      onValueChange={setLevelRange} 
                      max={50} 
                      step={1} 
                      className="w-full" 
                    />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Level {levelRange[0]}</span>
                      <span>Level {levelRange[1]}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Rarity</label>
                    <Select value={selectedRarity} onValueChange={setSelectedRarity}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="all" className="text-white hover:bg-gray-600">All Rarities</SelectItem>
                        <SelectItem value="common" className="text-white hover:bg-gray-600">Common</SelectItem>
                        <SelectItem value="rare" className="text-white hover:bg-gray-600">Rare</SelectItem>
                        <SelectItem value="epic" className="text-white hover:bg-gray-600">Epic</SelectItem>
                        <SelectItem value="legendary" className="text-white hover:bg-gray-600">Legendary</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Sort By</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="price-low" className="text-white hover:bg-gray-600">Price: Low to High</SelectItem>
                        <SelectItem value="price-high" className="text-white hover:bg-gray-600">Price: High to Low</SelectItem>
                        <SelectItem value="level-high" className="text-white hover:bg-gray-600">Level: High to Low</SelectItem>
                        <SelectItem value="winrate" className="text-white hover:bg-gray-600">Win Rate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  Showing {filteredAndSortedAccounts.length} of {allAccounts.length} accounts
                </div>
              </CardContent>
            </Card>

            {/* Account Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedAccounts.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400 text-lg">No accounts match your current filters</p>
                  <Button 
                    onClick={resetFilters}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                filteredAndSortedAccounts.map((account) => (
                  <Card key={account.id} className="hover:scale-105 transition-all duration-300 bg-gray-800 border-gray-700">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg text-white">{account.username}</CardTitle>
                        <Badge variant="outline" className={getRarityColor(account.rarity)}>
                          {account.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src="/placeholder.svg?height=64&width=64" />
                          <AvatarFallback className="bg-gray-700 text-white">{account.username.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm text-gray-400">Level {account.level}</p>
                          <p className="text-sm text-gray-400">{account.xp.toLocaleString()} XP</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="outline" className="text-green-400 border-green-400 text-xs">
                              {account.wins}W
                            </Badge>
                            <Badge variant="outline" className="text-red-400 border-red-400 text-xs">
                              {account.losses}L
                            </Badge>
                            <Badge variant="outline" className="text-blue-400 border-blue-400 text-xs">
                              {((account.wins / (account.wins + account.losses)) * 100).toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-gray-400">Achievements</p>
                        <div className="flex flex-wrap gap-1">
                          {account.achievements.slice(0, 2).map((achievement) => (
                            <Badge key={achievement} variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                              {achievement}
                            </Badge>
                          ))}
                          {account.achievements.length > 2 && (
                            <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                              +{account.achievements.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">Current Owner</span>
                          <span className="font-mono text-xs text-gray-300">{account.owner}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-blue-400">{account.price} MONAD</span>
                          <span className="text-xs text-gray-400">≈ ${(account.price * 2.5).toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl bg-gray-800 border-gray-700 text-white">
                            <DialogHeader>
                              <DialogTitle className="text-white">{account.username} - Detailed Stats</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2 text-white">Combat Stats</h4>
                                  <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">Level:</span>
                                      <span className="text-white">{account.level}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">Total XP:</span>
                                      <span className="text-white">{account.xp.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">Wins:</span>
                                      <span className="text-white">{account.wins}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">Losses:</span>
                                      <span className="text-white">{account.losses}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-400">Win Rate:</span>
                                      <span className="text-white">{((account.wins / (account.wins + account.losses)) * 100).toFixed(1)}%</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2 text-white">All Achievements</h4>
                                  <div className="space-y-1">
                                    {account.achievements.map((achievement) => (
                                      <Badge key={achievement} variant="secondary" className="text-xs mr-1 mb-1 bg-gray-700 text-gray-300">
                                        {achievement}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          onClick={() => handleBuyAccount(account.id)}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="sell" className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">List Your Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 rounded-lg bg-gray-700 border-l-4 border-yellow-500">
                  <h4 className="font-semibold mb-2 text-yellow-400">⚠️ Important Notice</h4>
                  <p className="text-sm text-gray-300">
                    Listing your account will mint it as a Soul Bound Token (SBT). Once sold, you will lose access to
                    this fighter identity permanently.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Select Account to List</h3>
                    <Card className="p-4 bg-gray-700 border-gray-600">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src="/placeholder.svg?height=40&width=40" />
                          <AvatarFallback className="bg-gray-600 text-white">SW</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-white">ShadowWarrior_99</p>
                          <p className="text-sm text-gray-400">Level 12 • 2,450 XP</p>
                          <p className="text-sm text-gray-400">45W / 8L (84.9% WR)</p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Set Price</h3>
                    <div className="space-y-2">
                      <Input 
                        type="number" 
                        placeholder="Enter price in MONAD" 
                        className="text-lg bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                        value={listingPrice}
                        onChange={(e) => setListingPrice(e.target.value)}
                        min="0"
                        step="0.1"
                      />
                      <p className="text-xs text-gray-400">
                        Suggested price range: 5-12 MONAD based on similar accounts
                      </p>
                      {listingPrice && (
                        <p className="text-xs text-blue-400">
                          ≈ ${(parseFloat(listingPrice) * 2.5).toFixed(2)} USD
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-black"
                  onClick={handleListAccount}
                >
                  <Coins className="w-4 h-4 mr-2" />
                  List Account for Sale
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-400" />
                    <span className="text-white">Market Volume</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-400">{marketAnalytics.volume} MONAD</div>
                  <p className="text-sm text-gray-400">Total value of all listings</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-green-400" />
                    <span className="text-white">Active Listings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-400">{marketAnalytics.listings}</div>
                  <p className="text-sm text-gray-400">Accounts available for purchase</p>
                </CardContent>
              </Card>
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <span className="text-white">Avg. Price</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-400">{marketAnalytics.avgPrice} MONAD</div>
                  <p className="text-sm text-gray-400">Mean price across all listings</p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Rarity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Common", "Rare", "Epic", "Legendary"].map(rarity => {
                    const count = allAccounts.filter(acc => acc.rarity === rarity).length
                    const percentage = ((count / allAccounts.length) * 100).toFixed(1)
                    return (
                      <div key={rarity} className="text-center">
                        <div className={`text-2xl font-bold ${getRarityColor(rarity).split(' ')[0]}`}>
                          {count}
                        </div>
                        <p className="text-sm text-gray-400">{rarity}</p>
                        <p className="text-xs text-gray-500">{percentage}%</p>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}