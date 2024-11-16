import express from 'express';
import { Server, Socket } from 'socket.io';
import http from 'http';

interface Player {
  id: string;
  name: string;
}

interface Vote {
  playerId: string;
  value: number;
}

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with your frontend URL in production
  }
});

io.on('connection', (socket: Socket) => {
  console.log('A user connected');

  socket.on('join-board', (boardId: string, playerName: string) => {
    const player: Player = { id: socket.id, name: playerName };
    socket.join(boardId);
    console.log(`${playerName} joined board ${boardId}`);
    io.to(boardId).emit('player-joined', player);
  });

  socket.on('submit-vote', (boardId: string, vote: Vote) => {
    console.log(`${vote.playerId} voted ${vote.value} on board ${boardId}`);
    // Store the vote (e.g., in DynamoDB - you'll do this in your Lambda function)
    // ... (Logic to handle vote submission and broadcast to others in the room)
    io.to(boardId).emit('vote-submitted', vote); // Example broadcast
  });

  // ... other Socket.IO event handlers (start-voting, end-voting, etc.)

  socket.on('disconnect', () => {
    console.log('User disconnected');
    // You might want to handle user leaving and broadcast to the room
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`WebSocket server listening on port ${PORT}`);
});