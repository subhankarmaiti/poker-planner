export interface Vote {
    playerId: string;  // The ID of the player who submitted the vote
    value: number;     // The numerical value of the vote (e.g., 0, 1, 2, 3, 5, ...)
  }