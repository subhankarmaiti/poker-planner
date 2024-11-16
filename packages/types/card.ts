export type CardValue =
  | 0
  | 1
  | 2
  | 3
  | 5
  | 8
  | 13
  | 20
  | 40
  | 100
  | '∞'; // Infinity

export interface Card {
  value: CardValue; // The numerical value of the card
  label: string;    // Display label for the card (e.g., "0", "1", "2", ..., "∞")
}