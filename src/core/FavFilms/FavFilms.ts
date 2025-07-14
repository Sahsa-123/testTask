const LS_KEY = import.meta.env.VITE_FAV_FILMS_KEY || "favouriteFilms";

export class FavouriteFilms {
  private map: Map<string, true>;

  constructor() {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        const arr = JSON.parse(raw) as string[];
        this.map = new Map(arr.map(id => [id, true]));
      } catch {
        this.map = new Map();
      }
    } else {
      this.map = new Map();
    }
  }

  add(id: string | number) {
    this.map.set(String(id), true);
    this.save();
  }

  remove(id: string | number) {
    this.map.delete(String(id));
    this.save();
  }

  get(): string[] {
    return Array.from(this.map.keys());
  }

  has(id: string | number) {
    return this.map.has(String(id));
  }

  clear() {
    this.map.clear();
    localStorage.removeItem(LS_KEY);
  }

  private save() {
    if (this.map.size === 0) {
      localStorage.removeItem(LS_KEY);
    } else {
      localStorage.setItem(LS_KEY, JSON.stringify(Array.from(this.map.keys())));
    }
  }
}

export function getFavouriteIds(): string[] {
  const raw = localStorage.getItem(import.meta.env.VITE_FAV_FILMS_KEY || "favouriteFilms");
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

