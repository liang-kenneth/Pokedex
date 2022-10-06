import React from "react";
import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Axios from "axios";

// Generate the grid of 150 Pokemons
function PokeList(props) {
  const pokemon = props.pokemonList[props.pokemonId];
  const { name, id, sprite } = pokemon;

  // ------------------------------------------------------------
  // Handle open of modal, obtain the appropriate Pokemon data of the user selected Pokemon
  const handleOpen = (id) => {
    props.setOpen(true);

    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(function (response) {
        const { data } = response;
        const newPokemonData = {
          id: data.id,
          name: data.name,
          species: data.species,
          height: data.height,
          weight: data.weight,
          types: data.types,
        };

        props.setPokemonData(newPokemonData);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // ------------------------------------------------------------

  // ------------------------------------------------------------
  // A simple function to capitalize the first letter of the Pokemon name
  const toFirstCharUppercase = (name) =>
    name.charAt(0).toUpperCase() + name.slice(1);
  // ------------------------------------------------------------

  return (
    <Grid item xs={4}>
      <Card onClick={() => handleOpen(id)}>
        <CardMedia
          className="cardMedia"
          image={sprite}
          style={{ width: "100px", height: "100px" }}
        />
        <CardContent className="cardContent">
          <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default PokeList;
