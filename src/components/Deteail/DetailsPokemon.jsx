import React from "react"
import "./moduloDetailsPokemon.css"


function DetailsPokemon({view, pokemon,close}){
return(
   
    <div className="container" onClick = {close} style={{display: view ? 'grid': 'none' }}>
        <section className="body-con">
           
            <div className="img-container">
                <img src={pokemon.Image} alt={pokemon.Name} className="img-detail"/>
                <section>
                    {pokemon.types?.map(type =><span className="tag">{type}</span>)}
                </section>

            </div>

            <div className="data">
                <h2 className="title">{pokemon.Name} ({pokemon.ID})</h2>
                <h3 className="title-seccion">Habilidades</h3>
                {pokemon.abilities?.map(ability =><span className="tag">{ability}</span>)}



            </div>


        </section>


    </div>
 )
}
export default DetailsPokemon