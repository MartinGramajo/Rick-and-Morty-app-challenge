import { createContext, useState } from "react";
import { guardarEnLocalStorage, leerDeLocalStorage } from "../utils/localstorage";


export const FavoritesContext = createContext();
const favoritesLocal = leerDeLocalStorage("favorites") || [];

export const DataProvider = ({ children }) => {
    const [characters, setCharacters] = useState([]);
    const [charactersFavorites, setCharactersFavorites] = useState([]);
    const [favorites, setFavorites] = useState(favoritesLocal);


    const onClick = (id) => {
        const charactersFiltrado = characters.find((character) => character.id === id);
        const newArray = [...favorites, charactersFiltrado];
        guardarEnLocalStorage({ key: "favorites", value: newArray });
        setFavorites( newArray);
    };
    
    const chequear = (i) => {
        const inFavorite = favorites.find((favorite) => favorite.id === i);
        if ( inFavorite) {
          return true;
        } else {
          return false;
        }
    };
    
    const deleteFavorite = (i) => {
        const favoriteFiltrado = favorites.filter((favorite) => favorite.id !== i);
        guardarEnLocalStorage({ key: "favorites", value: favoriteFiltrado });
        setFavorites(favoriteFiltrado);
      };

    return (
        <FavoritesContext.Provider
            value={{
                characters,
                setCharacters,
                favorites,
                charactersFavorites,
                setCharactersFavorites,
                onClick,
                chequear,
                deleteFavorite,

        }}
        >
        {children}
        </FavoritesContext.Provider>
    )
}