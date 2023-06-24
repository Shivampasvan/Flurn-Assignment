import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaRegBookmark, FaBookmark } from "react-icons/fa"
import style from '../styles/pokemonDetails.module.css';
import { Heading, Image, Input, Spinner, Table, Tbody, Td, Th, Tr } from '@chakra-ui/react';
import UseToast from '../customHooks/UseToast';

function DetailsPage() {
  const [favoriteList, setFavoriteList] = useState([]);
  console.log('favoriteList:', favoriteList)
  const [pokemon, setPokemon] = useState({});
  let timoutRef = useRef();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { pokemonName } = useParams();
  const toastMsg = UseToast();

  const getPokemon = async (searchQuery) => {
    if (searchQuery == "") return;
    console.log(pokemonName);
    setLoading(true);
    try {
      setTimeout(async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery || pokemonName}`)
        if (res.ok) {
          const response = await res.json();
          setPokemon(response);
          setLoading(false)
        } else {
          toastMsg({
            title: "Something went wrong or pokemon doesn't exist with this name",
            status: "warning"
          });
        }

      }, 1000)
      setLoading(false);
    } catch (error) {
      console.log('error:', error)
      if (!searchQuery) {
        toastMsg({
          title: `${error.message}`,
          status: "error"
        });
      }
      setLoading(false);
    }
    getFavorites();
  }

  function getFavorites() {
    setFavoriteList(JSON.parse(localStorage.getItem("favorites")) || []);
  }

  const handleDoFavorite = () => {
    const index = favoriteList.indexOf(pokemon?.name);
    if (index !== -1) {
      favoriteList.splice(index, 1);
      toastMsg({
        title: "Removed from favorites",
        status: "warning"
      });
    } else {
      favoriteList.push(pokemon?.name);
      toastMsg({
        title: "Added to favorites",
        status: "success"
      });
    }
    localStorage.setItem("favorites", JSON.stringify(favoriteList))
    getFavorites()
  }

  useEffect(() => {
    getPokemon();
  }, [])

  useEffect(() => {
    if (timoutRef.current) clearTimeout(timoutRef.current);
    timoutRef.current = setTimeout(() => {
      getPokemon(search)
    }, 2000);
  }, [search])

  return loading ? <Spinner size="xl" color='red.500' thickness='6px' speed='0.65s' /> : (
    <div className={style.parentContainer}>
      <Input id={style["search-input"]} placeholder='search Pokemon...' onChange={(e) => setSearch(e.currentTarget.value)} />
      <article className={style.pokemon}>
        <div className={style["container"]}>
          <aside className={style["pokemon-pic"]}>
            <Image title={pokemon?.name + " front deafult"} src={pokemon?.sprites?.front_default} alt={pokemon?.name + " front deafult"} />
            <Image title={pokemon?.name + " front shiny"} src={pokemon?.sprites?.front_shiny} alt={pokemon?.name + " front shiny"} />
            <Image title={pokemon?.name + " back shiny"} src={pokemon?.sprites?.back_shiny} alt={pokemon?.name + " back shiny"} />
            <Image title={pokemon?.name + " back default"} src={pokemon?.sprites?.back_default} alt={pokemon?.name + " back default"} />
          </aside>
          <div className={style["pokemon-details"]}>
            <h1 style={{ fontSize: "25px", fontWeight: "bold" }}>{pokemon?.name} <span onClick={handleDoFavorite}>{favoriteList.includes(pokemon?.name) ? <FaBookmark /> : <FaRegBookmark />}</span></h1>
            <div className={style["pokemon-tables"]}>
              <Table>
                <Tbody>
                  <Tr>
                    <Th><bdi>ID</bdi></Th>
                    <Td>{pokemon?.id}</Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Base Experience</bdi></Th>
                    <Td>{pokemon?.base_experience}</Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Type</bdi></Th>
                    <Td>
                      {
                        pokemon?.types?.map(type => type.type.name).join(", ")
                      }
                    </Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>HP</bdi></Th>
                    <Td>{pokemon?.stats && pokemon?.stats[0]?.base_stat}</Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Attack</bdi></Th>
                    <Td>{pokemon?.stats && pokemon?.stats[1]?.base_stat}</Td>
                  </Tr>
                  <Tr>
                    <Td><bdi>Defense</bdi></Td>
                    <Td>{pokemon?.stats && pokemon?.stats[2]?.base_stat}</Td>
                  </Tr>
                </Tbody>
              </Table>
              <Table>
                <Tbody>
                  <Tr>
                    <Th><bdi>Special-Attack</bdi></Th>
                    <Td>{pokemon?.stats && pokemon?.stats[3]?.base_stat}</Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Special-Defense</bdi></Th>
                    <Td>{pokemon?.stats && pokemon?.stats[4]?.base_stat}</Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Speed</bdi></Th>
                    <Td>{pokemon?.stats && pokemon?.stats[5]?.base_stat}</Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Abilities</bdi></Th>
                    <Td>
                      {
                        pokemon?.abilities?.map(el => el.ability.name).join(", ")
                      }
                    </Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Weight</bdi></Th>
                    <Td>{pokemon?.weight}</Td>
                  </Tr>
                  <Tr>
                    <Th><bdi>Height</bdi></Th>
                    <Td>{pokemon?.height}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </div>
          </div>
        </div>
        <div className={style["pokemon-moves"]}>
          <p><bdi>Moves</bdi> {pokemon?.moves?.map(el => el.move.name).join(", ")}</p>
        </div>
      </article>
    </div>
  )
}

export default DetailsPage