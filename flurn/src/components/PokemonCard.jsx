import { Image } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/PokemonCard.css";

const PokemonCard = ({ pokemonName, PokemonUrl, pokemon }) => {
  let arr = PokemonUrl.split('/')
  let url = `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`
  return (
    <>
      <Link to={`/pokemon/${pokemon.name}`}>
        <div className="pokemon-card">
          <Image src={url} alt={pokemon.name} width={'100%'} height={"250px"} borderRadius={"10px"} style={{ textAlign: 'center' }}></Image>
          <h3>{pokemonName}</h3>
        </div>
      </Link>
    </>
  );
};

export default PokemonCard;
