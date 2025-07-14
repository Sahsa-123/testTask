import React, { useState } from "react";
import {
	AppBar, Toolbar, IconButton, Typography
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useSearchParams, Link } from "react-router";

import { NavMenu } from "./components/NavMenu";
import { FiltersPanel } from "./components/FiltersPanel";

const GENRES = [
	"драма", "комедия", "криминал", "боевик", "триллер",
	"приключения", "мелодрама", "фэнтези", "ужасы", "биография"
];

export const Header: React.FC = () => {
	const [navMenuOpen, setNavMenu] = useState(false);
	const [filterOpen, setFilterOpen] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	return (
		<>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						color="inherit"
						edge="start"
						onClick={() => setNavMenu(true)}
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            <Link to={"/"}>КиноNet</Link>
          </Typography>


					<IconButton color="inherit" sx={{ ml: 2 }} onClick={() => setFilterOpen(open => !open)}>
						<FilterAltIcon />
					</IconButton>
				</Toolbar>
			</AppBar>

			<NavMenu open={navMenuOpen} onClose={() => setNavMenu(false)} />

			{filterOpen && (
				<FiltersPanel
          genres={GENRES}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
			)}
		</>
	);
};
