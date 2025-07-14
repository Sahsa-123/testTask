// Vite-проект:
const LS_KEY = import.meta.env.VITE_FAV_FILMS_KEY || "favouriteFilms";

export class FavouriteFilms {
  private map: Map<number, true>;

  constructor() {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      // Читаем массив id из LS
      try {
        const arr = JSON.parse(raw) as number[];
        this.map = new Map(arr.map(id => [id, true]));
      } catch {
        this.map = new Map();
      }
    } else {
      this.map = new Map();
    }
  }

  /** Добавить фильм в избранное */
  add(id: number) {
    this.map.set(id, true);
    this.save();
  }

  /** Удалить фильм из избранного */
  remove(id: number) {
    this.map.delete(id);
    this.save();
  }

  /** Получить массив id избранных фильмов */
  get(): number[] {
    return Array.from(this.map.keys());
  }

  /** Проверить, есть ли фильм в избранном */
  has(id: number) {
    return this.map.has(id);
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
      // Храним просто массив id (очень компактно)
      localStorage.setItem(LS_KEY, JSON.stringify(Array.from(this.map.keys())));
    }
  }
}

