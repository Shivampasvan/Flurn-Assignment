import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import PokemonCard from '../components/PokemonCard';
import "../styles/ListingPage.css"
import { Box, Flex } from '@chakra-ui/react';
import { SkeletonE } from '../components/Skeleton';
import FilterOption from '../components/FilterOption';
import { SpeciesArr, abilityArr } from '../utils/data';
import uniqid from 'uniqid';

const ListingPage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [groups, setGroups] = useState([]);
  const [habitats, setHabitats] = useState([]);
  const [locations, setLocations] = useState([]);
  const [species, setSpecies] = useState([]);

  const contentRef = useRef(null);

  const filteredData = (values)=>{
    setPokemonList(values)
  }
  const fetchPokemonList = async (page) => {
    setIsLoading(true);
    setError(null);

    try {
      setIsLoading(true);
      setTimeout(async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${(page - 1) * 10}`);
        // const abilityFilter = selectedAbilities.length > 0 ? `&ability=${selectedAbilities[0]}` : '';
        // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${(page - 1) * 10}${abilityFilter}`);
        if (response.ok) {
          const data = await response.json();
          setPokemonList((prevList) => [...prevList, ...data.results]);
          setCurrentPage(page);
          setIsLoading(false);
        } else {
          setError('Error occurred while fetching Pokemon list');
          setIsLoading(false);
        }
      }, 2000)
    } catch (error) {
      setError('Error occurred while fetching Pokemon list');
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      if (!isLoading && !error) {
        fetchPokemonList(currentPage + 1);
      }
    }
  };

  useEffect(() => {
    fetchPokemonList(currentPage);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading, error]);

  useEffect(() => {
    // Adjusting content area width when the window is resized
    const handleResize = () => {
      if (contentRef.current) {
        const sidebarWidth = 20; // Width of the sidebar in percentage
        const windowWidth = window.innerWidth;
        const contentWidth = windowWidth * (100 - sidebarWidth) / 100;
        contentRef.current.style.width = `${contentWidth}px`;
      }
    };

    handleResize(); // Setting initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <Flex>
      <Box width={"17%"} padding={4} height="100vh" overflowY="auto" marginTop={"60px"} position="fixed" left={0} zIndex={1}>
        <FilterOption
          filteredData={filteredData}
          abilities={abilityArr}
          species={SpeciesArr}
        />
      </Box>
      <Box ref={contentRef} marginLeft={"20%"} marginTop={"60px"} width={"82%"} padding={4} display="grid" gap={"20px"} gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(4, 1fr)", "2xl": "repeat(4, 1fr)" }} overflowY="auto">
        {isLoading ? <SkeletonE /> : pokemonList.map((pokemon, index) => (
          <PokemonCard key={`${pokemon.name}+${index}+${uniqid()}`} pokemonName={pokemon.name} PokemonUrl={pokemon.url} pokemon={pokemon} />
        ))}
      </Box>
    </Flex>
  );
};

export default ListingPage;
