import { useEffect } from "react";
import { CircularProgress, Container, Grid, LinearProgress, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";
import { CustomCard } from "../../../core/components/Card";
import { fetchMovies } from "./webAPI";
import type { CardItemClientType } from "../../../core/webAPI/CardResponse";
import { LoadErrorMessage } from "../../../core/components/LoadError";

export const MainPage: React.FC = () => {
  const { ref, inView } = useInView();
	const [searchParams] = useSearchParams();

	const filters = {
		genres: searchParams.getAll("genresInclude"),
		rating: searchParams.get("rating") || "",
		years: searchParams.get("years") || "",
	};

	const {
		data,
		isPending,
		error,
		fetchNextPage,
		isFetchingNextPage,
		hasNextPage,
	} = useInfiniteQuery({
		queryKey: ["movies", filters],
		queryFn: fetchMovies,
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) =>
			lastPage.length ? allPages.length + 1 : undefined,
		staleTime: 5 * 60 * 1000,
		retry: 1,
	});

	useEffect(() => {
		if (inView && hasNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, fetchNextPage]);

	if (isPending) {
		return (
			<Container sx={{ py: 6, textAlign: "center" }}>
				<CircularProgress />
				<Typography mt={2}>Загрузка фильмов...</Typography>
			</Container>
		);
	}

	if (error) {
		return(
			<Container sx={{ py: 6 }}>
				<LoadErrorMessage mainText={"Не удалось загрузить фильмы"} recomendation={"Перезагрузите страницу и(или) попробуйте позже"}/>
			</Container>
		)
	}

	return (
		<Container sx={{ py: 4 }}>
			<Grid container spacing={3} mb={1}>
				{data?.pages.map((page) =>
					page.map((film: CardItemClientType, index: number) => {
						const isLast =
							data.pages[data.pages.length - 1] === page &&
							index === page.length - 1;

						const img = film.previewImg || film.img;

						return (
							<Grid
								size={{xs:12, sm:6, md:4, lg:3}}
								key={film.id}
								ref={isLast ? ref : undefined}
								display="flex"
								justifyContent="center"
							>
								<CustomCard
									name={film.name}
									year={new Date(film.premiere).getFullYear()}
									rating={film.rating}
									to={`/film/${film.id}`}
									img={img}
									state={film}
								/>
							</Grid>
						);
					})
				)}
			</Grid>

			{isFetchingNextPage && (
				<LinearProgress/>
			)}
		</Container>
	);
};
