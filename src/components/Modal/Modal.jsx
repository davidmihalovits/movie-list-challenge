import { useEffect, useState } from "react";
import "./Modal.sass";
import cross from "../../assets/cross.svg";

const Modal = (props) => {
    const [movie, setMovie] = useState("");

    const getMovie = () => {
        fetch(
            `https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=${props.apiKey}&language=en-US`,
            {
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((res) => setMovie(res));
    };

    useEffect(() => {
        getMovie();
        //eslint-disable-next-line
    }, []);

    return (
        <div className="modal-container">
            <img
                onClick={() => props.setModal(false)}
                src={cross}
                alt="close"
                className="modal-close-button"
            />
            <h1 className="modal-title">{props.movie.title}</h1>
            <img
                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${props.movie.poster_path}`}
                className="modal-poster"
                alt="movie poster"
            />
            <p className="modal-overview">{props.movie.overview}</p>
            <h2 className="modal-details">Details:</h2>
            <p className="modal-date">{props.movie.release_date}</p>
            {movie &&
                movie.genres.map((genre) => (
                    <p className="modal-genre" key={genre.id}>
                        {genre.name}
                    </p>
                ))}
            <p className="modal-runtime">{props.movie.runtime} minutes</p>
            {movie &&
                movie.production_countries.map((country) => (
                    <p className="modal-country" key={country.iso_3166_1}>
                        {country.name}
                    </p>
                ))}
            <a
                href={`https://www.imdb.com/title/${props.movie.imdb_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-link"
            >
                IMDB link
            </a>
        </div>
    );
};

export default Modal;
