import { useEffect, useState } from "react";
import "./Home.sass";
import cross from "../../assets/cross.svg";
import Modal from "../Modal/Modal";

const Home = () => {
    const [search, setSearch] = useState("");
    const [movies, setMovies] = useState("");
    const [genres, setGenres] = useState("");
    const [modal, setModal] = useState(false);
    const [movie, setMovie] = useState("");

    const apiKey = "1c5abaaeaa13c66b570ad3042a0d51f4";

    const getMovies = () => {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${search}&include_adult=false`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((res) => setMovies(res.results));
    };

    const getGenres = () => {
        fetch(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((res) => setGenres(res.genres));
    };

    useEffect(() => {
        search.length >= 3 && getGenres();
        search.length >= 3 && getMovies();
        search.length < 3 && setGenres("");
        search.length < 3 && setMovies("");
        //eslint-disable-next-line
    }, [search]);

    const openModal = (movie) => {
        setModal(true);
        setMovie(movie);
    };

    return (
        <div className="home-container">
            <div className="home-searchbar-cross">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="home-searchbar"
                    placeholder="Search..."
                />
                {search !== "" && (
                    <img
                        src={cross}
                        className="home-cross"
                        onClick={() => setSearch("")}
                        alt="cross"
                    />
                )}
            </div>
            {movies.length === 0 && search.length > 2 && (
                <p className="home-not-found">No movie found.</p>
            )}
            <div className="home-movie-grid-container">
                {movies &&
                    movies.map((movie) => {
                        return (
                            <div
                                className="home-movie-grid"
                                key={movie.id}
                                onClick={() => openModal(movie)}
                            >
                                <img
                                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                                    className="movie-poster"
                                    alt="movie poster"
                                />
                                <div className="home-movie-grid-right">
                                    <h2 className="home-movie-grid-title">
                                        {movie.title}
                                    </h2>
                                    <p className="home-movie-grid-date">
                                        {movie.release_date}
                                    </p>
                                    {movie.genre_ids.map((id) => {
                                        return genres.map(
                                            (genre) =>
                                                id === genre.id && (
                                                    <p
                                                        className="home-movie-grid-genre"
                                                        key={id}
                                                    >
                                                        {genre.name}
                                                    </p>
                                                )
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
            </div>
            {modal && (
                <Modal movie={movie} apiKey={apiKey} setModal={setModal} />
            )}
        </div>
    );
};

export default Home;
