import { z } from "zod";

export const CardItemServerSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  poster: z
    .object({
      url: z.string(),
      previewUrl:z.string(),
    })
    .optional(),
  rating: z
    .object({
      imdb: z.number(),
    }),
  premiere: z.object({
    world:z.iso.datetime()
  }),
  description: z.string().nonempty(),
  genres:z.array(
    z.object({
      name:z.string().nonempty()
    })
  ),
});
export type CardItemServerT = z.infer<typeof CardItemServerSchema>

export const CardItemClientSchema = z.object({
  id: z.number(),
  name: z.string().nonempty(),
  img: z.string().optional(),
  previewImg: z.string().optional(),
  rating: z.number(),
  premiere: z.iso.datetime(),
  description: z.string().nonempty(),
  genres:z.array(z.string().nonempty()),
})
export type CardItemClientType = z.infer<typeof CardItemClientSchema >

export function CardItemServerToClient(item:CardItemServerT):CardItemClientType|null{
  const id = item.id
  const name = item.name
  const img = item?.poster?.url || ""
  const previewImg = item?.poster?.previewUrl || ""
  const rating = item.rating.imdb
  const premiere = item.premiere.world
  const description = item.description
  const genres = item.genres.map(i=>i.name)
  if(name && typeof rating==="number" && typeof img ==="string"){
      return{
          id,
          name,
          previewImg,
          img,
          rating,
          premiere,
          description,
          genres
      }
  }
  return null
}