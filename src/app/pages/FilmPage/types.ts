import { z } from "zod";
import type { CardItemServerT } from "../../../core/webAPI/CardResponse";

// Минимальный тип для FilmPage (локальная схема)
export const FilmPageInfoSchema = z.object({
  id: z.number(),
  name: z.string(),
  img: z.string().optional(),
  rating: z.number(),
  premiere: z.string(),
  description: z.string(),
  genres: z.array(z.string()),
});
export type FilmPageInfo = z.infer<typeof FilmPageInfoSchema>;
// Конвертер из server-объекта
export function serverToFilmPageInfo(server: CardItemServerT): FilmPageInfo {
  return FilmPageInfoSchema.parse({
    id: server.id,
    name: server.name,
    img: server.poster?.url || "",
    rating: server.rating.imdb,
    premiere: server.premiere.world,
    description: server.description,
    genres: server.genres.map(g => g.name),
  });
}
