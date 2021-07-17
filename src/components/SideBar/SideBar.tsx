import { useEffect, useState, useContext, createContext } from "react";
import { Button } from "../Button/Button";
import "./sidebar.scss";
import { api } from "../../services/api";
import { MenuTypes } from "../../context/MenuType";

export interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}
 export function SideBar() {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  const MenuSelected = useContext(MenuTypes);
  const [selectedGenreId, setSelectedGenreId] = useState<number>(MenuSelected);

  console.log(MenuSelected)

  const { state:{ number: number}, dispatch} = useContext<any>(MenuTypes)
  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
     dispatch({type:"MENU_SELECTED", payload: id})
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
  
}

