import { Card, CardActionArea, CardContent, CardMedia, Rating, Typography } from "@mui/material";
import { Link } from "react-router";

interface CustomCardI{
    name: string,
    img:string|null, 
    release:number, 
    rating:number,
    id:number
}

export const CustomCard: React.FC<CustomCardI> = ({name, img, release, rating, id }) => {

  return (
    <Card>
        <CardActionArea component={Link} to={"/film"}>
            <CardMedia 
                image={img||""}
            />
            <CardContent>
                <Typography variant="h3">
                    {name}
                </Typography>
                <Typography variant="subtitle1">
                    {release}
                </Typography>
                <Typography component="label" htmlFor={`rating-${id}`} variant="subtitle2">
                    рейтинг
                </Typography>
                <Rating
                    id={`rating-${id}`}
                    defaultValue={rating}
                    max={10}
                    readOnly
                />
            </CardContent>
        </CardActionArea>
    </Card>
  );
};