import React from "react";
import "./moduloDetailsPokemon.css";

function DetailsPokemon({ view, pokemon, close }) {
  // Validar que el objeto `pokemon` tenga datos válidos
  if (!pokemon || Object.keys(pokemon).length === 0) {
    return null; // Si no hay datos, no renderiza nada
  }

  return (
    <div
      className="container"
      onClick={close}
      style={{ display: view ? "grid" : "none" }}
    >
      <section className="body-con">
        {/* Imagen y tipos */}
        <div className="img-container">
          <img
            src={pokemon.Image}
            alt={pokemon.Name}
            className="img-detail"
          />
          <section>
            {pokemon.Types?.map((type, index) => (
              <span className="tag" key={index}>
                {type}
              </span>
            ))}
          </section>
        </div>

        {/* Información del Pokémon */}
        <div className="data">
          <h2 className="title">
            {pokemon.Name} ({pokemon.ID})
          </h2>
          <h3 className="title-seccion">Habilidades</h3>
          {pokemon.Abilities?.map((ability, index) => (
            <span className="tag" key={index}>
              {ability}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DetailsPokemon;
