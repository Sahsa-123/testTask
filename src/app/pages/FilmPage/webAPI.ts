// fetchMovie.ts
import { CardItemServerSchema } from "../../../core/webAPI/CardResponse";
import { serverToFilmPageInfo } from "./types";

export const fetchMovie = async ({ queryKey }: { queryKey: [string, string | undefined] }) => {
  const [, id] = queryKey;
  if (!id) throw new Error("ID фильма не передан!");

  const res = await fetch(`https://api.kinopoisk.dev/v1.4/movie/${id}`, {
    headers: { "X-API-KEY": import.meta.env.VITE_KN_API_TOKEN },
  });
  const json: unknown = await res.json();
  try {
    const serverObj = CardItemServerSchema.parse(json);
    return serverToFilmPageInfo(serverObj);
  } catch (e) {
    throw new Error(
      "Ошибка валидации ответа сервера: " +
        (e instanceof Error ? e.message : JSON.stringify(e))
    );
  }
};
