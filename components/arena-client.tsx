"use client"

import { useEffect, useRef } from 'react'

interface ArenaClientProps {
  className?: string
}

export function ArenaClient({ className }: ArenaClientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const socketRef = useRef<any>(null)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    // Dynamically import socket.io-client
    const initArena = async () => {
      try {
        // Import socket.io-client dynamically
        const { io } = await import('socket.io-client')
        
        // Connect to arena server (adjust port as needed)
        const socket = io('http://localhost:5000')
        socketRef.current = socket

        // Key mapping
        const keyMap: { [key: number]: string } = {
          87: 'up',
          83: 'down', 
          65: 'left',
          68: 'right',
          75: 'attack',
        }

        let inputs: { [key: string]: boolean } = {}

        const setButton = (button: string, value: boolean) => {
          if (button !== undefined && inputs[button] !== value) {
            inputs[button] = value
            socket.emit("setButton", { button, value })
          }
        }

        // Event listeners
        const handleKeyDown = (e: KeyboardEvent) => {
          const button = keyMap[e.keyCode]
          setButton(button, true)
        }

        const handleKeyUp = (e: KeyboardEvent) => {
          const button = keyMap[e.keyCode]
          setButton(button, false)
        }

        document.addEventListener("keydown", handleKeyDown)
        document.addEventListener("keyup", handleKeyUp)

        // Canvas setup
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let currentLatency = 0

        // Handle game state updates
        socket.on("sendState", (state: any) => {
          state.latency = currentLatency
          drawGame(ctx, state)
        })

        socket.on('pong', (latency: number) => {
          currentLatency = latency
        })

        // Cleanup function
        return () => {
          document.removeEventListener("keydown", handleKeyDown)
          document.removeEventListener("keyup", handleKeyUp)
          socket.disconnect()
        }
      } catch (error) {
        console.error('Failed to initialize arena:', error)
      }
    }

    initArena()
  }, [])

  // Simple drawing function (you can enhance this)
  const drawGame = (ctx: CanvasRenderingContext2D, state: any) => {
    // Clear canvas
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // Draw game state
    if (state.players) {
      Object.values(state.players).forEach((player: any) => {
        if (player && player.x !== undefined && player.y !== undefined) {
          ctx.fillStyle = '#7c3aed'
          ctx.fillRect(player.x, player.y, 50, 100)
        }
      })
    }

    // Draw latency
    ctx.fillStyle = '#ffffff'
    ctx.font = '16px Arial'
    ctx.fillText(`Latency: ${state.latency || 0}ms`, 10, 30)
  }

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Shadow Fighters Arena</h2>
        <p className="text-gray-300">Use WASD to move, K to attack</p>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="border-4 border-purple-600 rounded-lg shadow-lg shadow-purple-600/30 bg-gray-900"
        />
        
        {/* Connection status */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            <span className="text-sm text-gray-300">Connected</span>
          </div>
        </div>
      </div>
    </div>
  )
} 