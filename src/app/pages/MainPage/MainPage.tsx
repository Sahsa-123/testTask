import { useEffect } from "react";
import { CircularProgress, Container, Grid, LinearProgress, Typography } from "@mui/material";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSearchParams } from "react-router";
import { CustomCard } from "./components";
import { fetchMovies } from "./webAPI";
import type { CardItemClientType } from "../../../core/webAPI/CardResponse";

export const MainPage: React.FC = () => {
  const { ref, inView } = useInView();
  const [searchParams] = useSearchParams();

  const filters = {
    search: searchParams.get("search") || "",
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
    return <Typography>Ошибка: {(error as Error).message}</Typography>;
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

// /* lybraries */
// import { useEffect } from "react";
// import { CircularProgress, Container, Grid, Typography } from "@mui/material";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { useInView } from "react-intersection-observer";
// import { useSearchParams } from "react-router";
// /* lybraries */

// /* child dep */
// import { 
//   CustomCard,
//  } from "./components";
// import { fetchMovies } from "./webAPI";
// import type { CardItemClientType } from "../../../core/webAPI/CardResponse";
// /* child dep */

// export const MainPage: React.FC = () => {
//   const { ref, inView } = useInView();
//   const [searchParams] = useSearchParams();
//   const filters = {
//     search: searchParams.get("search") || "",
//     genres: searchParams.getAll("genresInclude"),
//     rating: searchParams.get("rating") || "",
//     years: searchParams.get("years") || "",
//   };


//   const {
//     data,
//     status,
//     error,
//     fetchNextPage,
//     isFetchingNextPage,
//     hasNextPage,
//   } = useInfiniteQuery({
//     queryKey: ["movies", filters],
//     queryFn: fetchMovies,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, allPages) =>
//       lastPage.length ? allPages.length + 1 : undefined,
//     staleTime: 5 * 60 * 1000,
//     retry: 1,
//   });

//   useEffect(() => {
//     if (inView && hasNextPage) {
//       fetchNextPage();
//     }
//   }, [inView, hasNextPage, fetchNextPage]);

//   if (status === "pending") {
//     return (
//           <Container sx={{ py: 6, textAlign: "center" }}>
//             <CircularProgress />
//             <Typography mt={2}>Загрузка фильмов...</Typography>
//           </Container>
//         );
//   }
//   if (status === "error") {
//     return <Typography>Ошибка: {(error as Error).message}</Typography>;
//   }

//   return (
//     <Container sx={{ py: 4 }}>
//       <Grid container spacing={3}>
//         {data?.pages.map((page) =>
//           page.map((film: CardItemClientType, index: number) => {
//             const isLast =
//               data.pages[data.pages.length - 1] === page &&
//               index === page.length - 1;
//             film.img=film.previewImg
//             return (
//               <Grid
//                 size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
//                 key={film.id}
//                 ref={isLast ? ref : undefined}
//                 display="flex"
//                 justifyContent="center"
//               >
//                  <CustomCard
//                   name={film.name}
//                   year={new Date(Date.parse(film.premiere)).getFullYear()}
//                   rating={film.rating}
//                   to={`/film/${film.id}`}
//                   img={film.img}
//                   state={film}
//                 />
//               </Grid>
//             );
//           })
//         )}
//       </Grid>

//       {isFetchingNextPage && (
//         <Typography sx={{ mt: 3, textAlign: "center" }}>Загрузка...</Typography>
//       )}
//     </Container>
//   );
// };