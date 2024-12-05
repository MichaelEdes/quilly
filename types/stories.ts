export interface Page {
  txt: string;
  png: string;
  mp3: string;
}

export interface Story {
  story: string;
  pages: Page[];
  audio: string | null;
  genre: string;
  synopsis: string;
}

export enum Genres {
  Fiction = "Fiction",
  NonFiction = "Non-Fiction",
  Adventure = "Adventure",
  Mystery = "Mystery",
  ScienceFiction = "Science Fiction",
  Horror = "Horror",
  Thriller = "Thriller",
  Romance = "Romance",
  Comedy = "Comedy",
  Drama = "Drama",
  Crime = "Crime",
  SciFi = "Sci-Fi",
  ChildrensBooks = "Children's Books",
  Biographies = "Biographies",
  Autobiographies = "Autobiographies"
}
