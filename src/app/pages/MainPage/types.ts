import { z } from "zod";

// const ResponseSchema = z.object({
//     docs: z.
// })

export const CardItemServerSchema = z.object({
  id: z.number(),

  name: z.string().nullable(),
  alternativeName: z.string().nullable(),

  rating: z
    .object({
      kp: z.number().nullable(),
      imdb: z.number().nullable(),
    })
    .optional(),

  poster: z
    .object({
      url: z.string().nullable(),
    })
    .optional(),

  releaseYears: z
    .array(
      z.object({
        start: z.number(),
        end: z.number().nullable(),
      })
    )
    .optional(),
});

type CardItemServerT = z.infer<typeof CardItemServerSchema>

export type CardItemT = {
    id:number,
    name:string,
    img:string,
    year: number,
    rating: number
}

export function CardItemServerToClient(item:CardItemServerT):CardItemT|null{
    const name = item.name||item.alternativeName
    const rating = item?.rating?.imdb
    const img = item?.poster?.url || ""
    const years = item?.releaseYears
    const id = item.id
    if(name && typeof rating==="number" && typeof img ==="string" && years){
        console.log(rating)
        const year = years[0].start
        return{
            id,
            name,
            img,
            year,
            rating
        }
    }
    return null
}