import { Typography } from "@mui/material";
import type { LoadErrorMessageProps } from "./api";

export const LoadErrorMessage: React.FC<LoadErrorMessageProps> = ({mainText, recomendation})=>{
    return (
    <>
        <Typography variant="h5" color="error" gutterBottom>
          {mainText}
        </Typography>
        <Typography color="text.secondary">
          {recomendation}
        </Typography>
    </>
    );
} 