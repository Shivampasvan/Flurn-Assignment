import React from 'react';
import { Checkbox, Button, VStack } from '@chakra-ui/react';
import axios from "axios";
import uniqid from "uniqid"

const FilterOptions = ({ abilities, species, filteredData }) => {

  const getDatas = async (ids) => {
    try {
      const reqs = ids.map(id => axios.get(`https://pokeapi.co/api/v2/ability/${id}/`))
      const res = await Promise.allSettled(reqs);
      let values = []
      res.forEach(el => {
        if (el.status === 'fulfilled') values = [...values, ...el.value.data.pokemon];
      })
      values = values.map(el => el.pokemon);
      filteredData(values);
    } catch (error) {
      console.log('error', error);
    }
  }

  const applyFilter = () => {
    const selectedAbilities = [];
    document.querySelectorAll('input[type="checkbox"]').forEach(el => {
      if (el.checked) selectedAbilities.push(el.value);
    });
    getDatas(selectedAbilities);
  };

  return (
    <VStack align="flex-start" spacing={2}>
      <h3>Filter by Abilities:</h3>
      {abilities.map((ability) => (
        <Checkbox
          key={uniqid()}
          value={ability.id}
        >
          {ability.name}
        </Checkbox>
      ))}
      <Button colorScheme="blue" onClick={applyFilter}>Apply Filter</Button>
    </VStack>
  );
};

export default FilterOptions;
