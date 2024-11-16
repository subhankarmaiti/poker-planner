export interface Player {
    id: string;       // Unique identifier for the player (could be a socket.id or user ID)
    name: string;     // Display name of the player
    vote?: number;    // The player's vote (optional, as they might not have voted yet)
  }