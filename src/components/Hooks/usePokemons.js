import { useEffect, useState } from "react";

const URL_DEFAULT = "https://pokeapi.co/api/v2/pokemon?limit=150"; // Cargar los primeros 150 Pokémon

function usePokemons() {
  const [pokemons, setPokemons] = useState([]); // Lista de Pokémon
  const [loading, setLoading] = useState(false); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  const getPokemons = async () => {
    try {
      setLoading(true); // Inicia el estado de carga
      setError(null); // Limpia cualquier error previo

      const response = await fetch(URL_DEFAULT);

      if (!response.ok) {
        throw new Error("Error al obtener los Pokémon");
      }

      const listPokemons = await response.json();
      const { results } = listPokemons;

      // Obtén detalles de cada Pokémon
      const detailedPokemons = await Promise.all(
        results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);

          if (!detailResponse.ok) {
            throw new Error("Error al obtener detalles del Pokémon");
          }

          const poke = await detailResponse.json();

          // Extrae solo los datos necesarios
          return {
            ID: poke.id,
            Name: poke.name,
            Image: poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
            Abilities: poke.abilities.map((a) => a.ability.name),
            Types: poke.types.map((t) => t.type.name),
          };
        })
      );

      setPokemons(detailedPokemons); // Actualiza la lista de Pokémon
    } catch (err) {
      setError(err.message); // Guarda el mensaje de error
    } finally {
      setLoading(false); // Finaliza el estado de carga
    }
  };

  useEffect(() => {
    getPokemons(); // Cargar los Pokémon al inicio
  }, []);

  return {
    pokemons, // Lista de Pokémon cargados
    loading, // Estado de carga
    error, // Estado de error
  };
}

export default usePokemons;
