// backend/src/rooms/PokerRoom.ts

import { Socket } from 'socket.io';
import { Player, Vote, Board, CardValue } from '@poker-planner/types'; // Import all types

export default class PokerRoom {
  private players: Player[] = [];
  private votes: { [playerId: string]: number } = {}; // Use Vote type
  private currentTask?: string;
  private board: Board; // Use Board type

  constructor(boardId: string) {
    this.board = {
        id: boardId,
        creator: '...', // Get the creator ID (e.g., from socket.handshake.auth or a token)
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        players: this.players,
        votes: this.votes,
        currentTask: this.currentTask,
        votingStatus: 'pending',
      };
    console.log(`Created room for board ${boardId}`);
  }

  join(socket: Socket, playerName: string) {
    // ... (rest of your join logic)
  }

  // Example using CardValue type
  submitVote(playerId: string, voteValue: CardValue) { 
    // ... (logic to handle vote submission)
  }

  // ... (other methods)
}