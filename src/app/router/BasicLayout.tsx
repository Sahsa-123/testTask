import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { Header } from "./Header";

export const BasicLayout: React.FC = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <Header />
    <Box component="main" sx={{ flexGrow: 1, p: 0, minHeight: "70vh" }}>
      <Outlet />
    </Box>
  </Box>
);
