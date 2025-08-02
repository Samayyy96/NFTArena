# Arena Integration Setup

## Overview
The arena is now integrated with your Next.js frontend. The arena server runs separately and the frontend connects to it via WebSocket.

## Setup Instructions

### 1. Install Dependencies
```bash
# In the NFTArena directory
npm install socket.io-client
```

### 2. Start the Arena Server
You have two options:

**Option A: Use the batch file (Windows)**
```bash
# Double-click start-arena.bat or run:
./start-arena.bat
```

**Option B: Manual start**
```bash
cd arena
npm run server
```

The arena server will start on port 5000.

### 3. Start the Frontend
```bash
# In the NFTArena directory
npm run dev
```

The frontend will start on port 3000.

### 4. Connect to Arena
1. Navigate to your frontend (http://localhost:3000)
2. Go to the "Arena" section
3. Configure your battle settings
4. Click "Enter Competition" or "Stake & Compete"
5. The arena client will load and connect to the server

## How It Works

### Architecture
- **Frontend**: Next.js app (port 3000)
- **Arena Server**: Express + Socket.IO (port 5000)
- **Connection**: WebSocket between frontend and arena server

### Components
- `components/arena-client.tsx`: React component that connects to arena server
- `components/gaming-arena.tsx`: Main arena UI with battle configuration
- `arena/server.js`: Arena game server
- `arena/client/client.js`: Original arena client (now integrated into React)

### Features
- ✅ Real-time multiplayer combat
- ✅ WebSocket connection to arena server
- ✅ Dark mode compatible
- ✅ Responsive design
- ✅ Battle configuration (free/staked)
- ✅ Exit battle functionality

## Troubleshooting

### Arena Server Won't Start
1. Make sure you're in the arena directory
2. Run `npm install` in the arena folder
3. Check if port 5000 is available

### Connection Issues
1. Ensure arena server is running on port 5000
2. Check browser console for WebSocket errors
3. Verify firewall settings

### Game Not Loading
1. Check browser console for errors
2. Ensure socket.io-client is installed
3. Verify arena server is responding

## Development

### Adding New Features
- Modify `arena-client.tsx` for frontend changes
- Modify `arena/server/classes/Game.js` for game logic
- Modify `arena/client/classes/DrawHandler.js` for rendering

### Customization
- Update colors in `arena-client.tsx` to match your theme
- Modify game mechanics in the arena server classes
- Add new UI components to `gaming-arena.tsx`

## Security Notes
- Arena server accepts connections from any origin (for development)
- In production, add proper CORS configuration
- Consider adding authentication for staked battles 