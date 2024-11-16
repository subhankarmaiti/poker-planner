import { Player } from './player';
export interface Board {
    id: string;         // Unique identifier for the board
    name?: string;       // Name of the board (optional)
    creator: string;    // User ID or identifier of the board creator
    createdAt: Date;     // Timestamp when the board was created
    expiresAt: Date;     // Timestamp when the board will expire
    players: Player[];   // List of players on the board
    votes: {            // Object to store the votes
      [playerId: string]: number; // Key: player ID, Value: vote value
    };
    currentTask?: string; // The task being estimated (optional)
    votingStatus: 'pending' | 'started' | 'ended'; // Current status of voting
  }