export type FiltersPanelProps = {
    genres: string[];
    searchParams: URLSearchParams;
    setSearchParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
};
