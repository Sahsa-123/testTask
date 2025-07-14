import React from "react";
import {
	Drawer, Box, List, ListItemButton, ListItemText
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import type { NavMenuProps } from "./api";


export const NavMenu: React.FC<NavMenuProps> = ({ open, onClose }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const handleNav = (path: string) => {
		onClose();
		navigate(path);
	};

	return (
		<Drawer anchor="left" open={open} onClose={onClose}>
			<Box sx={{ width: 220 }}>
				<List>
					<ListItemButton
						selected={location.pathname === "/"}
						onClick={() => handleNav("/")}
					>
						<ListItemText primary="Фильмы" />
					</ListItemButton>
					<ListItemButton
						selected={location.pathname === "/fav"}
						onClick={() => handleNav("/fav")}
					>
						<ListItemText primary="Избранное" />
					</ListItemButton>
				</List>
			</Box>
		</Drawer>
	);
};
