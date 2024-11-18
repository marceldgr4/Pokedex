import React, { useState, useEffect } from "react";
import "./moduloSearchPokemon.css";

function SearchPokemon({ search, setSearch, updatePageNumber }) {
  const [input, setInput] = useState(search); 
  const [isFocused, setIsFocused] = useState(false); // Para manejar el enfoque
  const [isTyping, setIsTyping] = useState(false); // Para manejar cuando se escribe

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(input); // Actualiza el estado de búsqueda
      updatePageNumber(1); // Vuelve a la primera página
    }, 500);

    if (input.trim().length > 0) {
      setIsTyping(true); // Cambia a "escribiendo"
    } else {
      setIsTyping(false); // Vuelve al estado inicial
    }

    return () => clearTimeout(timeoutId);
  }, [input, setSearch, updatePageNumber]);

  return (
    <div className="searchBar">
      <section className="container-search">
        <div className="search-container">
          {/* Imagen dentro de la barra de búsqueda */}
          <img
            src="././img/search.png"
            alt="Buscar"
            className={`search-icon ${isFocused ? "focused" : ""}`}
          />
          <input
            type="text"
            placeholder="Buscar Pokémon"
            className="input-search"
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)} 
          />
        </div>
      </section>

      {/* Imagen debajo de la barra de búsqueda */}
      <div className="image-container">
        <img
          src={isTyping ? "././img/Pokeball-2.png" : "././img/Pokeball-1.png"}
          alt="Pokeball"
          className="pokeball-image"
        />
      </div>
    </div>
  );
}

export default SearchPokemon;
