import { useEffect, useState } from "react";
import { CardItemServerSchema, CardItemServerToClient, type CardItemT } from "./types";
import { CustomCard } from "./UI/Card";
import { Container, Grid } from "@mui/material";
import { list } from "./dump"

export const MainPage: React.FC = () => {
  /*const [list, setList] = useState<CardItemT[]|null>(null)
  useEffect(()=>  {
    const url = new URL("movie", "https://api.kinopoisk.dev/v1.4/")
    url.searchParams.append("page","1")
    url.searchParams.append("limit","100")
    const fetchCinemas = async ()=>{
      const resp = await fetch(url.href,{
        headers:{
          "X-API-KEY": "V3YK16J-VXD4A3V-KKWWE52-NW987MQ"
        }
      }
      )
      const data = await resp.json();
      return data.docs.map((i) =>  CardItemServerToClient(CardItemServerSchema.parse(i)))
    }
    
    // fetchCinemas().then((list)=>setList(list))

  },[setList])*/
 
  return (
    <Container>
    {/*{
      list?.map((i)=>{
        if(i){
          return(
            <CustomCard 
            key={i.id}
            id={i.id}
            name={i.name} 
            rating={i.rating} 
            img={i.img}
            release={i.year}
            />
          )
        }
      }
      )
    }*/}
    <Grid container spacing={3}>
      { 
      list.docs.map((i)=>{
        const converted = CardItemServerToClient(CardItemServerSchema.parse(i))
        if(converted){
          return(
          <Grid size={3}>
            <CustomCard 
            key={converted.id}
            id={converted.id}
            name={converted.name} 
            rating={converted.rating} 
            img={converted.img}
            release={converted.year}
            />
          </Grid>
          )
        }
      }
      )
    }
    </Grid>
    </Container>
  );
};