import { useLocation, useParams } from "react-router";
import {
  Typography, Container, Box, Grid, Chip, Rating, CircularProgress,
  IconButton,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchMovie } from "./webAPI";
import { FilmPageInfoSchema, type FilmPageInfo } from "./types";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { FavouriteFilms } from "../../../core/FavFilms/FavFilms";
import { useState } from "react";
import { LoadErrorMessage } from "../../../core/components/LoadError";

const fav = new FavouriteFilms();

export const FilmPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const [isFav, setIsFav] = useState(fav.has(id||""));

  const toggleFav = () => {
    if (isFav) {
      if (id)fav.remove(id);
    } else {
      if (id)fav.add(id);
    }
    if(id)setIsFav(fav.has(id)); 
  };

  let clientFilm: FilmPageInfo | null = null;
  if (state) {
    try {
      clientFilm = FilmPageInfoSchema.parse(state);
    } catch {
      clientFilm = null;
    }
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ["film", id],
    queryFn: fetchMovie,
    enabled: !clientFilm,
  });
  const film = clientFilm || data;

  if (isLoading) {
    return (
      <Container sx={{ py: 6, textAlign: "center" }}>
        <CircularProgress />
        <Typography mt={2}>Загрузка фильма...</Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 6 }}>
        <LoadErrorMessage mainText={"Не удалось найти фильм"} recomendation={"Попробуйте выбрать другой фильм или вернуться на главную страницу."}/>
      </Container>
    );
  }

  if (!film) {
    return (
      <Container sx={{ py: 6 }}>
        <Typography>Фильм не найден</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Grid container spacing={3}>
        <Grid size={{xs:12, md:4}} sx={{display:"flex", justifyContent:"center"}}>
          {film.img ? (
            <Box
              component="img"
              src={film.img}
              alt={film.name}
              sx={{
                width: "100%",
                maxWidth: "300px",
                height: "425px",
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: theme => theme.palette.grey[300],
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                maxWidth: "300px",
                height: "425px",
                borderRadius: 2,
                boxShadow: 2,
                backgroundColor: theme => theme.palette.grey[300],
                display: "block",
              }}
            />
          )}

        </Grid>
        <Grid size={{xs:12, md:8}}>
          <Box display="flex" alignItems="baseline" gap={2}>
            <Typography variant="h4">
              {film.name}
            </Typography>
            <IconButton onClick={toggleFav} color={isFav ? "error" : "default"}>
              {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Typography variant="body1" mr={1}>Рейтинг:</Typography>
            <Rating value={film.rating} max={10} precision={0.1} readOnly />
            <Typography variant="body2" ml={1}>{film.rating.toFixed(1)}</Typography>
          </Box>
          {film.premiere && (
            <Typography variant="body2" color="text.secondary">
              Премьера: {new Date(film.premiere).toLocaleDateString("ru-RU")}
            </Typography>
          )}
          {film.description && (
            <Typography variant="body1">{film.description}</Typography>
          )}
          {film.genres.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                Жанры:
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {film.genres.map((genre: string) => (
                  <Chip key={genre} label={genre} />
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
