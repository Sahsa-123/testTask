import { CardItemServerSchema, CardItemServerToClient, type CardItemClientType } from "../../../core/webAPI/CardResponse";

type Filters = {
  genres: string[];
  rating: string;
  years: string;
};

export const fetchMovies = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: (string | Filters)[];
  pageParam?: number;
}): Promise<CardItemClientType[]> => {
  // Безопасно приводим второй элемент queryKey к фильтрам
  const filters = (queryKey[1] || {}) as Filters;

  const url = new URL("https://api.kinopoisk.dev/v1.4/movie");
  url.searchParams.set("page", pageParam.toString());
  url.searchParams.set("limit", "50");
  ["id", "name", "poster", "rating", "premiere", "description", "genres"]
    .forEach(field => url.searchParams.append("selectFields", field));
  ["id", "name", "rating.imdb", "premiere.world", "description", "genres.name"]
    .forEach(field => url.searchParams.append("notNullFields", field));
  url.searchParams.append("rating.imdb", "1-10");

  // Жанры
  filters.genres?.forEach(genre => {
    url.searchParams.append("genres.name", `+${genre}`);
  });
  // Рейтинг
  if (filters.rating && /^\d+(\.\d+)?-\d+(\.\d+)?$/.test(filters.rating)) {
    url.searchParams.set("rating.imdb", filters.rating);
  }
  // Годы
  if (filters.years && /^\d{4}-\d{4}$/.test(filters.years)) {
    url.searchParams.set("year", filters.years);
  }

  const response = await fetch(url.toString(), {
    headers: {
      "X-API-KEY": import.meta.env.VITE_KN_API_TOKEN,
    },
  });

  const data = await response.json();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const docs = data.docs.map((doc: any) => {
    try {
      return CardItemServerToClient(CardItemServerSchema.parse(doc));
    } catch (e) {
      console.error("Ошибка парсинга карточки фильма:", e, doc);
      return null;
    }
  }).filter(Boolean);

  return docs;
};
