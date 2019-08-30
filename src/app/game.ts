export interface Game {
    category?: number;
    collection?: number;
    genres?: number[];
    id?: number;
    name?: string;
    summary?: string;
    url?: string;
    first_release_date?: number;
    rating?: string;
    total_rating?: string;
    platforms?: number;
    human?: string;
    y?: number;
}

export class Item {
  games: Game;
}
