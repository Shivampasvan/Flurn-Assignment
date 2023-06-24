import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heading, Input, Button, Image, Box, Text, FormLabel } from "@chakra-ui/react"
import UseToast from '../customHooks/UseToast';
import "../styles/Search.css"

const SearchPage = () => {
  const [pokemonName, setPokemonName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toastMsg = UseToast();

  const handleSearch = async () => {
    try {
      // Making API call to search the Pokemon by name
      setLoading(true);
      if(pokemonName==""){
        toastMsg({
          title: "Search with real pokemon name and try again...",
          status: "warning"
        });
        setLoading(false);
        return
      }
      setTimeout(async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
        if (response.ok) {
          // If the API call is successful, redirecting to the listing page with the search query parameter
          setLoading(false);
          toastMsg({
            title: "Welcome to Pokemon Page",
            status: "success"
          });
          navigate(`/list?search=${pokemonName}`);
        } else {
          // If the API call fails, displaying an error message
          toastMsg({
            title: "Something went wrong with the API call or pokemon doesn't exist with this name. Search like ditto, bulbasaur etc. ",
            status: "error"
          });
          setLoading(false);
          console.log('Pokemon not found');
        }
      }, 3000)

    } catch (error) {
      console.log(error);
      toastMsg({
        title: `${error.message}`,
        status: "error"
      });
    }
  };

  return (
    <div style={{ marginTop: "60px" }}>
      <Box width="70%" margin="auto" marginTop="100px" >
      <FormLabel>Search your pokemon</FormLabel>
        <Input type="text" placeholder='Search pokemon here like ditto, balbasaur, venusaur.....' border="1px solid" width="100%" margin="auto" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} />
        {loading ? <Button
          isLoading
          loadingText='Submitting, Please Wait...'
          colorScheme='teal'
          variant='outline'
        >
          Submit
        </Button> : <Button onClick={handleSearch} border="1px solid" width="100px" padding="20px" marginTop="5px">Search</Button>}
      </Box>
      <div className='pokemonContainer'>
        <Text>Hey, Search me Over there ...</Text>
        <div className='imageContainer'>
          <Image src='https://near-ethernet-088.notion.site/image/https%3A%2F%2Fpngimg.com%2Fuploads%2Fpokemon%2Fpokemon_PNG33.png?table=block&id=86912e4f-764b-4463-ba27-5705f3851ebf&spaceId=159f4c28-9b94-4583-9b02-8afa7bede8e1&width=250&userId=&cache=v2' w="100%" height="400px"></Image>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
