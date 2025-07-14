
import React, { useState } from "react";
import {
  AppBar, Toolbar, IconButton, Typography, Drawer,
  List, ListItemButton, ListItemText, Box, InputBase,
 Slider, Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useNavigate, useLocation, useSearchParams } from "react-router";


// Имитация жанров (замени на fetch с API при необходимости)
const GENRES = [
  "драма", "комедия", "криминал", "боевик", "триллер",
  "приключения", "мелодрама", "фэнтези", "ужасы", "биография"
];
export const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [inputValue, setInputValue] = useState(search);

  // Жанры: только включённые
  const genresIncluded = searchParams.getAll("genresInclude");
  // Рейтинг (строка, например "7-10")
  const rating = searchParams.get("rating") || "";
  // Годы (строка, например "2015-2024")
  const years = searchParams.get("years") || "";

  // Поиск по названию
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearchParams(params => {
      if (e.target.value) params.set("search", e.target.value);
      else params.delete("search");
      return params;
    });
  };

  // Фильтрация: изменение жанров (только включить)
  const handleGenresChange = (genre: string) => {
    setSearchParams(params => {
      const all = params.getAll("genresInclude");
      if (all.includes(genre)) {
        // Remove (повторное нажатие)
        const next = all.filter((g) => g !== genre);
        params.delete("genresInclude");
        next.forEach((g) => params.append("genresInclude", g));
      } else {
        // Add
        params.append("genresInclude", genre);
      }
      return params;
    });
  };

  // Рейтинг диапазон
  const handleRatingChange = (_: any, newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    setSearchParams(params => {
      if (min === 1 && max === 10) {
        params.delete("rating");
      } else {
        params.set("rating", `${min}-${max}`);
      }
      return params;
    });
  };

  // Годы диапазон
  const handleYearsChange = (_: any, newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    setSearchParams(params => {
      if (min === 1990 && max === new Date().getFullYear()) {
        params.delete("years");
      } else {
        params.set("years", `${min}-${max}`);
      }
      return params;
    });
  };

  // Навигация из бургер-меню
  const handleNav = (path: string) => {
    setDrawerOpen(false);
    navigate(path);
  };

  // Для фильтра
  const currentYear = new Date().getFullYear();

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setDrawerOpen(true)} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>КиноПоиск (Demo)</Typography>
          <InputBase
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Поиск по названию..."
            sx={{
              color: "inherit",
              background: "rgba(255,255,255,0.12)",
              px: 2,
              borderRadius: 2,
              minWidth: 200,
            }}
          />
          <IconButton color="inherit" sx={{ ml: 2 }} onClick={() => setFilterOpen((open) => !open)}>
            <FilterAltIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (меню) */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Box sx={{ width: 220 }}>
          <List>
            <ListItemButton selected={location.pathname === "/"} onClick={() => handleNav("/")}>
              <ListItemText primary="Фильмы" />
            </ListItemButton>
            <ListItemButton selected={location.pathname === "/fav"} onClick={() => handleNav("/fav")}>
              <ListItemText primary="Избранное" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Фильтры */}
      {filterOpen && (
        <Box
          sx={{
            bgcolor: "background.paper",
            p: 2,
            borderBottom: 1,
            borderColor: "divider",
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
          }}
        >
          <Box>
            <Typography variant="subtitle2">Жанры</Typography>
            {GENRES.map((genre) => (
              <Button
                key={genre}
                variant={genresIncluded.includes(genre) ? "contained" : "outlined"}
                color="primary"
                size="small"
                sx={{ mr: 1, mb: 1 }}
                onClick={() => handleGenresChange(genre)}
              >
                {genre}
              </Button>
            ))}
          </Box>
          <Box>
            <Typography variant="subtitle2">Рейтинг</Typography>
            <Slider
              min={1}
              max={10}
              step={0.1}
              value={
                rating && /^\d+(\.\d+)?-\d+(\.\d+)?$/.test(rating)
                  ? rating.split("-").map(Number)
                  : [1, 10]
              }
              onChange={handleRatingChange}
              valueLabelDisplay="auto"
              sx={{ width: 150 }}
            />
          </Box>
          <Box>
            <Typography variant="subtitle2">Годы</Typography>
            <Slider
              min={1990}
              max={currentYear}
              step={1}
              value={
                years && /^\d{4}-\d{4}$/.test(years)
                  ? years.split("-").map(Number)
                  : [1990, currentYear]
              }
              onChange={handleYearsChange}
              valueLabelDisplay="auto"
              sx={{ width: 160 }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};