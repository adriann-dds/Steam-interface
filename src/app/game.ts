export interface Game {
    category?: number;
    collection?: number;
    cover?: ICover;
    screenshot? :ICover;
    esrb?: IESRB;
    genres?: number[];
    id?: number;
    name?: string;
    summary?: string;
    url?: string;
    release_dates?: IReleaseDate;
    first_release_date?: number;
    rating?: string;
    total_rating?: string;
    platforms?: number;
    human?: string;
}

export interface IReleaseDate {
    human: string;
}

export interface ICover {
    url: string;
    height?: number;
    width?: number;
    cloudinary_id: string;
}

export interface IESRB {
    rating?: EESRB;
}

export interface IPEGI {
    rating?: number;
}

export enum EPEGI {
    "3+",
    "7+",
    "12+",
    "16+"
}

export enum EESRB {
    "RP",
    "EC",
    "E",
    "E10+",
    "T",
    "M",
    "AO"
}
