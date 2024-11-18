
import { useEffect, useState } from 'react'
const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=20' 

function usePokemons() {
    const [pokemons, setPokemons] = useState([]);
    const [nextPageUrl, setNextPageUrl] = useState(URL_DEFAULT); // URL inicial
    const [loading, setLoading] = useState(false);

    const getPokemons = async (url = URL_DEFAULT) => {
        setLoading(true); // Inicia el cargando
        const response = await fetch(url);
        const listPokemons = await response.json();
        const { next, results } = listPokemons;

        const newPokemons = await Promise.all(
            results.map(async (pokemon) => {
                const response = await fetch(pokemon.url);
                const poke = await response.json();

                const abilities = poke.abilities.map((a) => a.ability.name);
                const types = poke.types.map((t) => t.type.name);

                return {
                    ID: poke.id,
                    Name: poke.name,
                    Image: poke.sprites.other.dream_world.front_default,
                    abilities,
                    types,
                };
            })
        );

        setLoading(false); // Termina el cargando
        return { next, newPokemons };
    };

    const obtenerPokemons = async () => {
        const { next, newPokemons } = await getPokemons(nextPageUrl);
        setPokemons((prev) => [...prev, ...newPokemons]); // Agrega los nuevos datos
        setNextPageUrl(next); // Actualiza la URL para la próxima página
    };

    useEffect(() => {
        obtenerPokemons();
    }, []);

    return {
        pokemons,
        loadMorePokemons: obtenerPokemons,
        loading,
    };
}
export default usePokemons;
// punto de partida para cambios 