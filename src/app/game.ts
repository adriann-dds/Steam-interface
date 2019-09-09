export interface Game {
    category?: number;
    collection?: number;
    genres?: number[];
    id?: number;
    name?: string;
    summary?: string;
    url?: string;
    release_dates?: number[];
    rating?: string;
    total_rating?: string;
    platforms?: number[];
    human?: string;
    y?: number;
    video_id?: string;
    completely?: number;
    videos?: number;
    screenshots?: number[];
    storyline?: string;
}

export class Item {
  games: Game;
}
