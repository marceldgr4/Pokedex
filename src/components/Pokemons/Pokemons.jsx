import React, { useEffect, useState } from "react";
import "./moduloPokemons.css";
import usePokemons from "../Hooks/usePokemons";
import DetailsPokemon from "../Deteail/DetailsPokemon";
import SearchPokemon from "../Search/SearchPokemon";
import Pagination from "../pagination/Pagination";

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
  const [allPokemons, setAllPokemons] = useState([]);
  const [view, setView] = useState({ view: false, pokemon: {} });
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState(""); // Campo de búsqueda
  const [paginaActual, setPaginaActual] = useState(1); // Página inicial
  const ITEMS_POR_PAGINA = 20; // Número de elementos por página

  // Ver detalles de un Pokémon
  const seePokemon = (pokemon) => setView({ view: true, pokemon });
  const noSeePokemon = () => setView({ view: false, pokemon: {} });

  // Cargar los primeros 150 Pokémon al iniciar
  useEffect(() => {
    if (pokemons.length > 0) {
      const first150 = pokemons.slice(0, 150); // Limitar a los primeros 150
      setAllPokemons(first150);
    }
  }, [pokemons]);

  // Actualiza los Pokémon filtrados o paginados
  useEffect(() => {
    if (search.trim() !== "") {
      // Si hay búsqueda, filtrar por nombre
      const results = allPokemons.filter((pokemon) =>
        pokemon.Name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPokemon(results);
    } else {
      // Si no hay búsqueda, aplicar paginación
      const startIndex = (paginaActual - 1) * ITEMS_POR_PAGINA;
      const paginatedPokemon = allPokemons.slice(
        startIndex,
        startIndex + ITEMS_POR_PAGINA
      );
      setFilteredPokemon(paginatedPokemon);
    }
  }, [search, paginaActual, allPokemons]);

  // Manejar cambio de página
  const handlePageChange = async (direction) => {
    const maxItems = search
      ? filteredPokemon.length
      : allPokemons.length; // Total de Pokémon disponibles para paginar

    if (direction === "next") {
      if (paginaActual * ITEMS_POR_PAGINA >= maxItems) {
        // Si estamos al final de la lista, cargar más Pokémon
        await loadMorePokemons();
      }

      // Asegurarse de que no se exceda el número total de páginas
      setPaginaActual((prev) => Math.min(prev + 1, Math.ceil(maxItems / ITEMS_POR_PAGINA)));
    } else if (direction === "prev" && paginaActual > 1) {
      setPaginaActual((prev) => prev - 1);
    }
  };

  // Asegurarse de que allPokemons se actualiza cuando se cargan más Pokémon
  useEffect(() => {
    if (pokemons.length > allPokemons.length) {
      setAllPokemons((prev) => [...prev, ...pokemons.slice(prev.length)]);
    }
  }, [pokemons]);

  const totalPages = Math.ceil(
    search
      ? filteredPokemon.length / ITEMS_POR_PAGINA
      : allPokemons.length / ITEMS_POR_PAGINA
  );

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
      {filteredPokemon.length > 0 && (
        <Pagination
          currentPage={paginaActual}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default Pokemons;
