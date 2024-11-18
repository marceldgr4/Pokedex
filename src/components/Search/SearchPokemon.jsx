import React, { useState, useEffect } from "react";
import "./moduloSearchPokemon.css"; // Asegúrate de que el CSS está correctamente importado

function SearchPokemon({ search, setSearch, updatePageNumber }) {
  const [input, setInput] = useState(search); 
  const [isFocused, setIsFocused] = useState(false); // Para manejar el enfoque (clic en el input)
  const [isTyping, setIsTyping] = useState(false); // Para manejar cuando se empieza a escribir

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(input); // Actualiza el estado de búsqueda
      updatePageNumber(1); // Vuelve a la primera página después de buscar
    }, 500);

    if (input.length > 0) {
      setIsTyping(true); // Empieza a escribir
    } else {
      setIsTyping(false); // Deja de escribir
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
            className={`search-icon ${isFocused ? 'focused' : ''}`} // Aplica clase de estilo cuando está enfocado
          />
          <input
            type="text"
            placeholder="Buscar Pokémon"
            className="input-search"
            value={input}
            onChange={(e) => setInput(e.target.value)} 
            onFocus={() => setIsFocused(true)} // Activar estado de enfoque
            onBlur={() => setIsFocused(false)} // Desactivar estado de enfoque
          />
        </div>
      </section>

      {/* Imagen fuera de la barra de búsqueda */}
      {isTyping && isFocused && (
        <img 
          src="././img/Pokeball-9.png" 
          alt="Imagen fuera de búsqueda" 
          className="outside-image" 
        />
      )}
    </div>
  );
}

export default SearchPokemon;
