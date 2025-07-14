import React from "react";
import { Box, Typography, Button, Slider } from "@mui/material";
import type { FiltersPanelProps } from "./api";


export const FiltersPanel: React.FC<FiltersPanelProps> = ({
	genres,
	searchParams,
	setSearchParams,
}) => {
    const currentYear = new Date().getFullYear();
	const genresIncluded = searchParams.getAll("genresInclude");
	const rating = searchParams.get("rating") || "";
	const years = searchParams.get("years") || "";

	const handleGenresChange = (genre: string) => {
		setSearchParams(params => {
			const all = params.getAll("genresInclude");
			if (all.includes(genre)) {
				const next = all.filter((g) => g !== genre);
				params.delete("genresInclude");
				next.forEach((g) => params.append("genresInclude", g));
			} else {
				params.append("genresInclude", genre);
			}
			return params;
		});
	};

	const handleRatingChange = (_: Event, newValue: number | number[]) => {
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

	const handleYearsChange = (_: Event, newValue: number | number[]) => {
		const [min, max] = newValue as [number, number];
		setSearchParams(params => {
			if (min === 1990 && max === currentYear) {
				params.delete("years");
			} else {
				params.set("years", `${min}-${max}`);
			}
			return params;
		});
	};

	return (
		<Box
			sx={{
				p: 2,
				borderBottom: 1,
				borderColor: "divider",
				display: "flex",
				flexWrap: "wrap",
				gap: 3,
                justifyContent:"space-between"
			}}
		>
			<Box>
				<Typography variant="subtitle2">Жанры</Typography>
				{genres.map((genre) => (
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
	);
};
