"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Upload, Sparkles, Eye, ShoppingCart, Gamepad2, ImageIcon } from "lucide-react"

interface NFTSkin {
  id: string
  name: string
  description: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  price?: number
  owned: boolean
  equipped: boolean
  image: string
  previewImages?: string[]
}

export function NFTGallery() {
  const [skins] = useState<NFTSkin[]>([
    {
      id: "1",
      name: "Shadow Assassin",
      description: "A legendary skin forged in the depths of the shadow realm",
      rarity: "Legendary",
      owned: true,
      equipped: true,
      image: "/placeholder.svg?height=300&width=300&text=Shadow+Assassin",
      previewImages: [
        "/placeholder.svg?height=400&width=400&text=Front+View",
        "/placeholder.svg?height=400&width=400&text=Side+View",
        "/placeholder.svg?height=400&width=400&text=Back+View",
      ],
    },
    {
      id: "2",
      name: "Neon Warrior",
      description: "Cyberpunk-inspired fighter with glowing accents",
      rarity: "Epic",
      owned: true,
      equipped: false,
      image: "/placeholder.svg?height=300&width=300&text=Neon+Warrior",
      previewImages: [
        "/placeholder.svg?height=400&width=400&text=Front+View",
        "/placeholder.svg?height=400&width=400&text=Side+View",
      ],
    },
    {
      id: "3",
      name: "Crystal Guardian",
      description: "Mystical protector with crystalline armor",
      rarity: "Rare",
      price: 5.2,
      owned: false,
      equipped: false,
      image: "/placeholder.svg?height=300&width=300&text=Crystal+Guardian",
      previewImages: ["/placeholder.svg?height=400&width=400&text=Front+View"],
    },
  ])

  const [aiPrompt, setAiPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "text-gray-500 border-gray-500 bg-gray-500/10"
      case "Rare":
        return "text-blue-500 border-blue-500 bg-blue-500/10"
      case "Epic":
        return "text-purple-500 border-purple-500 bg-purple-500/10"
      case "Legendary":
        return "text-yellow-500 border-yellow-500 bg-yellow-500/10"
      default:
        return "text-gray-500 border-gray-500 bg-gray-500/10"
    }
  }

  const generateAISkin = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen p-6 pt-24 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            NFT Asset Gallery
          </h1>
          <p className="text-muted-foreground text-lg">
            Manage your digital assets, create custom skins, and explore the marketplace
          </p>
        </div>

        <Tabs defaultValue="collection" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger
              value="collection"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              My Collection
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Create Assets
            </TabsTrigger>
            <TabsTrigger
              value="marketplace"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              Marketplace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="collection" className="space-y-6">
            {/* Currently Equipped */}
            {(() => {
              const equippedSkin = skins.find((s) => s.equipped)
              return equippedSkin ? (
                <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-primary" />
                      Currently Active Asset
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
                          <img
                            src={equippedSkin.image || "/placeholder.svg"}
                            alt={equippedSkin.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <Badge variant="outline" className={getRarityColor(equippedSkin.rarity)}>
                          {equippedSkin.rarity} Asset
                        </Badge>
                      </div>
                      <div className="md:col-span-2 space-y-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{equippedSkin.name}</h3>
                          <p className="text-muted-foreground text-lg">{equippedSkin.description}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Asset Type:</span>
                            <p className="font-semibold">Character Skin NFT</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Rarity Level:</span>
                            <p className="font-semibold">{equippedSkin.rarity}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Compatibility:</span>
                            <p className="font-semibold">Cross-Platform</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Status:</span>
                            <p className="font-semibold text-green-500">Active</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : null
            })()}

            {/* Asset Collection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skins
                .filter((skin) => skin.owned)
                .map((skin) => (
                  <Card
                    key={skin.id}
                    className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{skin.name}</CardTitle>
                        <Badge variant="outline" className={getRarityColor(skin.rarity)}>
                          {skin.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
                        <img
                          src={skin.image || "/placeholder.svg"}
                          alt={skin.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{skin.description}</p>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>{skin.name} - Asset Details</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
                                  <img
                                    src={skin.image || "/placeholder.svg"}
                                    alt={skin.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                {skin.previewImages && skin.previewImages.length > 0 && (
                                  <div className="grid grid-cols-3 gap-2">
                                    {skin.previewImages.map((img, index) => (
                                      <div
                                        key={index}
                                        className="aspect-square rounded-md overflow-hidden bg-muted border"
                                      >
                                        <img
                                          src={img || "/placeholder.svg"}
                                          alt={`${skin.name} view ${index + 1}`}
                                          className="w-full h-full object-cover"
                                        />
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-6">
                                <div>
                                  <h3 className="text-xl font-semibold mb-2">{skin.name}</h3>
                                  <p className="text-muted-foreground">{skin.description}</p>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Rarity:</span>
                                    <Badge variant="outline" className={getRarityColor(skin.rarity)}>
                                      {skin.rarity}
                                    </Badge>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Type:</span>
                                    <span>Character Skin NFT</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Compatibility:</span>
                                    <span>Cross-Platform</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-muted-foreground">Status:</span>
                                    <span className={skin.equipped ? "text-green-500" : "text-muted-foreground"}>
                                      {skin.equipped ? "Active" : "Available"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button
                          size="sm"
                          className={`flex-1 ${
                            skin.equipped ? "bg-green-500 hover:bg-green-600" : "bg-primary hover:bg-primary/90"
                          }`}
                          disabled={skin.equipped}
                        >
                          {skin.equipped ? "Active" : "Activate"}
                        </Button>
                      </div>

                      <div className="pt-2 border-t">
                        <Badge variant="secondary" className="text-xs w-full justify-center">
                          <Gamepad2 className="w-3 h-3 mr-1" />
                          Cross-Platform Compatible
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* AI Generator */}
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Asset Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Describe your ideal fighter skin</label>
                    <Textarea
                      placeholder="e.g., A futuristic samurai with glowing blue armor and energy katana..."
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </div>

                  {isGenerating ? (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <div>
                        <p className="text-primary font-medium">Generating your unique asset...</p>
                        <p className="text-sm text-muted-foreground">This may take 30-60 seconds</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Button
                        onClick={generateAISkin}
                        disabled={!aiPrompt}
                        className="w-full bg-primary hover:bg-primary/90"
                        size="lg"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate AI Asset
                      </Button>

                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <h4 className="font-medium mb-2 text-primary">AI Generation Process:</h4>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          <li>• AI creates unique artwork from your description</li>
                          <li>• High-resolution images stored on IPFS</li>
                          <li>• Professional NFT metadata generation</li>
                          <li>• Option to mint as tradeable asset</li>
                        </ul>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Custom Upload */}
              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-blue-500" />
                    Upload Custom Asset
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Upload High-Quality Image</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-blue-500/50 transition-colors cursor-pointer bg-muted/20">
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag & drop your image file here, or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Recommended: 1024x1024px, PNG/JPG format, max 10MB
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Asset Name</label>
                      <Input placeholder="Enter asset name..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Description</label>
                      <Textarea placeholder="Describe your custom asset..." rows={3} className="resize-none" />
                    </div>
                  </div>

                  <Button className="w-full bg-blue-500 hover:bg-blue-600" disabled size="lg">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload & Process Asset
                  </Button>

                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <h4 className="font-medium mb-2 text-blue-500">Professional Upload Process:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Automated quality validation and optimization</li>
                      <li>• Secure IPFS storage with redundancy</li>
                      <li>• Professional metadata generation</li>
                      <li>• Cross-platform compatibility verification</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {skins
                .filter((skin) => !skin.owned && skin.price)
                .map((skin) => (
                  <Card
                    key={skin.id}
                    className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/50"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{skin.name}</CardTitle>
                        <Badge variant="outline" className={getRarityColor(skin.rarity)}>
                          {skin.rarity}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted border">
                        <img
                          src={skin.image || "/placeholder.svg"}
                          alt={skin.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{skin.description}</p>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">{skin.price} MONAD</span>
                          <span className="text-xs text-muted-foreground">
                            ≈ ${((skin.price || 0) * 2.5).toFixed(2)}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90">
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Purchase
                          </Button>
                        </div>

                        <div className="pt-2 border-t">
                          <Badge variant="secondary" className="text-xs w-full justify-center">
                            <Gamepad2 className="w-3 h-3 mr-1" />
                            Verified Asset
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
