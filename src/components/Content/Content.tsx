import { MovieCard } from "../MovieCard/MovieCard";
import "./content.scss";
import { api } from '../../services/api';
import { useEffect, useState, useContext } from "react";
import { GenreResponseProps }from '../SideBar/SideBar';
import { MenuTypes } from "../../context/MenuType";
interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function Content() {
  const MenuSelected = useContext<any>(MenuTypes);
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${MenuSelected.state}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${MenuSelected.state}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [MenuSelected]);

  return(
    <div className="container">
    <header>
      <span className="category">
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>

    <main>
      <div className="movies-list">
        { movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      </div>
    </main>
  </div>
  );
}
