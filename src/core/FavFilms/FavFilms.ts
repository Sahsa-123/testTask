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

  /** Добавить фильм в избранное */
  add(id: string | number) {
    this.map.set(String(id), true);
    this.save();
  }

  /** Удалить фильм из избранного */
  remove(id: string | number) {
    this.map.delete(String(id));
    this.save();
  }

  /** Получить массив id избранных фильмов */
  get(): string[] {
    return Array.from(this.map.keys());
  }

  /** Проверить, есть ли фильм в избранном */
  has(id: string | number) {
    return this.map.has(String(id));
  }

  /** Сбросить избранное (например, если всё удалили) */
  clear() {
    this.map.clear();
    localStorage.removeItem(LS_KEY);
  }

  /** Сохранить Map в LS */
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

