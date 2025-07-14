// /* lybraries */
// import {
//   Card, CardActionArea, CardContent, 
//   CardMedia, Rating, Typography, Box, Skeleton,
// } from "@mui/material";
// import { Link } from "react-router";
// import { useInView } from "react-intersection-observer";
// /* lybraries */

// /* local dep */
// import type { CustomCardI } from "./api";
// /* local dep */

// export const CustomCard: React.FC<CustomCardI> = ({ film }) => {
//   const { ref, inView } = useInView({
//     triggerOnce: true,
//     rootMargin: "300px",
//   });

//   return (
//     <Card
//       ref={ref}
//       sx={{ height: "100%", width: "270px", display: "flex", flexDirection: "column" }}
//     >
//       <CardActionArea
//         component={Link}
//         to={`/film/${film.id}`}
//         state={film}
//       >
//         {inView&&film.img!=="" ? (
//           <CardMedia
//             component="img"
//             height="400"
//             image={film.img}
//             alt={film.name}
//           />
//         ) : (
//           <Skeleton variant="rectangular" height={400} />
//         )}
//         <CardContent sx={{ flexGrow: 1 }}>
//           <Box sx={{mb:1}}>
//             <Typography variant="h6" component="h3" noWrap title={film.name}>
//               {film.name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               {new Date(Date.parse(film.premiere)).getFullYear()}
//             </Typography>
//           </Box>
//           <Box >
//             <Typography>
//               Рейтинг:
//             </Typography>
//             <Rating
//               value={film.rating}
//               max={10}
//               precision={0.1}
//               readOnly
//               size="small"
//             />
//           </Box>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// };
// components/CustomCard.tsx
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Box,
  Skeleton,
} from "@mui/material";
import { Link } from "react-router";
import { useInView } from "react-intersection-observer";
import type { CustomCardProps } from "./api";

export const CustomCard = <T,>({
  name,
  year,
  rating,
  to,
  img,
  state,
}: CustomCardProps<T>) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  return (
    <Card
      ref={ref}
      sx={{ height: "100%", width: "270px", display: "flex", flexDirection: "column" }}
    >
      <CardActionArea
        component={Link}
        to={to}
        state={state}
      >
        {img && inView ? (
          <CardMedia
            component="img"
            height="400"
            image={img}
            alt={name}
          />
        ) : (
          <Skeleton variant="rectangular" height={400} />
        )}
        <CardContent sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 1 }}>
            <Typography variant="h6" component="h3" noWrap title={name}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {year}
            </Typography>
          </Box>
          <Box>
            <Typography>Рейтинг:</Typography>
            <Rating
              value={rating}
              max={10}
              precision={0.1}
              readOnly
              size="small"
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
