import axios from "axios";
import { useEffect, useState } from "react";

/*
Consuma a API e liste todos o pokemons da consulta do seguinte endpoint. 
https://pokeapi.co/api/v2/pokemon

Você deve exibir, de cada pokémon:
- imagem
- nome
- experiência

Você pode acessar as informações de cada pokemón individualmente em:
https://pokeapi.co/api/v2/pokemon/:id


DICA:
imagem => sprites.front_default
experiência => base_experience

EXTRA: se puder ordene por nome.
*/

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon").then((response) => {
      const orderedPokemons = [...response.data.results];

      orderedPokemons.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }

        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });

      return setPokemons(orderedPokemons);
    });
  }, []);



  return (
    <>
      <h3>desafio fernandev</h3>
      <h1>consumir api pokémon</h1>

      {pokemons.map((item, index) => (
        <Pokemon data={item} id={index} />
      ))}
    </>
  );
}

const Pokemon = ({ data }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios.get(data.url).then((response) => setDetails(response.data));
  }, []);

  if(details === null) {
    return (
      <p>OLA</p>
    )
  }

  return (
    <div >
      <span>
        <b>{details.name}</b> - EXP {details.base_experience}
      </span>
      <img
        src={details.sprites.front_default}
        style={{ width: 30, marginRight: 20 }}
      />
    </div>
  );
};

export default App;
