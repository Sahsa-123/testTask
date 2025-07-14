import { CardItemServerSchema, CardItemServerToClient, type CardItemClientType } from "../../../core/webAPI/CardResponse";

export async function fetchMovieById(id: string): Promise<CardItemClientType | null> {
  const url = `https://api.kinopoisk.dev/v1.4/movie/${id}`;
  const response = await fetch(url, {
    headers: { "X-API-KEY": import.meta.env.VITE_KN_API_TOKEN },
  });
  if (!response.ok) return null;
  const json = await response.json();
  try {
    return CardItemServerToClient(CardItemServerSchema.parse(json));
  } catch {
    return null;
  }
}
