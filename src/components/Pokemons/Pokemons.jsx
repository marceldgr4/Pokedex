import React, { useEffect, useState } from "react";
import "./moduloPokemons.css";
import usePokemons from "../Hooks/usePokemons";
import DetailsPokemon from "../Deteail/DetailsPokemon";
import SearchPokemon from "../Search/SearchPokemon";

function Pokemon({ ID, Image, Name, seePokemon }) {
  return (
    <div className="pokemon-card" onClick={seePokemon}>
      <img src={Image} alt={Name} className="pokemon-img" />
      <p className="title">
        <span>#{ID}</span>
        <span>{Name}</span>
      </p>
    </div>
  );
}

function Pokemons() {
  const { pokemons, loadMorePokemons, loading, error } = usePokemons();
  const [view, setView] = useState({ view: false, pokemon: {} });
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState(""); // Campo de búsqueda
  const [paginaActual, setPaginaActual] = useState(1); // Página inicial
  const ITEMS_POR_PAGINA = 20; // Número de elementos por página

  // Actualiza los Pokémon filtrados o paginados
  useEffect(() => {
    if (search.trim() !== "") {
      // Si hay búsqueda, filtrar por nombre
      const results = pokemons.filter((pokemon) =>
        pokemon.Name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemon(results);
    } else {
      // Si no hay búsqueda, aplicar paginación
      const startIndex = (paginaActual - 1) * ITEMS_POR_PAGINA;
      const paginatedPokemon = pokemons.slice(
        startIndex,
        startIndex + ITEMS_POR_PAGINA
      );
      setFilteredPokemon(paginatedPokemon);
    }
  }, [search, paginaActual, pokemons]);

  // Manejar cambio de página
  const handlePageChange = async (direction) => {
    if (direction === "next") {
      const nextPageExists =
        (paginaActual * ITEMS_POR_PAGINA) <
        (search ? filteredPokemon.length : pokemons.length);

      if (!nextPageExists && !search) {
        await loadMorePokemons(); // Solo carga más datos si no estamos buscando
      }

      setPaginaActual((prev) => prev + 1);
    } else if (direction === "prev" && paginaActual > 1) {
      setPaginaActual((prev) => prev - 1);
    }
  };

  if (error) {
    return <p className="error-message">Error: {error}</p>;
  }

  return (
    <>
      {/* Detalle del Pokémon */}
      <DetailsPokemon {...view} close={() => setView({ view: false, pokemon: {} })} />

      {/* Barra de búsqueda */}
      <SearchPokemon search={search} setSearch={setSearch} updatePageNumber={setPaginaActual} />

      {/* Sin resultados */}
      {filteredPokemon.length === 0 && (
        <p className="no-results">No se encontraron Pokémon.</p>
      )}

      {/* Lista de Pokémon */}
      <section className="container-pokemon">
        {filteredPokemon.map((pokemon, index) => (
          <Pokemon
            {...pokemon}
            key={`${pokemon.ID}-${index}`}
            seePokemon={() => setView({ view: true, pokemon })}
          />
        ))}
      </section>

      {/* Navegación entre páginas */}
      <div className="pagination-controls">
        {paginaActual > 1 && (
          <button onClick={() => handlePageChange("prev")} disabled={loading}>
            Anterior
          </button>
        )}
        {paginaActual * ITEMS_POR_PAGINA < filteredPokemon.length ||
        (!loading && !search) ? (
          <button onClick={() => handlePageChange("next")} disabled={loading}>
            Siguiente
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Pokemons;
