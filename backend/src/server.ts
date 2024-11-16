import express from 'express';
import { Server, Socket } from 'socket.io';
import { Player, Vote } from '@poker-planner/types';
import http from 'http';
import cors from 'cors';
import PokerRoom from './rooms/PockerRoom'

const app = express();
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', 
    methods: ['GET', 'POST'],
  },
});

// Create a map to store the rooms
const rooms: Map<string, PokerRoom> = new Map(); 

io.on('connection', (socket: Socket) => {
  console.log('A user connected:', socket.id);

  socket.on('join-board', (boardId: string, playerName: string) => {
    if (!boardId || !playerName) {
      socket.emit('error', 'Invalid board ID or player name');
      return;
    }

    let room = rooms.get(boardId);
    if (!room) {
      room = new PokerRoom(boardId); // Create a new PokerRoom instance
      rooms.set(boardId, room);
    }
    room.join(socket, playerName); 
  });

  // ... other event handlers (you might need to adapt these to use the PokerRoom methods)

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    // Remove user from all rooms they were part of (implement in PokerRoom)
    rooms.forEach((room) => room.leave(socket.id)); 
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});