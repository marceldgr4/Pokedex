import React, { useState, useEffect } from "react";
import "./moduloSearchPokemon.css"; // Asegúrate de que el CSS está correctamente importado

function SearchPokemon({ search, setSearch, updatePageNumber }) {
  const [input, setInput] = useState(search); 

  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(input); 
      updatePageNumber(1); 
    }, 500); 

    
    return () => clearTimeout(timeoutId);
  }, [input, setSearch, updatePageNumber]);

  return (
    <div className="searchBar">
      <section className="container-search">
        <div className="search-container">
          <img
            src="././img/search.png"
            alt="Buscar"
            className="search-icon"
          />
          <input
            type="text"
            placeholder="Buscar Pokémon"
            className="input-search"
            value={input}
            onChange={(e) => setInput(e.target.value)} 
          />
        </div>
      </section>
    </div>
  );
}

export default SearchPokemon;
