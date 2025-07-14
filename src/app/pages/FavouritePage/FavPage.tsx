import { Container, Grid, CircularProgress, Typography } from "@mui/material";
import { useQueries } from "@tanstack/react-query";
import { CustomCard } from "../../../core/components/Card";
import type { CardItemClientType } from "../../../core/webAPI/CardResponse";
import { fetchMovieById } from "./webAPI";
import { getFavouriteIds } from "../../../core/FavFilms/FavFilms";

export const FavPage: React.FC = () => {
	const ids = getFavouriteIds();

	const queries = useQueries({
		queries: ids.map(id => ({
			queryKey: ["movie", id],
			queryFn: () => fetchMovieById(id),
			enabled: !!id,
			staleTime: 5 * 60 * 1000,
		})),
	});

	const isLoading = queries.some(q => q.isLoading);
	const films = queries.map(q => q.data).filter(Boolean) as CardItemClientType[];
	const allFailed = ids.length > 0 && films.length === 0 && queries.every(q => q.isError);

	if (!ids.length) {
		return (
			<Container sx={{ py: 6, textAlign: "center" }}>
				<Typography>У вас нет фильмов в избранном.</Typography>
			</Container>
		);
	}

	if (isLoading && films.length === 0) {
		return (
			<Container sx={{ py: 6, textAlign: "center" }}>
				<CircularProgress />
				<Typography mt={2}>Загрузка любимых фильмов...</Typography>
			</Container>
		);
	}

	if (allFailed) {
		return (
			<Container sx={{ py: 6, textAlign: "center" }}>
				<Typography color="error">
					Не удалось загрузить фильмы из избранного.
				</Typography>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Grid container spacing={3} mb={1}>
				{films.map((film) => (
					<Grid
						size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
						key={film.id}
						display="flex"
						justifyContent="center"
					>
						<CustomCard
							name={film.name}
							year={new Date(film.premiere).getFullYear()}
							rating={film.rating}
							to={`/film/${film.id}`}
							img={film.previewImg || film.img}
							state={film}
						/>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};
